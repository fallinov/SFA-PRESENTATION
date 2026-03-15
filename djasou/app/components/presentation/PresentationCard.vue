<template>
  <UCard
    class="cursor-pointer hover:ring-1 hover:ring-blue-500/50 transition-all group"
    @click="navigateTo(`/editor/${presentation.slug}`)"
  >
    <!-- Preview miniature -->
    <div class="aspect-video bg-gray-900 rounded-md mb-3 overflow-hidden border border-gray-800">
      <iframe
        v-if="previewHtml"
        :srcdoc="previewHtml"
        class="w-full h-full border-0 pointer-events-none"
        sandbox="allow-scripts allow-same-origin"
        tabindex="-1"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-700">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
    </div>

    <!-- Infos -->
    <div class="flex items-start justify-between gap-2">
      <div class="min-w-0">
        <h3 class="font-semibold text-white truncate">{{ presentation.title }}</h3>
        <p class="text-xs text-gray-500 mt-1">
          {{ formatDate(presentation.updated) }}
          · {{ presentation.author }}
        </p>
        <div v-if="presentation.tags?.length" class="flex flex-wrap gap-1 mt-2">
          <UBadge
            v-for="tag in presentation.tags"
            :key="tag"
            size="xs"
            variant="subtle"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>

      <UButton
        icon="i-lucide-trash-2"
        size="xs"
        variant="ghost"
        color="error"
        class="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        @click.stop="$emit('delete', presentation.slug)"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { PresentationMeta } from '~/composables/usePresentation'

const props = defineProps<{
  presentation: PresentationMeta
}>()

defineEmits<{
  delete: [slug: string]
}>()

// Preview miniature (lazy)
const previewHtml = ref('')

onMounted(async () => {
  try {
    previewHtml.value = await $fetch<string>(
      `/api/presentations/${props.presentation.slug}/render`,
      { responseType: 'text' },
    )
  } catch {
    // Pas grave si la preview échoue
  }
})

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-CH', {
    day: 'numeric',
    month: 'short',
  })
}
</script>
