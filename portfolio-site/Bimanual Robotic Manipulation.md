# Bimanual Robotic Manipulation

# PRE-REQUISITES

Main project repo: Checkout https://github.com/iamty8/spacefly/tree/main/spacefly

1. Prerequisites: Clone https://github.com/MohitShridhar/genima.git. Pre-install all necessary packages 
2. Data Generation Script: Run data_gen_script.sh in the main project repo

```jsx
source data_gen_script.sh
```

1. Run training [https://github.com/iamty8/spacefly/tree/main/diffusion]

```jsx
cd diffusion
source training.sh
```

# TRAINING ISSUES

## [SOLVED]

**rlbench_colosseum_dataset.py:** 

- Hugging face load_dataset incompatibility issue due to scripts no longer supported for ≥v4.x : https://discuss.huggingface.co/t/dataset-scripts-are-no-longer-supported/163891
- Use iterable dataset

![image.png](attachment:206e7c2e-7b32-4adf-8766-aaf970da7a6d:image.png)

**train_controlnet_genima_colosseum.py:**

- Compatibility with iterable datasets - len(dataset) is invalid now
- Manually calculate the length of your total dataset using

```jsx
cd ./spacefly_data/tmp/bimanual_lift_ball/heatmaps_ortho/
find . -type f -name "heatmap*" | wc -l
```

- Change multiple functions: tokenize(), collate_fn(), preprocess_train() for compatibility with iterable dataset
- Note: Previous code (ref: genima) which works with loading dataset using script is still added in the code #old code

![image.png](attachment:69c63223-2cef-4aec-a46f-858aeb2a74cf:image.png)

**Validation not showing the heat maps:**

- tweak parameters guidance_scale that controls the influence of the text prompt on the images

BEFORE

![image.png](attachment:7ed5bb17-4da1-47cc-ab0d-fe1e2f32836c:image.png)

AFTER [guidance scale = 3.5; predictions, ground truth,conditioning images, error are split into 3 different sections for better readability]

![image.png](attachment:5c715ae9-6c34-445c-aa5f-d4b0f1e0d296:image.png)

# [PENDING]

### Images are misaligned

- Above images [AFTER] show the presence of heatmaps, however, the images in prediction vs ground truth are different/not aligned

### Loss does’nt show elbow curve

- Loss shows many intermittent spikes, suspecting training not really happening

![image.png](attachment:f40ce41a-1e52-4998-9bd5-3d557add504c:image.png)

![image.png](attachment:a2a65bb3-35b8-4e33-9f9c-dbca485ae806:image.png)

OG-VLA - single-arm manipulation task

genima - predicting action in joint space

bimanual tasks in peract2+use VLA backbones

TODOs:

- upload dataset on hugging face - public
- training - check the tiled vs non-tiled
    - expected - all the 4 camera angles should be tiled/stacked together ⇒ during training & even during validation
    - check how the data is loaded from the json ⇒ need to tile everything together ⇒ that should form your sample. Per sample = 4 frames from different angles

11/20/2025:

Update: 

- Tiling fixed - also formed square shaped tiled matching genima
- Currently continuing with 4/5 camera frames to form the tiling [dropped - “back” view from consideration] to form 2x2 tiled image.
- With odd #frames, we dont get 2x2 tiled image - not acceptable input format for stable diffusion
- https://wandb.ai/asmitamohanty13-usc/train_controlnet_genima/runs/4p5cwgkh?nw=nwuserasmitamohanty13
- Post fix: prediction image needs adjustment in sharpness, & show the heatmaps