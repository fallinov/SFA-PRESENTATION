<template>
  <div class="flex items-center gap-2 px-4 py-2 border-t border-gray-800 bg-gray-950/80">
    <!-- Boutons prev/next -->
    <UButton
      size="xs"
      variant="ghost"
      color="neutral"
      icon="i-lucide-chevron-left"
      :disabled="currentSlide === 0"
      @click="previous"
    />

    <!-- Dots -->
    <div class="flex items-center gap-1.5 flex-1 justify-center">
      <button
        v-for="i in totalSlides"
        :key="i"
        class="w-2.5 h-2.5 rounded-full transition-all"
        :class="currentSlide === i - 1
          ? 'bg-blue-500 scale-125'
          : 'bg-gray-600 hover:bg-gray-400'"
        :title="`Slide ${i}`"
        @click="goToSlide(i - 1)"
      />
    </div>

    <UButton
      size="xs"
      variant="ghost"
      color="neutral"
      icon="i-lucide-chevron-right"
      :disabled="currentSlide >= totalSlides - 1"
      @click="next"
    />

    <!-- Compteur -->
    <span class="text-xs text-gray-500 font-mono tabular-nums min-w-[4ch] text-right">
      {{ currentSlide + 1 }}/{{ totalSlides }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentSlide: number
  totalSlides: number
}>()

const emit = defineEmits<{
  goToSlide: [index: number]
  next: []
  previous: []
}>()

function goToSlide(index: number) {
  emit('goToSlide', index)
}

function next() {
  emit('next')
}

function previous() {
  emit('previous')
}
</script>
