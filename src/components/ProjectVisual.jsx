const mono = "'JetBrains Mono', ui-monospace, monospace"

// Mirrors etl_pipeline_job: scrape → load → dbt → YOLO enrichment, served by the API.
function DagDiagram() {
  const box = { fill: 'currentColor', fillOpacity: 0.08, stroke: 'currentColor', strokeWidth: 1 }
  const label = { fill: 'currentColor', fontFamily: mono, fontSize: 8, textAnchor: 'middle' }
  const nodes = [['Telethon', 8], ['Postgres', 78], ['dbt tests', 148], ['YOLOv8', 218]]
  return (
    <div className="w-full">
      <svg className="w-full h-auto text-on-surface" fill="none" viewBox="0 0 320 90" role="img" aria-label="Dagster job: Telethon scrape, load to Postgres, dbt models and tests, YOLOv8 enrichment, served by the FastAPI API">
        {nodes.map(([name, x], i) => (
          <g key={name}>
            <rect {...box} x={x} y="30" width="58" height="30" />
            <text {...label} x={x + 29} y="48">{name}</text>
            {i < nodes.length - 1 && <line className="flow" stroke="currentColor" x1={x + 58} x2={x + 70} y1="45" y2="45" />}
          </g>
        ))}
        <line className="flow" stroke="currentColor" x1="276" x2="290" y1="45" y2="45" />
        <circle cx="301" cy="45" r="11" fill="currentColor" />
        <text fill="#131313" fontFamily={mono} fontSize="7" fontWeight="bold" textAnchor="middle" x="301" y="48">API</text>
        <text fill="#8e9192" fontFamily={mono} fontSize="7" x="8" y="80">@job etl_pipeline_job · daily schedule</text>
      </svg>
    </div>
  )
}

function FrontierChart() {
  return (
    <>
      <div className="w-full">
        <svg className="w-full h-auto text-primary" fill="none" viewBox="0 0 300 120" role="img" aria-label="Efficient frontier curve with the max-Sharpe portfolio marked">
          <path className="draw-path" pathLength="1" d="M20 100 Q 80 90, 140 45 T 280 20" stroke="currentColor" strokeWidth="1.5" />
          <g className="draw-pop">
            <circle cx="210" cy="27" r="4" fill="currentColor" />
            <text fill="currentColor" fontFamily={mono} fontSize="8" textAnchor="middle" x="210" y="16">MAX SHARPE</text>
          </g>
          <line stroke="#444748" x1="20" x2="280" y1="105" y2="105" />
          <line stroke="#444748" x1="20" x2="20" y1="15" y2="105" />
          <text fill="#8e9192" fontFamily={mono} fontSize="7" x="25" y="115">VOLATILITY (σ)</text>
          <text fill="#8e9192" fontFamily={mono} fontSize="7" x="25" y="25">EXP RETURN (μ)</text>
        </svg>
      </div>
    </>
  )
}

// The query is the one the repo's retrieval_qa.py uses as its smoke test.
function RagTrace() {
  return (
    <div className="w-full font-code-body text-body-sm space-y-1.5">
      <div className="text-outline">&gt; qa_chain.invoke(&#123;"query": "What is turnover tax in Ethiopia?"&#125;)</div>
      <div className="text-primary">&gt; retriever: top-3 chunks from ChromaDB</div>
      <div className="text-on-surface-variant">&gt; answer: grounded in the retrieved proclamation text</div>
      <div className="text-outline">&gt; source_documents: [3 sources returned]</div>
    </div>
  )
}

const visuals = { dag: DagDiagram, frontier: FrontierChart, rag: RagTrace }

export default function ProjectVisual({ kind }) {
  const Visual = visuals[kind]
  return Visual ? <Visual /> : null
}
