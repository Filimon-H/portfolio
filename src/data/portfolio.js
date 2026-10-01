// All site content lives here. Components only handle layout.

export const profile = {
  name: 'Filimon Haylemariyam',
  role: 'Machine Learning & AI Engineer',
  formerRole: 'ex-Lead Backend Developer',
  tagline: 'Building reproducible experiments, production ML pipelines, and grounded GenAI systems.',
  summary:
    'I take models from experiment to production: rigorous baselines, reproducible runs tracked with MLflow and DVC, and containerized FastAPI services. Before ML, I led backend Python teams.',
  availability: 'Available for ML/AI roles',
  contactBlurb: 'Open to full-time ML / AI Engineer roles, pipeline architecture contracts, and technical advisory work.',
  location: 'Addis Ababa, Ethiopia (UTC+3)',
  email: 'filimon3570@gmail.com',
  phone: '+251 923 677 823',
  phoneHref: '+251923677823',
  linkedin: 'https://www.linkedin.com/in/filimon-haylemariyam/',
  github: 'https://github.com/Filimon-H',
  formspree: 'https://formspree.io/f/movlypka',
  // Drop the file into /public with this name and the resume links download it.
  resume: 'resume.pdf',
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const highlightMetrics = [
  { value: '+18%', note: 'Fraud recall lift over baseline' },
  { value: '0.94', note: 'Sharpe ratio, optimized portfolio' },
  { value: '100%', note: 'Config-driven, seeded, DVC-tracked runs' },
  { value: '4+ YRS', note: 'Production Python & team lead' },
]

export const skillGroups = [
  { title: 'Languages & ML', items: ['Python 3.11', 'SQL (PostgreSQL)', 'PyTorch', 'scikit-learn', 'TensorFlow', 'Pandas', 'NumPy'] },
  { title: 'Evaluation & Data QA', items: ['Time-Based Splits', 'Cross-Validation', 'Precision/Recall/F1', 'ROC-AUC & PR-AUC', 'dbt Tests', 'Pydantic Models', 'Leakage Checks', 'RAG Citation Faithfulness'] },
  { title: 'Pipelines & Tracking', items: ['MLflow Tracking', 'DVC (Data/Model)', 'Dagster', 'Apache Airflow', 'Config-Driven Runs', 'Fixed Random Seeds', 'PostgreSQL Warehouse'] },
  { title: 'GenAI & Delivery', items: ['FastAPI', 'Docker Multi-Stage', 'LangChain RAG', 'ChromaDB', 'LLM Agents', 'pytest', 'GitHub Actions CI/CD'] },
]

// `visual` selects the diagram rendered by ProjectVisual. `details` sit behind a "How it works" toggle.
export const featuredProjects = [
  {
    category: 'Ingestion & DAG',
    title: 'End-to-End Telegram Analytics Pipeline',
    summary: 'Scrapes Telegram e-commerce channels, validates the data with dbt, detects products in listing images with YOLOv8, and serves it through FastAPI.',
    tags: ['Telethon', 'PostgreSQL', 'dbt', 'Dagster', 'FastAPI', 'YOLOv8'],
    details: [
      ['Problem', 'Unstructured, high-velocity e-commerce data from multiple Telegram channels without schema controls, manual ETL points, and unverified product imagery.'],
      ['Architecture', 'Orchestrated ingestion via Telethon, transformation via dbt with built-in consistency assertions, YOLOv8 vision object detection on listing images, and FastAPI serving endpoints.'],
    ],
    metrics: [
      { label: 'dbt tests', value: '48/48' },
      { label: 'p95 latency', value: '<35ms' },
      { label: 'mAP50', value: '92.4%' },
      { label: 'Daily ingest', value: '120k+' },
    ],
    visual: 'dag',
    repo: 'https://github.com/Filimon-H/Amharic-E-commerce-Data-Extractor',
  },
  {
    category: 'Stats & Deep Learning',
    title: 'Time Series Forecasting & Portfolio Optimization',
    summary: 'Compares ARIMA and LSTM forecasts for TSLA, SPY and BND without lookahead bias, then optimizes portfolio weights for risk-adjusted return.',
    tags: ['ARIMA', 'LSTM', 'Modern Portfolio Theory', 'Streamlit', 'Docker'],
    details: [
      ['Problem', 'Predicting market shifts across volatile assets (TSLA, SPY, BND) without lookahead bias and reallocating weights to maximize risk-adjusted yields.'],
      ['Methodology', 'Strict chronological train/validation/test splits comparing statistical ARIMA against recurrent LSTM neural nets. Fed outputs into Mean-Variance optimization to form efficient frontiers.'],
    ],
    metrics: [
      { label: 'LSTM RMSE', value: '2.18' },
      { label: 'vs ARIMA', value: '−36%' },
      { label: 'Sharpe', value: '0.94' },
      { label: 'Max drawdown', value: '−11.2%' },
    ],
    visual: 'frontier',
    repo: 'https://github.com/Filimon-H/GMF-investment-portfolio-management',
  },
  {
    category: 'Grounded GenAI & RAG',
    title: 'Ethiopian Tax Law RAG Assistant',
    summary: 'Answers Ethiopian income-tax questions with citations to the exact proclamation article, evaluated for groundedness and citation precision.',
    tags: ['LangChain', 'ChromaDB', 'LLaMA 3', 'FastAPI', 'Docker'],
    details: [
      ['Problem', 'General LLMs hallucinate article numbers, tax brackets, and regulatory amendments when queried regarding Ethiopian Federal Income Tax Proclamation No. 979/2016.'],
      ['Solution & evaluation', 'Chunked statutory texts with structural metadata, embedded via ChromaDB, and enforced strict citation checks. Built synthetic evaluation suites checking claim faithfulness against retrieved context.'],
    ],
    metrics: [
      { label: 'Context relevance', value: '94.8%' },
      { label: 'Groundedness', value: '98.2%' },
      { label: 'Citation precision', value: '99.1%' },
      { label: 'TTFT', value: '1.2s' },
    ],
    visual: 'rag',
    repo: 'https://github.com/Filimon-H/ethiopian-tax-law-assistant',
  },
]

// Projects from the previous site that aren't featured above.
export const moreProjects = [
  { title: 'E-commerce & Card Fraud Detection', meta: 'Fraud · SHAP · MLOps', repo: 'https://github.com/Filimon-H/fraud-detection-ecommerce-banking' },
  { title: 'Credit Scoring for Micro-Lending', meta: 'Credit risk · FastAPI', repo: 'https://github.com/Filimon-H/Bank_Credit_Scoring' },
  { title: 'Brent Oil Change-Point Dashboard', meta: 'Bayesian · PyMC', repo: 'https://github.com/Filimon-H/brent-oil-price-analysis' },
]

export const experience = [
  {
    role: 'AI Engineer',
    org: '10 Academy · Remote',
    period: '2025 — Now',
    current: true,
    bullets: [
      'Deployed RAG and tool-calling LLM agents for compliance and fintech queries, measuring grounding and citation consistency against unaugmented baselines.',
      'Standardized config-driven runs with fixed seeds and Pydantic-validated inputs, removing training non-determinism across teams.',
    ],
  },
  {
    role: 'Machine Learning Engineer',
    org: '10 Academy · Remote',
    period: '2024 — 2025',
    bullets: [
      'Fraud detection: benchmarked Logistic Regression against Random Forest and XGBoost; SMOTE and cost-sensitive weights drove an 18% recall gain on unseen data, tracked in MLflow.',
      'Time-series forecasting comparing ARIMA against LSTM, validated with rolling walk-forward splits.',
    ],
  },
  {
    role: 'Lead Backend Python Developer',
    org: 'KFC Africa Project · 1-year contract',
    period: '1 year',
    bullets: [
      'Owned the backend microservice architecture: FastAPI + PostgreSQL with Pydantic validation and >85% pytest coverage.',
      'Shipped multi-stage Docker images through GitHub Actions CI/CD with zero-downtime deploys; mentored 4 junior developers.',
    ],
  },
  {
    role: 'Backend Software Engineer',
    org: 'Carlson Marketing · Remote',
    period: 'Earlier',
    bullets: [
      'Built schema-validated batch processing that turned diverse exports into structured event streams for marketing analytics.',
      'Wrote deterministic pytest unit and integration suites covering ingestion edge cases.',
    ],
  },
]

export const education = [
  { eyebrow: 'Degree', title: 'BSc in Computer Science', org: 'Hawassa University, Ethiopia', period: '2016 – 2021', note: 'GPA 3.6 / 4.0' },
  { eyebrow: 'Fellowship', title: 'ML, GenAI & Data Engineering', org: '10 Academy (Remote)', period: '2025 cohort' },
  {
    eyebrow: 'Certifications',
    title: 'Credentials',
    list: ['Ready Tensor: RAG Systems Expert', 'Kaggle: ML & Python courses', 'DeepLearning.AI Specializations', 'AZ-900: Azure Fundamentals'],
  },
]

export const socialLinks = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  // Add Kaggle once you have the profile URL: { label: 'Kaggle', href: 'https://www.kaggle.com/<username>' },
]
