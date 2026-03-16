/**
 * Tool definitions pour Claude.
 * Chaque tool modifie le fichier content.md côté serveur.
 */
import { tool } from 'ai'
import { z } from 'zod'
import { getPresentation, updatePresentation } from '../storage'
import { splitSlides, extractFrontmatter } from '../md2slides'

/**
 * Garantit que le frontmatter est présent.
 * Si absent, reconstruit un frontmatter minimal depuis le titre meta.json.
 */
function ensureFrontmatter(slug: string, content: string): string {
  const { raw } = extractFrontmatter(content)
  if (raw) return content

  // Frontmatter absent — reconstruire depuis meta.json
  const presentation = getPresentation(slug)
  const title = presentation?.meta?.title || slug
  return `---\ntitle: "${title}"\n---\n\n${content.trimStart()}`
}

/**
 * Crée les tools avec le slug de la présentation liée au contexte.
 */
export function createTools(slug: string) {
  return {
    update_presentation: tool({
      description: 'Remplace le contenu Markdown complet de la présentation (frontmatter + tous les slides). À utiliser pour créer une présentation complète ou la réécrire.',
      parameters: z.object({
        markdown: z.string().describe('Le contenu Markdown complet avec frontmatter YAML'),
      }),
      execute: async ({ markdown }) => {
        updatePresentation(slug, ensureFrontmatter(slug, markdown))
        return { success: true, message: 'Présentation mise à jour' }
      },
    }),

    update_slide: tool({
      description: 'Remplace le contenu d\'un slide spécifique par son index (0-based). Garde le frontmatter et les autres slides inchangés.',
      parameters: z.object({
        index: z.number().describe('Index du slide à modifier (0 = premier slide)'),
        content: z.string().describe('Nouveau contenu Markdown du slide (sans le séparateur ---)'),
      }),
      execute: async ({ index, content }) => {
        const presentation = getPresentation(slug)
        if (!presentation) return { success: false, message: 'Présentation introuvable' }

        const slides = splitSlides(presentation.content)
        if (index < 0 || index >= slides.length) {
          return { success: false, message: `Index ${index} invalide (${slides.length} slides)` }
        }

        slides[index] = content
        const { raw: frontmatterStr } = extractFrontmatter(presentation.content)
        const newContent = `${frontmatterStr}\n${slides.join('\n\n---\n\n')}\n`

        updatePresentation(slug, ensureFrontmatter(slug, newContent))
        return { success: true, message: `Slide ${index + 1} mis à jour` }
      },
    }),

    add_slide: tool({
      description: 'Insère un nouveau slide après un index donné. Utilise afterIndex=-1 pour insérer au début.',
      parameters: z.object({
        afterIndex: z.number().describe('Insérer après ce slide (-1 = au début, 0 = après le premier slide)'),
        content: z.string().describe('Contenu Markdown du nouveau slide'),
      }),
      execute: async ({ afterIndex, content }) => {
        const presentation = getPresentation(slug)
        if (!presentation) return { success: false, message: 'Présentation introuvable' }

        const slides = splitSlides(presentation.content)
        const insertIndex = afterIndex + 1
        slides.splice(insertIndex, 0, content)

        const { raw: frontmatterStr } = extractFrontmatter(presentation.content)
        const newContent = `${frontmatterStr}\n${slides.join('\n\n---\n\n')}\n`

        updatePresentation(slug, ensureFrontmatter(slug, newContent))
        return { success: true, message: `Slide inséré en position ${insertIndex + 1}` }
      },
    }),

    remove_slide: tool({
      description: 'Supprime un slide par son index (0-based).',
      parameters: z.object({
        index: z.number().describe('Index du slide à supprimer (0 = premier slide)'),
      }),
      execute: async ({ index }) => {
        const presentation = getPresentation(slug)
        if (!presentation) return { success: false, message: 'Présentation introuvable' }

        const slides = splitSlides(presentation.content)
        if (index < 0 || index >= slides.length) {
          return { success: false, message: `Index ${index} invalide (${slides.length} slides)` }
        }
        if (slides.length <= 1) {
          return { success: false, message: 'Impossible de supprimer le dernier slide' }
        }

        slides.splice(index, 1)
        const { raw: frontmatterStr } = extractFrontmatter(presentation.content)
        const newContent = `${frontmatterStr}\n${slides.join('\n\n---\n\n')}\n`

        updatePresentation(slug, ensureFrontmatter(slug, newContent))
        return { success: true, message: `Slide ${index + 1} supprimé` }
      },
    }),

    update_frontmatter: tool({
      description: 'Modifie le frontmatter YAML (titre, couleurs, gradients, mode navigation).',
      parameters: z.object({
        title: z.string().optional().describe('Nouveau titre'),
        nav: z.enum(['scroll', '']).optional().describe('Mode navigation : "scroll" ou vide'),
        colors: z.record(z.string()).optional().describe('Couleurs custom (ex: { wp: "#0073aa" })'),
        gradients: z.record(z.string()).optional().describe('Gradients custom (ex: { gradient-wp: "linear-gradient(...)" })'),
      }),
      execute: async ({ title, nav, colors, gradients }) => {
        const presentation = getPresentation(slug)
        if (!presentation) return { success: false, message: 'Présentation introuvable' }

        const { data: currentFm } = extractFrontmatter(presentation.content)
        const slides = splitSlides(presentation.content)

        const newFm: Record<string, unknown> = { ...currentFm }
        if (title !== undefined) newFm.title = title
        if (nav !== undefined) newFm.nav = nav || undefined
        if (colors !== undefined) newFm.colors = colors
        if (gradients !== undefined) newFm.gradients = gradients

        // Reconstruire le frontmatter
        const fmLines = ['---']
        for (const [key, value] of Object.entries(newFm)) {
          if (value === undefined) continue
          if (typeof value === 'object') {
            fmLines.push(`${key}:`)
            for (const [k, v] of Object.entries(value as Record<string, string>)) {
              fmLines.push(`  ${k}: "${v}"`)
            }
          } else {
            fmLines.push(`${key}: "${value}"`)
          }
        }
        fmLines.push('---')

        const newContent = `${fmLines.join('\n')}\n\n${slides.join('\n\n---\n\n')}\n`
        updatePresentation(slug, newContent)

        return { success: true, message: 'Frontmatter mis à jour' }
      },
    }),
  }
}
