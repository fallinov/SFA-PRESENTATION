/**
 * Composable pour la navigation entre slides.
 * Communique avec l'iframe preview via postMessage.
 */
export function useSlideNavigation(iframeRef: Ref<HTMLIFrameElement | undefined>) {
  const currentSlide = ref(0)
  const totalSlides = ref(0)

  function goToSlide(index: number) {
    if (index < 0 || index >= totalSlides.value) return
    currentSlide.value = index

    // Envoyer un message à l'iframe pour naviguer
    iframeRef.value?.contentWindow?.postMessage(
      { type: 'djasou:goToSlide', index },
      '*',
    )
  }

  function next() {
    goToSlide(currentSlide.value + 1)
  }

  function previous() {
    goToSlide(currentSlide.value - 1)
  }

  // Écouter les messages de l'iframe (slide change)
  function onMessage(event: MessageEvent) {
    if (event.data?.type === 'djasou:slideChanged') {
      currentSlide.value = event.data.index
    }
    if (event.data?.type === 'djasou:slideCount') {
      totalSlides.value = event.data.count
    }
  }

  onMounted(() => window.addEventListener('message', onMessage))
  onUnmounted(() => window.removeEventListener('message', onMessage))

  /**
   * Après chargement de l'iframe, injecter un script
   * qui notifie Djasou des changements de slide.
   */
  function injectBridge() {
    const iframe = iframeRef.value
    if (!iframe?.contentDocument) return

    const script = iframe.contentDocument.createElement('script')
    script.textContent = `
      (function() {
        // Compter les slides
        var slides = document.querySelectorAll('.slide');
        parent.postMessage({ type: 'djasou:slideCount', count: slides.length }, '*');

        // Observer le slide actif
        var observer = new MutationObserver(function() {
          var active = document.querySelector('.slide.active');
          if (active) {
            var index = Array.from(slides).indexOf(active);
            parent.postMessage({ type: 'djasou:slideChanged', index: index }, '*');
          }
        });

        slides.forEach(function(slide) {
          observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
        });

        // Écouter les commandes de navigation
        window.addEventListener('message', function(e) {
          if (e.data && e.data.type === 'djasou:goToSlide') {
            var target = slides[e.data.index];
            if (target && window.goToSlide) {
              window.goToSlide(e.data.index);
            } else if (target) {
              // Fallback : simuler un clic sur le dot
              var dots = document.querySelectorAll('#dots button');
              if (dots[e.data.index]) dots[e.data.index].click();
            }
          }
        });

        // Envoyer le slide initial
        var initial = document.querySelector('.slide.active');
        if (initial) {
          var idx = Array.from(slides).indexOf(initial);
          parent.postMessage({ type: 'djasou:slideChanged', index: idx }, '*');
        }
      })();
    `
    iframe.contentDocument.body.appendChild(script)
  }

  return {
    currentSlide,
    totalSlides,
    goToSlide,
    next,
    previous,
    injectBridge,
  }
}
