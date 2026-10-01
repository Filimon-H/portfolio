// Baseline vs model, one pair of bars per metric, scaled to the larger value in each row.
// Bars grow in when the surrounding [data-reveal] block is revealed (see .bar-grow in index.css).
export default function CompareBars({ comparison: c }) {
  const pct = (v, max) => `${(v / max) * 100}%`

  return (
    <figure className="space-y-space-sm">
      <figcaption className="font-label-mono text-label-mono uppercase text-outline flex flex-wrap items-center gap-x-space-md gap-y-1">
        <span>{c.title}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 bg-outline-variant" aria-hidden="true" />{c.baseline}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 bg-primary" aria-hidden="true" />{c.model}</span>
      </figcaption>
      <table className="w-full font-code-body text-body-sm">
        <caption className="sr-only">{c.title}: {c.baseline} compared with {c.model}</caption>
        <thead className="sr-only">
          <tr><th>Metric</th><th>{c.baseline}</th><th>{c.model}</th></tr>
        </thead>
        <tbody>
          {c.rows.map((r, i) => {
            const max = Math.max(r.baseline, r.model)
            return (
              <tr key={r.label} className="align-middle">
                <th scope="row" className="w-16 py-1.5 pr-space-sm text-left font-normal text-outline font-label-mono text-label-mono uppercase">{r.label}</th>
                <td className="py-1.5 w-full">
                  <div className="space-y-1">
                    <div className="flex items-center gap-space-sm">
                      <div className="h-1.5 bg-outline-variant bar-grow" style={{ width: pct(r.baseline, max), '--bar-d': `${i * 90}ms` }} />
                      <span className="text-outline shrink-0">{r.baseline}</span>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <div className="h-1.5 bg-primary bar-grow" style={{ width: pct(r.model, max), '--bar-d': `${i * 90 + 60}ms` }} />
                      <span className="text-primary shrink-0">{r.model}</span>
                    </div>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </figure>
  )
}
