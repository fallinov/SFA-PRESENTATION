/**
 * SFA-PRESENTATION — Moteur de slides unifié
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

  if (slides.length === 0) return

  let current = 0
  const total = slides.length

  if (totalSlidesEl) totalSlidesEl.textContent = total

  // --- Dots ---
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button')
      dot.className = 'nav-dot'
      dot.setAttribute('aria-label', 'Slide ' + (i + 1))
      dot.addEventListener('click', () => go(i))
      dotsContainer.appendChild(dot)
    })
  }

  // --- Update ---
  function update() {
    if (!isScroll) {
      slides.forEach((s, i) => s.classList.toggle('active', i === current))
    }

    if (dotsContainer) {
      dotsContainer.querySelectorAll('.nav-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current)
      })
    }

    if (progressBar) {
      progressBar.style.width = ((current + 1) / total * 100) + '%'
    }

    if (currentSlideEl) currentSlideEl.textContent = current + 1
  }

  // --- Navigation ---
  function next() {
    if (current < total - 1) {
      current++
      if (isScroll) slides[current].scrollIntoView({ behavior: 'smooth' })
      update()
    }
  }

  function prev() {
    if (current > 0) {
      current--
      if (isScroll) slides[current].scrollIntoView({ behavior: 'smooth' })
      update()
    }
  }

  function go(i) {
    if (i >= 0 && i < total) {
      current = i
      if (isScroll) slides[current].scrollIntoView({ behavior: 'smooth' })
      update()
    }
  }

  // --- Clavier ---
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'Enter':
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
        toggleContrast()
        break
    }
  })

  // --- Touch / Swipe ---
  let touchStartX = 0
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX
  })
  document.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev()
    }
  })

  // --- Mode contraste ---
  function toggleContrast() {
    const hc = body.classList.toggle('high-contrast')
    localStorage.setItem('highContrast', hc.toString())
    if (contrastEl) contrastEl.style.display = hc ? 'block' : 'none'
    update()
  }

  if (localStorage.getItem('highContrast') === 'true') {
    body.classList.add('high-contrast')
    if (contrastEl) contrastEl.style.display = 'block'
  }

  // --- Scroll mode : IntersectionObserver ---
  if (isScroll) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(slides).indexOf(entry.target)
          if (index !== -1) {
            current = index
            update()
          }
        }
      })
    }, { rootMargin: '-40% 0px -40% 0px' })

    slides.forEach(s => observer.observe(s))
  }

  // --- Boutons copier ---
  document.querySelectorAll('.code-block[data-code]').forEach(block => {
    const btn = document.createElement('button')
    btn.className = 'copy-btn'
    btn.textContent = 'Copier'
    btn.addEventListener('click', () => {
      const raw = block.getAttribute('data-code')
      const parser = new DOMParser()
      const doc = parser.parseFromString(raw, 'text/html')
      const code = doc.body.textContent || ''
      navigator.clipboard.writeText(code).then(() => {
        btn.classList.add('copied')
        btn.textContent = 'Copié !'
        setTimeout(() => {
          btn.classList.remove('copied')
          btn.textContent = 'Copier'
        }, 2000)
      })
    })
    block.appendChild(btn)
  })

  // --- Init ---
  update()

  // --- API globale ---
  window.slideEngine = { next, prev, go, update, current: () => current, total }
})
