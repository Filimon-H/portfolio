// Loaded on demand so the highlighter never weighs on the initial page.
let ready

export function loadHighlighter() {
  ready ??= Promise.all([
    import('highlight.js/lib/core'),
    import('highlight.js/lib/languages/python'),
    import('highlight.js/lib/languages/sql'),
    import('highlight.js/lib/languages/yaml'),
  ]).then(([{ default: hljs }, python, sql, yaml]) => {
    hljs.registerLanguage('python', python.default)
    hljs.registerLanguage('sql', sql.default)
    hljs.registerLanguage('yaml', yaml.default)
    return hljs
  })
  return ready
}
