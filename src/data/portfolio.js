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

// Verified against the repos' READMEs (sources noted). "4+ YRS" is self-reported.
export const highlightMetrics = [
  { value: '−81%', note: 'Forecast RMSE, LSTM vs ARIMA (TSLA)' }, // GMF-investment-portfolio-management: 77.96 → 15.11
  { value: '0.80', note: 'AUC-PR on credit-card fraud (XGBoost)' }, // fraud-detection-ecommerce-banking: 0.8016
  { value: '4.07%', note: 'LSTM forecast MAPE on held-out data' }, // GMF README, Task 2
  { value: '4+ YRS', note: 'Production Python & team lead' },
]

export const skillGroups = [
  { title: 'Languages & ML', items: ['Python 3.11', 'SQL (PostgreSQL)', 'PyTorch', 'scikit-learn', 'TensorFlow', 'Pandas', 'NumPy'] },
  { title: 'Evaluation & Data QA', items: ['Time-Based Splits', 'Cross-Validation', 'Precision/Recall/F1', 'ROC-AUC & PR-AUC', 'dbt Tests', 'Pydantic Models', 'Leakage Checks', 'RAG Citation Faithfulness'] },
  { title: 'Pipelines & Tracking', items: ['MLflow Tracking', 'DVC (Data/Model)', 'Dagster', 'Apache Airflow', 'Config-Driven Runs', 'Fixed Random Seeds', 'PostgreSQL Warehouse'] },
  { title: 'GenAI & Delivery', items: ['FastAPI', 'Docker Multi-Stage', 'LangChain RAG', 'ChromaDB', 'LLM Agents', 'pytest', 'GitHub Actions CI/CD'] },
]

// `visual` selects the diagram rendered by ProjectVisual. `details` sit behind a "How it works" toggle.
// Metrics are taken from each repo's README/code; `code` excerpts are verbatim from the linked files.
export const featuredProjects = [
  {
    category: 'Ingestion & DAG',
    title: 'Ethiopian Medical Telegram Analytics',
    summary: 'Scrapes Ethiopian medical Telegram channels into PostgreSQL, models them with tested dbt marts, enriches images with YOLOv8, and serves analytics through FastAPI, orchestrated daily by Dagster.',
    tags: ['Telethon', 'PostgreSQL', 'dbt', 'Dagster', 'FastAPI', 'YOLOv8'],
    details: [
      ['Problem', 'Product and pricing signals sit in unstructured Telegram posts and images across many channels, with no schema and no quality checks.'],
      ['Architecture', 'Telethon scraping → raw JSON in a data lake → PostgreSQL → dbt staging and marts (star schema) with data tests → YOLOv8 object detection on images → FastAPI analytical endpoints. A Dagster job runs the whole chain on a daily schedule.'],
    ],
    metrics: [
      { label: 'dbt tests', value: '10' }, // 9 schema tests + 1 custom SQL test
      { label: 'dbt models', value: '4' },
      { label: 'Dagster ops', value: '4' },
      { label: 'Schedule', value: 'Daily' },
    ],
    code: {
      lang: 'python',
      path: 'ethio_pipeline/jobs/etl_job.py',
      url: 'https://github.com/Filimon-H/ethio-med-telegram-analytics/blob/HEAD/ethio_pipeline/jobs/etl_job.py',
      source: `from dagster import job
from ethio_pipeline.ops.scrape_telegram import scrape_telegram_data
from ethio_pipeline.ops.load_to_postgres import load_raw_to_postgres
from ethio_pipeline.ops.run_dbt import run_dbt_transformations
from ethio_pipeline.ops.run_yolo import run_yolo_enrichment

@job
def etl_pipeline_job():
    scrape_telegram_data()
    load_raw_to_postgres()
    run_dbt_transformations()
    run_yolo_enrichment()`,
    },
    visual: 'dag',
    repo: 'https://github.com/Filimon-H/ethio-med-telegram-analytics',
  },
  {
    category: 'Stats & Deep Learning',
    title: 'Time Series Forecasting & Portfolio Optimization',
    summary: 'Forecasts TSLA with ARIMA and LSTM on chronological splits, then builds an efficient frontier over TSLA, SPY and BND and backtests the max-Sharpe portfolio against a 60/40 benchmark.',
    tags: ['ARIMA', 'LSTM', 'Modern Portfolio Theory', 'Streamlit', 'Docker'],
    details: [
      ['Problem', 'Forecast a volatile asset without lookahead bias, then turn the forecast into portfolio weights that hold up against a simple benchmark.'],
      ['Methodology', 'Chronological train/test split; auto-ARIMA vs a windowed LSTM. ARIMA produced flat forecasts while LSTM tracked trend and volatility. Forecast returns fed a 5,000-portfolio Monte Carlo efficient frontier; the max-Sharpe portfolio was backtested over the final year against 60/40 SPY/BND.'],
    ],
    metrics: [
      { label: 'LSTM RMSE', value: '15.11' },
      { label: 'LSTM MAPE', value: '4.07%' },
      { label: 'Backtest return', value: '12.02%' },
      { label: 'Backtest Sharpe', value: '0.94' }, // same as the 60/40 benchmark (0.94)
    ],
    // Lower is better for every row. Values from the README's Task 2 results.
    comparison: {
      title: 'Forecast error on the test split (lower is better)',
      baseline: 'ARIMA',
      model: 'LSTM',
      rows: [
        { label: 'RMSE', baseline: 77.96, model: 15.11 },
        { label: 'MAE', baseline: 62.97, model: 10.83 },
        { label: 'MAPE %', baseline: 24.09, model: 4.07 },
      ],
    },
    code: {
      lang: 'python',
      path: 'src/lstm_model.py',
      url: 'https://github.com/Filimon-H/GMF-investment-portfolio-management/blob/HEAD/src/lstm_model.py',
      source: `def create_lstm_sequences(data: np.ndarray, window_size: int) -> Tuple[np.ndarray, np.ndarray]:
    """
    Convert a 1D array into LSTM-ready (X, y) sequences.
    X shape: (num_samples, window_size, 1)
    y shape: (num_samples, 1)
    """
    X, y = [], []
    for i in range(len(data) - window_size):
        X.append(data[i : i + window_size])
        y.append(data[i + window_size])
    X = np.array(X).reshape(-1, window_size, 1)
    y = np.array(y).reshape(-1, 1)
    return X, y`,
    },
    visual: 'frontier',
    repo: 'https://github.com/Filimon-H/GMF-investment-portfolio-management',
  },
  {
    category: 'Grounded GenAI & RAG',
    title: 'Ethiopian Tax Law RAG Assistant',
    summary: 'Answers questions about Ethiopian VAT, turnover and income tax from the official proclamations, returning the source documents behind every answer.',
    tags: ['LangChain', 'ChromaDB', 'LLaMA3-8B (Groq)', 'FastAPI', 'Streamlit', 'Docker'],
    details: [
      ['Problem', 'General-purpose LLMs invent article numbers and rates when asked about Ethiopian tax law, and give no way to check the answer.'],
      ['Solution', 'Legal PDFs are chunked and embedded with MiniLM into ChromaDB. The top-3 chunks feed a prompt that tells the model to say “I don’t know” rather than guess, and every response returns its source documents. Served via FastAPI with a Streamlit UI, both containerized.'],
    ],
    metrics: [
      { label: 'Retriever', value: 'top-k 3' },
      { label: 'Embeddings', value: 'MiniLM-L6' },
      { label: 'LLM', value: 'LLaMA3-8B' },
      { label: 'Sources', value: 'Every answer' },
    ],
    code: {
      lang: 'python',
      path: 'src/pipeline/retrieval_qa.py',
      url: 'https://github.com/Filimon-H/ethiopian-tax-law-assistant/blob/HEAD/src/pipeline/retrieval_qa.py',
      source: `embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectordb = Chroma(persist_directory="vectorstore", embedding_function=embedding_model)

retriever = vectordb.as_retriever(search_type="similarity", search_kwargs={"k": 3})

prompt_template = """
You are a helpful assistant specialized in Ethiopian tax law. Use the provided context to answer the question.
If you don’t know the answer, just say you don’t know — don’t make anything up.
...
"""

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True,
    chain_type="stuff",
    chain_type_kwargs={"prompt": custom_prompt}
)`,
    },
    visual: 'rag',
    repo: 'https://github.com/Filimon-H/ethiopian-tax-law-assistant',
  },
]

// Other public repos worth a look.
export const moreProjects = [
  { title: 'E-commerce & Card Fraud Detection', meta: 'Fraud · SHAP · MLOps', repo: 'https://github.com/Filimon-H/fraud-detection-ecommerce-banking' },
  { title: 'Credit Scoring for Micro-Lending', meta: 'Credit risk · FastAPI', repo: 'https://github.com/Filimon-H/Bank_Credit_Scoring' },
  { title: 'Brent Oil Change-Point Dashboard', meta: 'Bayesian · PyMC', repo: 'https://github.com/Filimon-H/brent-oil-price-analysis' },
]

export const experience = [
  {
    role: 'AI Engineer',
    org: '10 Academy · Remote',
    current: true,
    bullets: [
      'Deployed RAG and tool-calling LLM agents for compliance and fintech queries, measuring grounding and citation consistency against unaugmented baselines.',
      'Standardized config-driven runs with fixed seeds and Pydantic-validated inputs, removing training non-determinism across teams.',
    ],
  },
  {
    role: 'Machine Learning Engineer',
    org: '10 Academy · Remote',
    bullets: [
      'Fraud detection on imbalanced e-commerce and credit-card data: benchmarked Logistic Regression, Random Forest and XGBoost with SMOTE, reaching AUC-PR 0.80 (XGBoost) and F1 0.68 (Random Forest), with SHAP explanations.',
      'Time-series forecasting comparing ARIMA against LSTM, validated with rolling walk-forward splits.',
    ],
  },
  {
    role: 'Lead Backend Python Developer',
    org: 'KFC Africa Project · Contract',
    bullets: [
      'Owned the backend microservice architecture: FastAPI + PostgreSQL with Pydantic validation and >85% pytest coverage.',
      'Shipped multi-stage Docker images through GitHub Actions CI/CD with zero-downtime deploys; mentored 4 junior developers.',
    ],
  },
  {
    role: 'Backend Software Engineer',
    org: 'Carlson Marketing · Remote',
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
