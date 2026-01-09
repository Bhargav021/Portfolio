export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface ProjectItem {
  name: string;
  tagline?: string;
  context?: string;
  role?: string;
  bullets: string[];
  impact?: string;
  learning?: string;
  tech?: string[];
  highlight?: string;
  category?: string;
  github?: string;
}

export const education = [
  {
    degree: 'M.S. Applied Data Science',
    institution: 'University of Southern California',
    location: 'Los Angeles, CA',
    start: 'Jan 2025',
    end: 'May 2026',
    coursework: [
      'Foundations of Data Management','Research Methods','Machine Learning for Data Science','Analyzing Big Data','Artificial Intelligence','Distributed Database Systems','Data Mining','Data Visualization'
    ]
  },
  {
    degree: 'B.Tech Computer Science & Engineering',
    institution: 'Pandit Deendayal Energy University',
    location: 'Gujarat, India',
    start: 'Jun 2020',
    end: 'May 2024',
    coursework: [
      'Artificial Intelligence','Data Intelligence','Digital Image Processing','Pattern Recognition','DBMS','Advanced Web Development','Deep Learning','Applied Analytics','Data Mining','Computer Networks'
    ]
  }
];

export const experiences: ExperienceItem[] = [
  {
    role: 'Research Assistant',
    company: 'Pediatric Brain Tumor Segmentation (BraTS-PEDs 2025)',
    location: 'Los Angeles, CA',
    start: 'Jul 2025',
    end: 'Present',
    bullets: [
      '🎯 What problem we solved: Pediatric brain tumors require precise MRI segmentation for treatment planning, but class imbalance and noisy annotations make this challenging. Our team worked on the BraTS-PEDs challenge to push state-of-the-art segmentation accuracy.',
      '🔧 What I built: Engineered end-to-end preprocessing pipeline for 1000+ MRI volumes using TorchIO, SimpleITK, Nyul normalization, and N4 bias correction—achieving >95% consistency across scans. Architected GPU-efficient 3D models (DeepDenseTrans3D, GIETNet, ARES-UNet) with attention mechanisms.',
      '📈 Measurable impact: Boosted Dice score by 8% compared to baseline U-Net. Composite loss function (AFTL + Boundary + IoU + BCE) reduced false negatives by 15%—critical for clinical safety. Optimized training with AMP and DDP, cutting runtimes by 25%.',
      '💡 What I learned: Preprocessing and loss design matter as much as architecture in medical imaging. Mentored undergrad researchers on model evaluation and reproducibility best practices.'
    ]
  },
  {
    role: 'Backend & AI Developer Intern',
    company: 'Anvayaa Kin Care Pvt. Ltd.',
    location: 'Bangalore, India',
    start: 'Feb 2024',
    end: 'Jul 2024',
    bullets: [
      '🎯 What problem we solved: Families caring for loved ones with dementia need personalized activities and engagement tools, but existing solutions lacked cultural relevance and multilingual support.',
      '🔧 What I built and shipped: Built a Django + PostgreSQL backend serving 300+ users with integrated GPT-powered LLM workflows for generating dementia care activities. Created 200+ activities in 9 languages and 1600+ video recommendations adopted by 500+ families.',
      '📈 Measurable impact: Automated CI/CD pipeline (Docker, Azure DevOps) reduced release cycles from days to 2 hours. Coordinated multi-team rollout and successfully published the app to Play Store & App Store, achieving a 4.5-star rating.',
      '💡 What I learned: Shipping real products taught me the importance of CI/CD, user feedback loops, and building systems that actually work for real people—not just in notebooks.'
    ]
  },
  {
    role: 'AI Intern',
    company: 'Neurapses Technologies',
    location: 'Pune, India',
    start: 'May 2023',
    end: 'Jul 2023',
    bullets: [
      '🎯 What problem we solved: Navigating UK work visa policies is complex and time-consuming. Users needed a system that could answer policy questions accurately and quickly using official datasets.',
      '🔧 What I built: Developed an AI query engine combining GPT-3.5 with MongoDB semantic search for UK work visa datasets. Built a scalable ETL pipeline (Pandas, PyMongo) to ingest 100k+ records, improving query accuracy by 30%.',
      '📈 Measurable impact: Adaptive prompt templates increased factual consistency by 20%. Built H2O Wave dashboards for pilot clients, enabling real-time querying and visualization of visa eligibility.',
      '💡 What I learned: Retrieval-augmented generation (RAG) is powerful, but prompt engineering and data quality are critical to avoid hallucinations. Gained hands-on experience building production-ready NLP systems.'
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    name: 'Bimanual Robotic Manipulation with Vision-Language-Action Systems',
    tagline: 'Training Diffusion Models for Dual-Arm Manipulation',
    category: 'Current Research',
    context: 'Most vision-language-action (VLA) models focus on single-arm manipulation. Extending these to bimanual tasks requires converting specialized datasets like PerAct² (designed for action prediction) into formats suitable for modern VLA training (like LLaVa), while preserving critical spatial information about dual-gripper coordination.',
    role: 'Research Engineer — I own the full pipeline: dataset conversion, heatmap generation for action representation, training ControlNet+GenIMA diffusion models, and solving dataset compatibility issues with HuggingFace.',
    bullets: [
      'Converted PerAct² bimanual manipulation dataset (700+ demonstrations) to LLaVa prompt format, preserving action semantics through color-coded heatmap overlays.',
      'Generated action heatmaps with custom color scheme: left gripper (blue/cyan), right gripper (orange/red), distinguishing open/closed states for dual-arm coordination.',
      'Trained ControlNet with GenIMA backbone for bimanual manipulation using Stable Diffusion 1.5, integrating both image and action conditioning.',
      'Debugged and fixed HuggingFace iterable dataset compatibility issues (generator yielding vs. __getitem__ access patterns), enabling training on large-scale trajectories.',
      'Implemented validation improvements: configurable guidance scales, proper action heatmap visualization during eval, and trajectory-level logging.'
    ],
    impact: 'Successfully converted 700+ bimanual demonstrations to VLA training format, achieving stable diffusion training with proper dual-gripper action conditioning. Solved critical dataset interface issues that enable scaling to larger trajectory datasets.',
    learning: 'I learned how dataset format differences (action vectors vs. image prompts) fundamentally affect model training, and how to bridge classical robotics datasets with modern VLA architectures. Debugging iterable dataset patterns taught me the importance of understanding framework abstractions.',
    tech: ['Python', 'PyTorch', 'ControlNet', 'Stable Diffusion', 'LLaVa', 'GenIMA', 'PerAct²', 'Diffusion Models', 'Hugging Face', 'Spacefly', 'Vision Transformers'],
    highlight: '700+ demos converted, dual-arm VLA training',
    github: 'https://github.com/iamty8/spacefly'
  },
  {
    name: 'BraTS-PEDs 2024: Pediatric Brain Tumor Segmentation',
    tagline: 'Deep Learning for Clinical MRI Analysis',
    category: 'Featured Research',
    context: 'Pediatric brain tumors are life-threatening, and accurate segmentation of tumor sub-regions (whole tumor, core, enhancing regions) from MRI scans is critical for treatment planning. The BraTS-PEDs challenge provides multimodal MRI data, but the task is complex due to class imbalance, noisy annotations, and high clinical stakes.',
    role: 'Lead Researcher — As part of my USC coursework, I took ownership of the full pipeline: preprocessing, architecture design, training strategy, and evaluation.',
    bullets: [
      'Preprocessed multimodal MRI (T1, T2, FLAIR) using TorchIO: normalization, resampling, and augmentation to handle anatomical variability.',
      'Implemented 3D U-Net with attention gates and deep supervision, optimizing with Dice + Focal Loss for class imbalance.',
      'Trained on A100 GPUs with mixed precision (AMP) and early stopping based on validation Dice.',
      'Achieved Dice scores of 0.85+ for whole tumor, 0.78+ for core, reducing false negatives by 15% compared to baseline.'
    ],
    impact: 'The model showed strong generalization on held-out test cases, with Dice improvements of +8% over baseline and a 15% reduction in false negatives—critical for minimizing missed tumor regions in clinical settings.',
    learning: 'I learned that in medical imaging, preprocessing and data quality matter as much as architecture. Careful handling of class imbalance, robust augmentation, and validation strategies are essential for models that could one day support real diagnoses.',
    tech: ['PyTorch','TorchIO','MONAI','3D U-Net','CUDA','Dice Loss','Focal Loss','Mixed Precision'],
    highlight: 'Dice 0.85+ / -15% false negatives',
    github: 'https://github.com/Bhargav021/BraTs-Challenge-6'
  },
  {
    name: 'Se-ResNet: Retinal OCT Image Classification',
    tagline: 'Automated Eye Disease Diagnosis',
    category: 'Featured Research',
    context: 'Optical Coherence Tomography (OCT) scans are widely used to diagnose retinal diseases like diabetic retinopathy and macular degeneration. Automating this diagnosis can speed up clinical workflows and improve accessibility, but requires models that generalize well across diverse imaging conditions.',
    role: 'Independent Researcher — I designed, trained, and evaluated this model as part of my undergrad research, culminating in a presentation at IEEE AIC 2024.',
    bullets: [
      'Built a hybrid Se-ResNet architecture combining ResNet blocks with Squeeze-and-Excitation layers for channel-wise attention.',
      'Preprocessed 84,000 OCT scans with contrast enhancement, resizing, and augmentation (rotation, flip, noise).',
      'Trained on CUDA-enabled GPUs with early stopping and learning rate scheduling.',
      'Achieved 96% classification accuracy (+6% over baseline ResNet), with strong per-class precision/recall.'
    ],
    impact: 'The model achieved 96% accuracy on a held-out test set of 84,000 scans, outperforming baseline ResNet by 6%. This level of accuracy could support clinical decision-making by flagging high-risk cases for human review.',
    learning: 'This project taught me the importance of feature visualization and interpretability in medical AI. I learned to use Grad-CAM to ensure the model was focusing on clinically relevant regions, not spurious artifacts.',
    tech: ['PyTorch','CUDA','ResNet','SE Blocks','Grad-CAM','Data Augmentation'],
    highlight: '96% accuracy (84k scans), IEEE AIC 2024'
  },
  {
    name: 'Air Pollution Forecasting (PM2.5 & PM10)',
    tagline: 'Time Series Forecasting for Environmental Health',
    category: 'Featured Project',
    context: 'Air pollution is a major public health concern, especially in urban areas. Accurate forecasting of PM2.5 and PM10 levels can inform health advisories and policy decisions. However, pollution data is noisy, non-stationary, and influenced by complex weather patterns.',
    role: 'Solo Data Scientist — I handled the full pipeline: data collection, feature engineering, model selection, and evaluation.',
    bullets: [
      'Collected and cleaned 2+ years of hourly pollution and meteorological data (temperature, humidity, wind) using Pandas.',
      'Engineered temporal features (rolling means, lags, seasonality) and addressed non-stationarity with differencing.',
      'Blended LSTM (for capturing long-term dependencies) and ARIMA (for linear trends) to forecast PM2.5/PM10 one year ahead.',
      'Achieved RMSE ≈ 15.9 μg/m³ and correlation ≈ 0.88 on test data, outperforming single-model baselines by 15%.'
    ],
    impact: 'The hybrid model achieved strong long-horizon forecasts (correlation ≈ 0.88), demonstrating robustness across varying weather conditions. These predictions could support early-warning systems for pollution spikes.',
    learning: 'I learned how to combine classical statistical methods (ARIMA) with modern deep learning (LSTM) to leverage the strengths of both. I also gained experience handling messy real-world time series data—missing values, outliers, and non-stationarity.',
    tech: ['Python','LSTM','ARIMA','Pandas','NumPy','Matplotlib','Time Series Analysis'],
    highlight: 'RMSE 15.9 μg/m³, r ≈ 0.88'
  }
];

export const miniProjects = [
  {
    name: 'Supply Chain Flow Visualization Dashboard',
    purpose: 'Multiscale geospatial dashboard with semantic zooming to visualize complex supply chain routes and inventory patterns',
    tech: ['Vue 3', 'Deck.gl', 'Mapbox GL', 'D3.js', 'SBEB Algorithm', 'Web Workers', 'Bootstrap 5', 'Vite'],
    outcomes: 'Built interactive visualization handling 51K+ orders with GPU-accelerated rendering, semantic zoom transitions between flow maps, density hexagons, and warehouse inventory charts',
    lessons: 'Mastered semantic zooming and edge bundling techniques to reduce visual clutter, and learned to integrate Deck.gl with Mapbox for high-performance geospatial analytics',
    github: 'https://github.com/Bhargav021/LogisticsDataSemantic-Zoom'
  },
  {
    name: 'RecipeLLM',
    purpose: 'AI-powered chatbot for natural language recipe and nutrition queries using LLMs',
    tech: ['React', 'TypeScript', 'Flask', 'Google GenAI', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'],
    outcomes: 'Built full-stack conversational AI system with dual database support and real-time chat interface',
    lessons: 'Learned to orchestrate LLM integration with database operations, translating user intent into structured queries through prompt engineering',
    github: 'https://github.com/Bhargav021/Recipellm/tree/main'
  },
  {
    name: 'Face-Mesh-Mediapipe',
    purpose: 'Real-time facial landmark detection for AR/accessibility applications',
    tech: ['Python', 'MediaPipe', 'OpenCV', 'Computer Vision'],
    outcomes: 'Achieved 30+ FPS on webcam with 468 facial landmarks tracked in real-time',
    lessons: 'Learned to optimize inference pipelines for real-time performance and handle edge cases like occlusion',
    github: 'https://github.com/TheDeal9/Face-Mesh-Mediapipe'
  },
  {
    name: 'Leaf-Disease-Detection',
    purpose: 'CNN-based plant disease classification to support agricultural diagnostics',
    tech: ['TensorFlow', 'Keras', 'CNNs', 'Data Augmentation'],
    outcomes: '92% accuracy on PlantVillage dataset (38 disease classes)',
    lessons: 'Practiced transfer learning and data augmentation to overcome limited training data',
    github: 'https://github.com/TheDeal9/Leaf-Disease-Detection/tree/main/Leaf%20Disease%20Detection'
  },
  {
    name: 'Tumour-Detection-Model',
    purpose: 'Binary classification of brain MRI scans (tumor vs. no tumor)',
    tech: ['PyTorch', 'ResNet', 'Medical Imaging'],
    outcomes: '94% accuracy with strong sensitivity (low false negatives)',
    lessons: 'Emphasized importance of class balance and evaluation metrics beyond accuracy in medical contexts',
    github: 'https://github.com/TheDeal9/Tumour-Detection-Model/tree/main/Tumor%20Detection%20Model'
  },
  {
    name: 'Meme-Sentiment-Analysis',
    purpose: 'Multi-modal sentiment analysis combining image and text from memes',
    tech: ['Python', 'Transformers', 'CLIP', 'NLP'],
    outcomes: '78% accuracy on multi-class sentiment (positive/negative/neutral)',
    lessons: 'Explored multi-modal fusion techniques and challenges of sarcasm/humor in sentiment tasks',
    github: 'https://github.com/TheDeal9/Meme-Sentiment-Analysis/tree/main/Meme%20Sentiment%20Analysis%20Model'
  }
];

export interface CertificationItem {
  name: string;
  issuer?: string;
  imageUrl?: string;
  credentialUrl?: string;
}

export const certifications: CertificationItem[] = [
  {
    name: 'NPTEL NOC: Deep Learning - IIT Ropar',
    issuer: 'IIT Ropar',
    imageUrl: '/certificates/nptel-deep-learning.png'
  },
  {
    name: 'Google Generative AI',
    issuer: 'Google'
  },
  {
    name: 'Microsoft PL-900',
    issuer: 'Microsoft',
    credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/BhargavLimbasia-9968/20A3F3C1BA9FA185?sharingId=2C11F3ABC2631334'
  }
];

export const skills = {
  ml: {
    label: 'Machine Learning & Modeling',
    description: 'Building, training, and validating models for classification, segmentation, time series forecasting, and more. From classical ML to deep learning, I focus on choosing the right tool for the problem and ensuring models generalize well.',
    technologies: ['PyTorch','TensorFlow','Scikit-Learn','Keras','LSTM','ARIMA','TorchIO','MONAI','SE-Nets','3D U-Net','Attention Mechanisms']
  },
  nlp_cv: {
    label: 'NLP & Computer Vision',
    description: 'Working with text and images to solve real-world problems - whether it is building RAG systems with LLMs, fine-tuning transformers, or training CNNs for medical imaging. Experienced with prompt engineering and multi-modal fusion.',
    technologies: ['OpenAI GPT','Transformers','Prompt Engineering','RAG','OpenCV','CNNs','CLIP','Mediapipe','Grad-CAM','Image Augmentation']
  },
  db_deploy: {
    label: 'Databases & Deployment',
    description: 'Building robust data pipelines and deploying ML systems that actually work in production. Comfortable with both relational and NoSQL databases, cloud platforms, and containerization for scalable, reliable deployments.',
    technologies: ['MongoDB','PostgreSQL','SQL Server','Oracle','Azure','AWS','Firebase','Docker','CI/CD','Azure DevOps','ETL Pipelines']
  },
  tools: {
    label: 'Data Engineering & Visualization',
    description: 'Transforming raw data into insights through cleaning, feature engineering, and compelling visualizations. Experienced with end-to-end data workflows from ingestion to interactive dashboards.',
    technologies: ['Pandas','NumPy','PyMongo','Matplotlib','Seaborn','D3.js','Tableau','Streamlit','H2O Wave','Git','Jupyter']
  }
};

export const contact = {
  location: 'Los Angeles, California',
  phone: '+1 602-578-4408',
  email: 'blimbasi@usc.edu',
  linkedin: 'https://www.linkedin.com/in/bhargavlimbasia/',
  handshake: 'https://app.joinhandshake.com/profiles/limbasiabhargav',
  github: 'https://github.com/Bhargav021',
  githubAlt: 'https://github.com/TheDeal9',
  twitter: 'https://x.com/BLimbasia'
};
