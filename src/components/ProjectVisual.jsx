const mono = "'JetBrains Mono', ui-monospace, monospace"

function DagDiagram() {
  const box = { fill: 'currentColor', fillOpacity: 0.08, stroke: 'currentColor', strokeWidth: 1 }
  const label = { fill: 'currentColor', fontFamily: mono, fontSize: 8, textAnchor: 'middle' }
  return (
    <>
      <div className="w-full">
        <svg className="w-full h-auto text-on-surface" fill="none" viewBox="0 0 320 120" role="img" aria-label="Pipeline: Telethon to dbt tests, branching to YOLOv8 and Postgres, joining at the API">
          <rect {...box} x="10" y="45" width="70" height="30" /><text {...label} x="45" y="63">Telethon</text>
          <line className="flow" stroke="currentColor" strokeDasharray="2 2" x1="80" x2="110" y1="60" y2="60" />
          <rect {...box} x="110" y="45" width="60" height="30" /><text {...label} x="140" y="63">dbt Tests</text>
          <line className="flow" stroke="currentColor" x1="170" x2="200" y1="60" y2="35" />
          <line className="flow" stroke="currentColor" x1="170" x2="200" y1="60" y2="85" />
          <rect {...box} x="200" y="20" width="60" height="30" /><text {...label} x="230" y="38">YOLOv8</text>
          <rect {...box} x="200" y="70" width="60" height="30" /><text {...label} x="230" y="88">Postgres</text>
          <line className="flow" stroke="currentColor" x1="260" x2="280" y1="35" y2="60" />
          <line className="flow" stroke="currentColor" x1="260" x2="280" y1="85" y2="60" />
          <circle cx="290" cy="60" r="10" fill="currentColor" />
          <text fill="#131313" fontFamily={mono} fontSize="7" fontWeight="bold" textAnchor="middle" x="290" y="63">API</text>
        </svg>
      </div>
    </>
  )
}

function FrontierChart() {
  return (
    <>
      <div className="w-full">
        <svg className="w-full h-auto text-primary" fill="none" viewBox="0 0 300 120" role="img" aria-label="Efficient frontier curve with the optimal portfolio at a 0.94 Sharpe ratio">
          <path className="draw-path" pathLength="1" d="M20 100 Q 80 90, 140 45 T 280 20" stroke="currentColor" strokeWidth="1.5" />
          <g className="draw-pop">
            <circle cx="210" cy="27" r="4" fill="currentColor" />
            <text fill="currentColor" fontFamily={mono} fontSize="8" textAnchor="middle" x="210" y="16">OPTIMAL: 0.94 SHARPE</text>
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

function RagTrace() {
  return (
    <div className="w-full font-code-body text-body-sm space-y-1.5">
      <div className="text-outline">&gt; Q: "Withholding on dividends?"</div>
      <div className="text-primary">&gt; RETRIEVED: Proclamation 979/2016, Art. 55</div>
      <div className="text-on-surface-variant">&gt; ANSWER: "10% tax rate on gross dividend distributions..."</div>
      <div className="text-outline text-label-mono uppercase">✓ Citation check passed</div>
    </div>
  )
}

const visuals = { dag: DagDiagram, frontier: FrontierChart, rag: RagTrace }

export default function ProjectVisual({ kind }) {
  const Visual = visuals[kind]
  return Visual ? <Visual /> : null
}
