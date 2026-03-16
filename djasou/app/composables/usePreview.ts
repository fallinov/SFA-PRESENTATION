/**
 * Composable pour la preview iframe des slides.
 * Gère le chargement du HTML, le zoom et le fullscreen.
 */
export function usePreview(slug: MaybeRef<string>) {
  const resolvedSlug = toRef(slug)

  const html = ref('')
  const loading = ref(false)
  const zoom = ref(100)
  const isFullscreen = ref(false)

  async function refresh() {
    loading.value = true
    try {
      html.value = await $fetch<string>(
        `/api/presentations/${resolvedSlug.value}/render`,
        { responseType: 'text' },
      )
    } catch {
      // 404 ou autre erreur — la preview reste vide
      html.value = ''
    } finally {
      loading.value = false
    }
  }

  function setZoom(value: number) {
    zoom.value = Math.max(25, Math.min(200, value))
  }

  function toggleFullscreen(container: HTMLElement | null) {
    if (!container) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
      isFullscreen.value = false
    } else {
      container.requestFullscreen()
      isFullscreen.value = true
    }
  }

  // Charger au montage
  onMounted(refresh)

  // Recharger si le slug change
  watch(resolvedSlug, refresh)

  return {
    html,
    loading,
    zoom,
    isFullscreen,
    refresh,
    setZoom,
    toggleFullscreen,
  }
}
