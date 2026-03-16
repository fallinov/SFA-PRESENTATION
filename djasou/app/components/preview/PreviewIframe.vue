<template>
  <div ref="containerRef" class="relative w-full h-full bg-black overflow-hidden">
    <div
      class="origin-top-left"
      :style="{
        transform: `scale(${zoom / 100})`,
        width: `${10000 / zoom}%`,
        height: `${10000 / zoom}%`,
      }"
    >
      <iframe
        ref="iframeRef"
        :srcdoc="html"
        class="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
        @load="onLoad"
      />
    </div>

    <!-- Loading overlay -->
    <div
      v-if="loading"
      class="absolute inset-0 bg-black/60 flex items-center justify-center"
    >
      <div class="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  html: string
  zoom: number
  loading: boolean
}>()

const emit = defineEmits<{
  ready: [iframe: HTMLIFrameElement]
}>()

const containerRef = ref<HTMLElement>()
const iframeRef = ref<HTMLIFrameElement>()

function onLoad() {
  if (iframeRef.value) {
    emit('ready', iframeRef.value)
  }
}

defineExpose({ iframeRef })
</script>
