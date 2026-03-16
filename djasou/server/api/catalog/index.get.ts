import { loadCatalog } from '../../lib/catalog'

export default defineEventHandler(() => {
  return loadCatalog().map(({ content: _content, ...rest }) => rest)
})
