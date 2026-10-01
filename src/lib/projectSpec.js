// Renders a project as a small YAML spec for the "Engineer" view of the Projects section.
const q = (v) => (/[:#{}[\],&*?|<>=!%@`'"]|^\s|\s$/.test(v) ? JSON.stringify(v) : v)

export function projectToYaml(p) {
  const lines = [
    `name: ${q(p.title)}`,
    `category: ${q(p.category)}`,
    `repo: ${p.repo.replace('https://', '')}`,
    `stack: [${p.tags.map(q).join(', ')}]`,
    'metrics:',
    ...p.metrics.map((m) => `  ${m.label.toLowerCase().replace(/[^a-z0-9]+/g, '_')}: ${q(m.value)}`),
  ]
  if (p.comparison) {
    lines.push(`baseline_vs_model:  # ${p.comparison.baseline} → ${p.comparison.model}, lower is better`)
    p.comparison.rows.forEach((r) => lines.push(`  ${r.label.toLowerCase().replace(/[^a-z0-9]+/g, '_')}: [${r.baseline}, ${r.model}]`))
  }
  return lines.join('\n')
}

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
