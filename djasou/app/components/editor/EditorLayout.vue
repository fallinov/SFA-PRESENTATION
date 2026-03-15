<template>
  <div
    ref="containerRef"
    class="flex h-full select-none"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <!-- Panel gauche -->
    <div :style="{ width: `${leftWidth}%` }" class="flex-shrink-0 overflow-hidden">
      <slot name="left" />
    </div>

    <!-- Divider draggable -->
    <div
      class="w-1 bg-gray-800 hover:bg-blue-500 cursor-col-resize flex-shrink-0 transition-colors"
      :class="{ 'bg-blue-500': dragging }"
      @pointerdown="onPointerDown"
    />

    <!-- Panel droit -->
    <div class="flex-1 overflow-hidden">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  initialSplit?: number
  minWidth?: number
}>(), {
  initialSplit: 40,
  minWidth: 20,
})

const containerRef = ref<HTMLElement>()
const leftWidth = ref(props.initialSplit)
const dragging = ref(false)

function onPointerDown(e: PointerEvent) {
  dragging.value = true
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value || !containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const pct = ((e.clientX - rect.left) / rect.width) * 100
  leftWidth.value = Math.max(props.minWidth, Math.min(100 - props.minWidth, pct))
}

function onPointerUp() {
  dragging.value = false
}
</script>
