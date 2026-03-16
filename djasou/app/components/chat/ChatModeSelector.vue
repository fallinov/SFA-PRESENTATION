<template>
  <UButton
    size="xs"
    variant="soft"
    :icon="isSlideMode ? 'i-lucide-square' : 'i-lucide-layers'"
    @click="toggle"
  >
    {{ label }}
  </UButton>
</template>

<script setup lang="ts">
const props = defineProps<{
  slideIndex: number | undefined
  currentSlide: number
  totalSlides: number
}>()

const emit = defineEmits<{
  'update:slideIndex': [value: number | undefined]
}>()

const isSlideMode = computed(() => props.slideIndex !== undefined)

const label = computed(() =>
  isSlideMode.value
    ? `Slide ${(props.slideIndex ?? 0) + 1}/${props.totalSlides}`
    : 'Présentation',
)

function toggle() {
  emit('update:slideIndex', isSlideMode.value ? undefined : props.currentSlide)
}

// En mode slide, suivre la navigation de la preview
watch(() => props.currentSlide, (val) => {
  if (isSlideMode.value) {
    emit('update:slideIndex', val)
  }
})
</script>
