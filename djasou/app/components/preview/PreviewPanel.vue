<template>
  <div ref="panelRef" class="flex flex-col h-full">
    <PreviewToolbar
      :zoom="preview.zoom.value"
      :export-url="`/api/presentations/${slug}/export`"
      @zoom="preview.setZoom"
      @refresh="preview.refresh"
      @fullscreen="preview.toggleFullscreen(panelRef)"
    />

    <div class="flex-1 overflow-hidden">
      <PreviewIframe
        ref="previewIframeRef"
        :html="preview.html.value"
        :zoom="preview.zoom.value"
        :loading="preview.loading.value"
        @ready="onIframeReady"
      />
    </div>

    <SlideNavigator
      :current-slide="slideNav.currentSlide.value"
      :total-slides="slideNav.totalSlides.value"
      @go-to-slide="slideNav.goToSlide"
      @next="slideNav.next"
      @previous="slideNav.previous"
    />
  </div>
</template>

<script setup lang="ts">
import SlideNavigator from '../editor/SlideNavigator.vue'
import type PreviewIframeType from './PreviewIframe.vue'

const props = defineProps<{
  slug: string
}>()

const panelRef = ref<HTMLElement | null>(null)
const previewIframeRef = ref<InstanceType<typeof PreviewIframeType>>()

const preview = usePreview(computed(() => props.slug))

const iframeElement = computed(() => previewIframeRef.value?.iframeRef)
const slideNav = useSlideNavigation(iframeElement as Ref<HTMLIFrameElement | undefined>)

function onIframeReady() {
  slideNav.injectBridge()
}

defineExpose({
  refresh: preview.refresh,
  currentSlide: slideNav.currentSlide,
  totalSlides: slideNav.totalSlides,
})
</script>
