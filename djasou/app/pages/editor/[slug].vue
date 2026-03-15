<template>
  <div v-if="notFound" class="h-screen flex items-center justify-center bg-gray-950">
    <div class="text-center">
      <p class="text-5xl mb-4 text-gray-600">404</p>
      <h1 class="text-xl font-bold text-white mb-2">Présentation introuvable</h1>
      <p class="text-gray-500 mb-6">La présentation « {{ slug }} » n'existe pas.</p>
      <UButton to="/" variant="soft">Retour au dashboard</UButton>
    </div>
  </div>

  <EditorLayout v-else :initial-split="40">
    <!-- Panel gauche : chat -->
    <template #left>
      <ChatPanel ref="chatPanelRef" :slug="slug" />
    </template>

    <!-- Panel droit : preview -->
    <template #right>
      <PreviewPanel ref="previewRef" :slug="slug" />
    </template>
  </EditorLayout>
</template>

<script setup lang="ts">
import type PreviewPanelType from '~/components/preview/PreviewPanel.vue'
import type ChatPanelType from '~/components/chat/ChatPanel.vue'

definePageMeta({ layout: 'editor', middleware: 'auth' })

const route = useRoute()
const slug = route.params.slug as string

const notFound = ref(false)
const chatPanelRef = ref<InstanceType<typeof ChatPanelType>>()
const previewRef = ref<InstanceType<typeof PreviewPanelType>>()

// Vérifier que la présentation existe
onMounted(async () => {
  try {
    await $fetch(`/api/presentations/${slug}`)
  } catch (err) {
    const status = (err as { statusCode?: number })?.statusCode
      || (err as { response?: { status?: number } })?.response?.status
    if (status === 404) {
      notFound.value = true
      return
    }
  }

  // Quand un tool call modifie la présentation → rafraîchir la preview
  watch(
    () => chatPanelRef.value?.chat,
    (chat) => {
      if (!chat) return
      chat.onToolExecuted(() => {
        setTimeout(() => previewRef.value?.refresh(), 200)
      })
    },
    { immediate: true },
  )
})
</script>
