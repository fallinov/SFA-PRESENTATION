<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="border-b border-gray-800 px-4 py-2 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <h2 class="text-sm font-medium text-gray-400">Chat</h2>
        <ChatModeSelector
          v-model:slide-index="chatSlideIndex"
          :current-slide="currentSlide"
          :total-slides="totalSlides"
        />
      </div>
      <div class="flex items-center gap-1">
        <UButton
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-layout-grid"
          @click="catalogOpen = true"
        >
          <template v-if="catalogCount" #trailing>
            <UBadge size="xs" variant="solid" :label="String(catalogCount)" />
          </template>
        </UButton>
        <UButton
          v-if="chat.messages.value.length"
          size="xs"
          variant="ghost"
          color="neutral"
          @click="chat.clear()"
        >
          Effacer
        </UButton>
      </div>
    </div>

    <!-- Catalogue -->
    <CatalogPanel
      v-model:open="catalogOpen"
      @apply="onCatalogApply"
    />

    <!-- Messages -->
    <div ref="messagesRef" class="flex-1 overflow-y-auto">
      <!-- État vide -->
      <div
        v-if="!chat.messages.value.length"
        class="h-full flex flex-col items-center justify-center p-6 text-center"
      >
        <svg class="w-10 h-10 mb-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p class="text-sm text-gray-500 mb-4">Demandez à Djasou de créer ou modifier votre présentation.</p>

        <!-- Suggestions -->
        <div class="space-y-2 w-full max-w-xs">
          <button
            v-for="suggestion in suggestions"
            :key="suggestion"
            class="w-full text-left text-xs px-3 py-2 rounded-lg bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300 transition-colors"
            @click="chat.send(suggestion)"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div v-else class="divide-y divide-gray-800/50">
        <ChatMessage
          v-for="msg in chat.messages.value"
          :key="msg.id"
          :message="msg"
        />
      </div>

      <!-- Streaming indicator -->
      <div v-if="chat.isStreaming.value" class="px-4 py-2">
        <div class="flex items-center gap-2 text-xs text-blue-400">
          <div class="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          Djasou réfléchit...
        </div>
      </div>

      <!-- Erreur -->
      <div v-if="chat.error.value" class="px-4 py-2">
        <div class="text-xs text-red-400 bg-red-500/10 rounded-md px-3 py-2">
          {{ chat.error.value }}
        </div>
      </div>
    </div>

    <!-- Input -->
    <ChatInput
      :disabled="chat.isStreaming.value"
      @send="chat.send"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  slug: string
  currentSlide: number
  totalSlides: number
}>()

const chat = useChat(computed(() => props.slug))
const messagesRef = ref<HTMLElement>()
const catalogOpen = ref(false)

const chatSlideIndex = computed({
  get: () => chat.slideIndex.value,
  set: (val: number | undefined) => chat.setSlideMode(val),
})

const catalogCount = computed(() =>
  chat.catalogSelection.value?.length ?? 0,
)

function onCatalogApply(slugs: string[]) {
  chat.setCatalogSelection(slugs.length ? slugs : undefined)
}

const suggestions = [
  'Crée une présentation de 5 slides sur Python',
  'Ajoute un slide avec des statistiques',
  'Change les couleurs du thème en bleu',
]

// Scroll automatique vers le bas
watch(
  () => chat.messages.value.length,
  () => {
    nextTick(() => {
      if (messagesRef.value) {
        messagesRef.value.scrollTop = messagesRef.value.scrollHeight
      }
    })
  },
)

// Aussi scroller pendant le streaming (text-delta)
watch(
  () => chat.messages.value[chat.messages.value.length - 1]?.content,
  () => {
    nextTick(() => {
      if (messagesRef.value) {
        messagesRef.value.scrollTop = messagesRef.value.scrollHeight
      }
    })
  },
)

// Exposer le chat pour l'intégration tool calls → preview
defineExpose({ chat })
</script>
