<template>
  <div class="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-950/80">
    <span class="text-sm font-medium text-gray-400">Preview</span>

    <div class="flex items-center gap-3">
      <!-- Zoom -->
      <div class="flex items-center gap-2">
        <UButton
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-minus"
          @click="$emit('zoom', zoom - 25)"
        />
        <span class="text-xs text-gray-500 font-mono tabular-nums min-w-[3ch] text-center">
          {{ zoom }}%
        </span>
        <UButton
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-plus"
          @click="$emit('zoom', zoom + 25)"
        />
      </div>

      <div class="w-px h-4 bg-gray-700" />

      <!-- Actions -->
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-lucide-refresh-cw"
        @click="$emit('refresh')"
      />
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-lucide-maximize"
        @click="$emit('fullscreen')"
      />
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-lucide-download"
        :href="exportUrl"
        target="_blank"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  zoom: number
  exportUrl: string
}>()

defineEmits<{
  zoom: [value: number]
  refresh: []
  fullscreen: []
}>()
</script>
