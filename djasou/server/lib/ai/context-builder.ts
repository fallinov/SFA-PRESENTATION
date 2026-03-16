/**
 * Construit le contexte de la présentation courante pour l'IA.
 */
import { getPresentation } from '../storage'
import { splitSlides } from '../md2slides'

export interface PresentationContext {
  markdown: string
  slideCount: number
  currentSlide?: string
  currentSlideIndex?: number
}

/**
 * Construit le contexte à injecter dans le prompt.
 * En mode "slide", ne retourne que le slide ciblé.
 */
export function buildContext(slug: string, slideIndex?: number): PresentationContext | null {
  const presentation = getPresentation(slug)
  if (!presentation) return null

  const slides = splitSlides(presentation.content)

  if (slideIndex !== undefined && slideIndex >= 0 && slideIndex < slides.length) {
    return {
      markdown: presentation.content,
      slideCount: slides.length,
      currentSlide: slides[slideIndex],
      currentSlideIndex: slideIndex,
    }
  }

  return {
    markdown: presentation.content,
    slideCount: slides.length,
  }
}
