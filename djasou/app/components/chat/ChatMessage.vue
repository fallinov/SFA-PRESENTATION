<template>
  <div
    class="px-4 py-3"
    :class="message.role === 'user' ? 'bg-gray-900/50' : ''"
  >
    <!-- Rôle -->
    <div class="flex items-center gap-2 mb-1">
      <span
        class="text-xs font-medium"
        :class="message.role === 'user' ? 'text-blue-400' : 'text-green-400'"
      >
        {{ message.role === 'user' ? 'Vous' : 'Djasou' }}
      </span>
    </div>

    <!-- Contenu texte -->
    <div
      v-if="message.content"
      class="text-sm text-gray-300 leading-relaxed prose-chat"
      v-html="renderedContent"
    />

    <!-- Tool calls -->
    <div v-if="message.toolCalls?.length" class="mt-2 space-y-1">
      <div
        v-for="(tc, i) in message.toolCalls"
        :key="i"
        class="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-md"
        :class="tc.result ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'"
      >
        <svg v-if="tc.result" class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <div v-else class="w-3.5 h-3.5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
        <span>{{ formatToolCall(tc) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage, ToolCallInfo } from '~/composables/useChat'

const props = defineProps<{
  message: ChatMessage
}>()

const renderedContent = computed(() => {
  // Rendu basique : paragraphes, code inline, gras
  let html = props.message.content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Code blocks ```
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g,
    '<pre class="bg-gray-800 rounded-md p-3 my-2 overflow-x-auto text-xs"><code>$2</code></pre>')
  // Code inline
  html = html.replace(/`([^`]+)`/g,
    '<code class="bg-gray-800 px-1.5 py-0.5 rounded text-xs text-blue-300">$1</code>')
  // Gras
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
  // Italique
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // Paragraphes
  html = html.split('\n\n').map(p => `<p>${p}</p>`).join('')
  // Line breaks simples
  html = html.replace(/\n/g, '<br>')

  return html
})

function formatToolCall(tc: ToolCallInfo): string {
  const names: Record<string, string> = {
    update_presentation: 'Mise à jour de la présentation',
    update_slide: `Modification du slide ${((tc.args.index as number) ?? 0) + 1}`,
    add_slide: `Ajout d'un slide`,
    remove_slide: `Suppression du slide ${((tc.args.index as number) ?? 0) + 1}`,
    update_frontmatter: 'Modification du frontmatter',
  }
  return names[tc.toolName] || tc.toolName
}
</script>

<style>
.prose-chat p {
  margin-bottom: 0.5rem;
}
.prose-chat p:last-child {
  margin-bottom: 0;
}
</style>
