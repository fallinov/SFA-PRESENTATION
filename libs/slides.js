/**
 * SFA-PRESENTATION — Moteur de slides unifié
 * v2 — Améliorations UX & accessibilité
 *
 * Configuration via attributs data sur <body> :
 *   data-nav="scroll"  → navigation par scroll (WordPress style)
 *   (défaut)           → navigation par toggle (.slide.active)
 *
 * Éléments auto-détectés :
 *   .slide             → les slides
 *   #dots              → conteneur des points de navigation (créés automatiquement)
 *   #progress          → barre de progression (largeur mise à jour)
 *   #currentSlide      → numéro de slide courant
 *   #totalSlides       → nombre total de slides
 *   .code-block[data-code] → boutons copier ajoutés automatiquement
 *   #contrast-indicator ou #contrast-badge → indicateur mode contraste
 *
 * Éléments auto-créés :
 *   .skip-link          → lien skip-to-content (accessibilité)
 *   .keyboard-hint      → indication raccourcis clavier
 *   [aria-live]         → annonces pour lecteurs d'écran
 *
 * Raccourcis clavier :
 *   ← → ↑ ↓ Espace Entrée  → navigation
 *   Home / End               → première / dernière slide
 *   C                        → mode contraste élevé
 */
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body
  const isScroll = body.dataset.nav === 'scroll'
  const slides = document.querySelectorAll('.slide')
  const dotsContainer = document.getElementById('dots')
  const progressBar = document.getElementById('progress')
  const currentSlideEl = document.getElementById('currentSlide')
  const totalSlidesEl = document.getElementById('totalSlides')
  const contrastEl = document.getElementById('contrast-indicator') || document.getElementById('contrast-badge')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (slides.length === 0) return

  let current = 0
  const total = slides.length

  if (totalSlidesEl) totalSlidesEl.textContent = total

  // --- Utilitaire SVG sûr (pas de innerHTML) ---
  function createSvgIcon(paths, size) {
    const sz = size || 14
    const ns = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(ns, 'svg')
    svg.setAttribute('width', String(sz))
    svg.setAttribute('height', String(sz))
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke', 'currentColor')
    svg.setAttribute('stroke-width', '2')
    svg.setAttribute('stroke-linecap', 'round')
    svg.setAttribute('stroke-linejoin', 'round')
    svg.setAttribute('aria-hidden', 'true')
    paths.forEach(function(d) {
      var el
      if (d.startsWith('M') || d.startsWith('m')) {
        el = document.createElementNS(ns, 'path')
        el.setAttribute('d', d)
      } else {
        // rect: "rect x y w h rx"
        var parts = d.split(' ')
        el = document.createElementNS(ns, parts[0])
        for (var j = 1; j < parts.length; j += 2) {
          el.setAttribute(parts[j], parts[j + 1])
        }
      }
      svg.appendChild(el)
    })
    return svg
  }

  // --- Rôles ARIA sur les slides ---
  slides.forEach(function(s, i) {
    s.setAttribute('role', 'tabpanel')
    s.setAttribute('aria-label', 'Slide ' + (i + 1) + ' sur ' + total)
    s.id = s.id || 'slide-' + (i + 1)
  })

  // --- ARIA live region pour annonces ---
  const liveRegion = document.createElement('div')
  liveRegion.setAttribute('aria-live', 'polite')
  liveRegion.setAttribute('aria-atomic', 'true')
  liveRegion.className = 'sr-only'
  body.appendChild(liveRegion)

  // --- Skip link (accessibilité WCAG 2.4.1) ---
  const skipLink = document.createElement('a')
  skipLink.href = '#slide-1'
  skipLink.className = 'skip-link'
  skipLink.textContent = 'Aller au contenu'
  skipLink.addEventListener('click', function(e) {
    e.preventDefault()
    go(0)
    slides[0].focus()
  })
  body.insertBefore(skipLink, body.firstChild)

  // --- Keyboard hint ---
  const hint = document.createElement('div')
  hint.className = 'keyboard-hint'
  hint.setAttribute('aria-hidden', 'true')
  var keys = ['←', '→', 'C']
  keys.forEach(function(k) {
    var kbd = document.createElement('kbd')
    kbd.textContent = k
    hint.appendChild(kbd)
  })
  body.appendChild(hint)

  // --- Dots ---
  if (dotsContainer) {
    dotsContainer.setAttribute('role', 'tablist')
    dotsContainer.setAttribute('aria-label', 'Navigation slides')
    slides.forEach(function(_, i) {
      const dot = document.createElement('button')
      dot.className = 'nav-dot'
      dot.setAttribute('role', 'tab')
      dot.setAttribute('aria-label', 'Slide ' + (i + 1))
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false')
      dot.setAttribute('tabindex', i === 0 ? '0' : '-1')
      dot.addEventListener('click', function() { go(i) })
      dotsContainer.appendChild(dot)
    })
  }

  // --- Hash navigation (deep linking) ---
  function readHash() {
    const hash = location.hash
    if (hash) {
      const match = hash.match(/slide-(\d+)/)
      if (match) {
        const idx = parseInt(match[1], 10) - 1
        if (idx >= 0 && idx < total) return idx
      }
      const target = document.querySelector(hash)
      if (target && target.classList.contains('slide')) {
        const idx = Array.from(slides).indexOf(target)
        if (idx !== -1) return idx
      }
    }
    return 0
  }

  // --- Update ---
  function update(announce) {
    if (announce === undefined) announce = true

    if (!isScroll) {
      slides.forEach(function(s, i) {
        const isActive = i === current
        const wasActive = s.classList.contains('active')
        s.classList.toggle('active', isActive)

        if (isActive && !wasActive && !prefersReducedMotion) {
          s.classList.add('slide-enter')
          s.addEventListener('animationend', function() {
            s.classList.remove('slide-enter')
          }, { once: true })
        }
      })
    }

    if (dotsContainer) {
      var dots = dotsContainer.querySelectorAll('.nav-dot')
      dots.forEach(function(d, i) {
        const isActive = i === current
        d.classList.toggle('active', isActive)
        d.setAttribute('aria-selected', isActive ? 'true' : 'false')
        d.setAttribute('tabindex', isActive ? '0' : '-1')
      })
    }

    if (progressBar) {
      progressBar.style.width = ((current + 1) / total * 100) + '%'
    }

    if (currentSlideEl) currentSlideEl.textContent = current + 1

    // Mise à jour de l'URL sans scroll
    const slideId = slides[current].id || 'slide-' + (current + 1)
    history.replaceState(null, '', '#' + slideId)

    // Annonce pour lecteurs d'écran
    if (announce) {
      liveRegion.textContent = 'Slide ' + (current + 1) + ' sur ' + total
    }

    // Marquer que l'utilisateur a navigué (masquer le keyboard hint)
    if (!body.classList.contains('has-navigated') && current > 0) {
      body.classList.add('has-navigated')
    }
  }

  // --- Navigation ---
  function next() {
    if (current < total - 1) {
      current++
      if (isScroll) scrollToSlide(current)
      update()
    }
  }

  function prev() {
    if (current > 0) {
      current--
      if (isScroll) scrollToSlide(current)
      update()
    }
  }

  function go(i) {
    if (i >= 0 && i < total) {
      current = i
      if (isScroll) scrollToSlide(current)
      update()
    }
  }

  function scrollToSlide(i) {
    slides[i].scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })
  }

  // --- Clavier ---
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        next()
        break
      case ' ':
      case 'Enter':
        // Ne pas intercepter si focus sur un lien ou bouton
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') break
        e.preventDefault()
        next()
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        prev()
        break
      case 'Home':
        e.preventDefault()
        go(0)
        break
      case 'End':
        e.preventDefault()
        go(total - 1)
        break
      case 'c':
      case 'C':
        if (!e.ctrlKey && !e.metaKey) toggleContrast()
        break
    }
  })

  // --- Touch / Swipe (horizontal + vertical) ---
  let touchStartX = 0
  let touchStartY = 0

  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX
    touchStartY = e.changedTouches[0].screenY
  }, { passive: true })

  document.addEventListener('touchend', function(e) {
    const dx = touchStartX - e.changedTouches[0].screenX
    const dy = touchStartY - e.changedTouches[0].screenY

    // Ignorer si le geste est trop court
    if (Math.abs(dx) < 50 && Math.abs(dy) < 50) return

    // Utiliser l'axe dominant
    if (Math.abs(dx) > Math.abs(dy)) {
      dx > 0 ? next() : prev()
    } else if (!isScroll) {
      dy > 0 ? next() : prev()
    }
  }, { passive: true })

  // --- Mode contraste ---
  function toggleContrast() {
    const hc = body.classList.toggle('high-contrast')
    localStorage.setItem('highContrast', hc.toString())
    if (contrastEl) contrastEl.style.display = hc ? 'block' : 'none'
    liveRegion.textContent = hc ? 'Mode contraste élevé activé' : 'Mode contraste élevé désactivé'
    update(false)
  }

  if (localStorage.getItem('highContrast') === 'true') {
    body.classList.add('high-contrast')
    if (contrastEl) contrastEl.style.display = 'block'
  }

  // --- Scroll mode : IntersectionObserver ---
  if (isScroll) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const index = Array.from(slides).indexOf(entry.target)
          if (index !== -1) {
            current = index
            update(false)
          }
        }
      })
    }, { rootMargin: '-40% 0px -40% 0px' })

    slides.forEach(function(s) { observer.observe(s) })
  }

  // --- Boutons copier ---
  document.querySelectorAll('.code-block[data-code]').forEach(function(block) {
    const btn = document.createElement('button')
    btn.className = 'copy-btn'
    btn.setAttribute('aria-label', 'Copier le code')

    var copyIcon = createSvgIcon([
      'rect x 9 y 9 width 13 height 13 rx 2',
      'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'
    ], 14)
    var copyText = document.createTextNode(' Copier')
    btn.appendChild(copyIcon)
    btn.appendChild(copyText)

    btn.addEventListener('click', function() {
      const raw = block.getAttribute('data-code')
      const parser = new DOMParser()
      const doc = parser.parseFromString(raw, 'text/html')
      const code = doc.body.textContent || ''
      navigator.clipboard.writeText(code).then(function() {
        btn.classList.add('copied')
        // Remplacer le contenu par l'icône check
        while (btn.firstChild) btn.removeChild(btn.firstChild)
        var checkIcon = createSvgIcon(['M20 6L9 17l-5-5'], 14)
        btn.appendChild(checkIcon)
        btn.appendChild(document.createTextNode(' Copié !'))

        setTimeout(function() {
          btn.classList.remove('copied')
          while (btn.firstChild) btn.removeChild(btn.firstChild)
          var icon = createSvgIcon([
            'rect x 9 y 9 width 13 height 13 rx 2',
            'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'
          ], 14)
          btn.appendChild(icon)
          btn.appendChild(document.createTextNode(' Copier'))
        }, 2000)
      })
    })
    block.appendChild(btn)
  })

  // --- Init ---
  current = readHash()
  update(false)

  // --- API globale ---
  window.slideEngine = { next, prev, go, update, current: function() { return current }, total }
})
