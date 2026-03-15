/**
 * Composable CRUD pour les présentations.
 */

export interface PresentationMeta {
  title: string
  slug: string
  author: string
  tags: string[]
  theme: string
  created: string
  updated: string
}

export interface Presentation {
  meta: PresentationMeta
  content: string
}

export function usePresentation(slug: MaybeRef<string>) {
  const resolvedSlug = toRef(slug)

  const { data, refresh, status } = useFetch<Presentation>(
    () => `/api/presentations/${resolvedSlug.value}`,
  )

  const meta = computed(() => data.value?.meta)
  const content = computed(() => data.value?.content ?? '')

  async function updateContent(newContent: string) {
    await $fetch(`/api/presentations/${resolvedSlug.value}`, {
      method: 'PUT',
      body: { content: newContent },
    })
    await refresh()
  }

  return {
    data,
    meta,
    content,
    status,
    refresh,
    updateContent,
  }
}

export function usePresentations() {
  const { data: presentations, refresh, status } = useFetch<PresentationMeta[]>(
    '/api/presentations',
  )

  async function create(title: string, theme?: string, tags?: string[]) {
    const result = await $fetch<Presentation>('/api/presentations', {
      method: 'POST',
      body: { title, theme, tags },
    })
    await refresh()
    return result
  }

  async function remove(presentationSlug: string) {
    await $fetch(`/api/presentations/${presentationSlug}`, {
      method: 'DELETE',
    })
    await refresh()
  }

  return {
    presentations,
    status,
    refresh,
    create,
    remove,
  }
}
