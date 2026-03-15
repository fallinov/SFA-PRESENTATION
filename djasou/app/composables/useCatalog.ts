interface CatalogItem {
  slug: string
  name: string
  description: string
  category: string
}

const CATEGORY_LABELS: Record<string, string> = {
  layout: 'Mise en page',
  content: 'Contenu',
  data: 'Données',
  feedback: 'Retour visuel',
}

export function useCatalog() {
  const { data: components } = useFetch<CatalogItem[]>('/api/catalog', { lazy: true })

  const selection = ref(new Set<string>())

  const grouped = computed(() => {
    if (!components.value) return []

    const groups = new Map<string, { label: string, items: CatalogItem[] }>()

    for (const item of components.value) {
      if (!groups.has(item.category)) {
        groups.set(item.category, {
          label: CATEGORY_LABELS[item.category] ?? item.category,
          items: [],
        })
      }
      groups.get(item.category)!.items.push(item)
    }

    return Array.from(groups.values())
  })

  function toggle(slug: string) {
    const next = new Set(selection.value)
    if (next.has(slug)) next.delete(slug)
    else next.add(slug)
    selection.value = next
  }

  function isSelected(slug: string) {
    return selection.value.has(slug)
  }

  function clearSelection() {
    selection.value = new Set()
  }

  function selectedSlugs() {
    return Array.from(selection.value)
  }

  return {
    components,
    grouped,
    selection,
    toggle,
    isSelected,
    clearSelection,
    selectedSlugs,
  }
}
