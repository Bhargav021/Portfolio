# Conversion of PerAct² Dataset to LLaVa Prompt

https://github.com/iamty8/spacefly

## Overview

In `Spacefly`, `spacefly/colosseum/colosseum_dataset_lite.py` was implemented as the `Dataset` to load the replay data as training data. Two datasets, `ColosseumDatasetLite` and `ColosseumMultiTaskDatasetLite` were included. `ColosseumMultiTaskDatasetLite` was used in `scripts/arnold/colosseum_to_xvila.py`, which was designed to convert colosseum data to the format needed by the training of `LLaVa` .

However, the workflow was designed for unimanual cases. Two apply that on bimanual cases, some tweaks shall be conducted.

## Analysis

### Data Format

The data format of PerAct² and Colosseum differs in that PerAct² format includes data of both left and right side while Colosseum contains only one side. For example, in wrist, Colosseum contained only `wrist` while PerAct² contained `[wrist_left, wrist_right]`. 

In the original dataset implement, 

```python
action = colosseum_conversion.make_task_space_action_from_colosseum(
				position_rotation_world=keyframe['gripper_pose'], 
				gripper_open=keyframe['low_dim_state'][0], 
				affine_world_to_task=affine_world_to_task
)

keyframe = {
		"language": language_instructions,
		"observation": observation,
		"action": action,
		"transforms": {
				"task_to_cube": affine_task_to_cube,
				"world_to_task": affine_world_to_task
		},
		"metadata": {
				"demo_id": len(self.episode_dict[obj_id][act_id]),
				"fname": fname
		},
		"remark": "observation and action is in task space"
}
```

the conflicting part is 

1. `keyframe['gripper_pose']`
2. `keyframe['low_dim_state']`

These two items were recorded in PerAct²  with both left and right version. To settle this, the current solution is to change it into

```python
if self.bimanual:
		action = [
				colosseum_conversion.make_task_space_action_from_colosseum(
				position_rotation_world=keyframe[f'{hand}_gripper_pose'], 
				gripper_open=keyframe[f'{hand}_low_dim_state'][0], 
				affine_world_to_task=affine_world_to_task) for hand in ['left', 'right']
		]
else:
		action = colosseum_conversion.make_task_space_action_from_colosseum(
				position_rotation_world=keyframe['gripper_pose'], 
				gripper_open=keyframe['low_dim_state'][0], 
				affine_world_to_task=affine_world_to_task
		)
```

where both hands were kept.

<aside>
📌

Still considering if to make both conditions’ `action` into `list`.

</aside>

### Prompt Generation

For the prompt generation part, the conflicting context is like

```python
obs_cube:Action = obs.transform(task_to_cube)
act_cube:Action = act.transform(task_to_cube)

...

if args.save_heatmaps:
		obs_hm_rgb:Heatmaps = Heatmaps(obs_cube.camera_names, obs_cube.rgbs, obs_cube.depths, obs_cube.poses, obs_cube.intrinsics, obs_cube.orthographic)
		obs_hm_rgb.compute_pos_px(act_cube.pos)
		rotation_endpoints = obs_hm_rgb.draw_rot_lines(act_cube, res = 224)
		obs_hm_rgb:Heatmaps = Heatmaps.make_affordance_heatmaps(obs_hm_rgb, pos_px=obs_hm_rgb.pos_px, black_bg=False)
```

Here the `keyframe["observation"]` and `keyframe["action"]` were both first transformed to the same expected cube, then a `Heatmap` object was created with the observation. Since this was designed for unimanual cases, the `compute_pos_px` method of `Heatmap` stores only 1 3D point as shown below

```python
class Heatmaps(Observation):
    def __init__(self, *args, pos_px=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.pos_px = pos_px

    def compute_pos_px(self, pos_3d):
        pos_px = self.project_3d_point_to_images(pos_3d) # Returns only 1 point in all cameras
        self.pos_px = pos_px.astype(np.int64)
        
...
```

Which made it not strange that both `draw_rot_lines` and `make_affordance_heatmaps` supports only one hand. In fact, `draw_rot_lines` was capable of drawing the rotation lines of given camera views and `make_affordance_heatmaps` to replace the RGB images of the replay with corresponding Heatmaps.

To accommodate with this, I plan to implement a new Heatmap class for bimanual manipulations called `HeatMapsBimanual` , where multiple 3D points (in bimanual cases, 2) is allowed. For `draw_rot_lines`, every 3D point will be plotted. And for `make_affordance_heatmaps`, whose core part being `draw_gaussian`, currently marking the center of the Heatmap with `self.pos_px`,

```python
# Chunk of `draw_gaussian`
cx, cy = center
...

alpha = torch.zeros((1, 1, image.shape[0], image.shape[1]), dtype=torch.float32, device=device)
alpha[:, :, cy, cx] = 1.0
```

I plan to mark multiple Heatmap centers with all points given.

## Results

The example of the conversion is like

```json
{
        "id": "0_aug0",
        "source_file": "0_aug0",
        "type": "img2img",
        "conversations": [
            {
                "from": "human",
                "value": "<image>\nTask: \"Lift the ball\". Where should the robot move next? Show the gripper's next pose as translation and rotation heatmaps on the input orthographic views. Translation should be represented as red heatmap for the right hand and cyan for the left hand on all 4 views. Follow the provided instruction to compute correct translation points in the images. Rotation should be represented as blue, orange and green heatmaps for the front, top, and left views of the left hand, yellow, purple and magenta heatmaps for the same three views of the right hand, corresponding to the x, z, and y axes respectively.",
                "image": [
                    {
                        "file": "0_aug0"
                    }
                ]
            },
            {
                "from": "agent",
                "value": "The next gripper pose for the given task 'Lift the ball' for timestep 1 is shown in the generated images.",
                "image": [
                    {
                        "file": "0_aug0",
                        "caption": "The translation heatmap for the given task 'Lift the ball' and the predicted translation point [[182 179]\n [122  41]\n [122 179]\n [101 179]\n [ 41 179]] for the left and [[ 48 179]\n [113 175]\n [113 179]\n [110 179]\n [175 179]] for the right."
                    }
                ]
            }
        ]
    },
```

And the action heatmaps are like

[]()

# Color Scheme

## Gripper Position Colors

| Point | Hand | View | Color | RGB |
| --- | --- | --- | --- | --- |
| Action | Left | N/A | Cyan | (0, 255, 255) |
| Action | Right | N/A | Red | (255, 0, 0) |
| Rotation | Left | Front | Blue | (0, 0, 255) |
| Rotation | Right | Front | Yellow | (255, 255, 0) |
| Rotation | Left | Top | Orange | (255, 128, 0) |
| Rotation | Right | Top | Purple | (128, 0, 255) |
| Rotation | Left | Left | Green | (0, 255, 0) |
| Rotation | Right | Left | Magenta | (255, 0, 255) |
| Rotation | Left | Right | Green | (0, 255, 0) |
| Rotation | Right | Right | Magenta | (255, 0, 255) |
| Rotation | Left | Back | Blue | (0, 0, 255) |
| Rotation | Right | Back | Yellow | (255, 255, 0) |

## Gripper Status Colors

| Hand | Status | Collision | Color | RGB |
| --- | --- | --- | --- | --- |
| Left | Open | Allow | Lime | (128, 255, 0) |
| Right | Open | Allow | Teal | (0, 128, 128) |
| Left | Open | Ignore | Pink | (255, 105, 180) |
| Right | Open | Ignore | Sky Blue | (135, 206, 235) |
| Left | Close | Allow | Indigo | (75, 0, 130) |
| Right | Close | Allow | Dark Orange | (255, 100, 0) |
| Left | Close | Ignore | Olive | (128, 128, 0) |
| Right | Close | Ignore | Light Gray | (200, 200, 200) |

# Task Selection

| Task | temporal | spatial | physical | symmetric | synchronous |
| --- | --- | --- | --- | --- | --- |
| push box | ✔ | ✔ | ✖ | ✔ | ✔ |
| lift a ball | ✔ | ✔ | ✔ | ✔ | ✔ |
| push two buttons | ✔ | ✖ | ✖ | ✔ | ✖ |
| put bottle in fridge | ✔ | ✖ | ✖ | ✖ | ✖ |
| handover item (easy) | ✔ | ✔ | ✔ | ✖ | ✖ |

# Details

## States of the Grippers

How to draw?

Solved: different colors for each hand, reconstruction error

![image.png](attachment:4ccac118-1ebc-457a-a715-db067f1849d7:image.png)

![image.png](attachment:5e7df8ed-e448-4cbc-b006-59d5bdafe1db:image.png)

![image.png](attachment:09a13571-3247-4b03-9826-50e6178aff4c:image.png)

![image.png](attachment:eb973b2f-9ac5-47fa-9420-af5e1abcfdb6:image.png)

![image.png](attachment:6604dcfb-58bc-4753-b7c3-d608508fa687:image.png)

## The prompt of the actions

Current logic:

```bash
if iter == 10 or iter % 50 == 0:
		with open(json_path, 'w') as fout:
				json.dump(data , fout, indent=4)
```

Override original?

## The replay grouping

Without separator!

0~4:

![image.png](attachment:a812cfbf-8344-4459-add2-a37884d58854:image.png)

5~9:

![image.png](attachment:4ccac118-1ebc-457a-a715-db067f1849d7:image.png)

![image.png](attachment:e38eed5f-654a-4e7e-95ce-a4298a059866:image.png)

![image.png](attachment:17574bc4-bf5e-4e64-8763-f1ec33d7a01b:image.png)

![image.png](attachment:106d37fb-3729-4d34-88f1-6417c5060d08:image.png)

![image.png](attachment:972db549-50a8-41f7-a52e-1b8820f723c5:image.png)

10~14:

![image.png](attachment:d55fafa5-76e7-4ee7-9c09-fe99d725fde0:image.png)

![image.png](attachment:a86f1f8f-fe8b-455c-8bfc-d7501e785c7e:image.png)

![image.png](attachment:51b24296-86de-49c3-a19c-b91872847a1f:image.png)

![image.png](attachment:f52ccea2-a221-4780-a566-26acd57267a7:image.png)

![image.png](attachment:04381380-0a19-4823-b99c-863c0afebd5a:image.png)

![image.png](attachment:e53a7f05-74b9-4386-a0b2-a8dcb6ad2051:image.png)

![image.png](attachment:8aef9d4d-27f3-4b65-b10e-0c84ca14bdc1:image.png)

![image.png](attachment:cee3ef91-d891-412a-9805-8858e95aabc8:image.png)

![image.png](attachment:4c378c9e-ef76-4f2d-b480-e415ade2b618:image.png)

## Action / Rotation Angel Data out of Frame

![image.png](attachment:0455da2c-d6a0-4092-b58a-8d97b90d3753:image.png)

![image.png](attachment:be5689df-cea1-4f05-bde3-55e5a5e3738d:image.png)

![image.png](attachment:7219c6b2-59d6-4375-9515-f07eda67d43a:image.png)

Large scale failing augmentation.

## Training Method

Controller? Training data format?