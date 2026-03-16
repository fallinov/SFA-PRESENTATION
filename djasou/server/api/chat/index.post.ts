/**
 * POST /api/chat
 * Chat IA avec streaming SSE.
 * Utilise Vercel AI SDK + Anthropic provider.
 */
import { createAnthropic } from '@ai-sdk/anthropic'
import { streamText, type CoreMessage } from 'ai'
import { buildContext } from '../../lib/ai/context-builder'
import { buildSystemPrompt } from '../../lib/ai/system-prompt'
import { createTools } from '../../lib/ai/tools'

interface ChatBody {
  presentationSlug: string
  slideIndex?: number
  messages: CoreMessage[]
  catalogSelection?: string[]
}

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const config = useRuntimeConfig()
  if (!config.anthropicApiKey) {
    throw createError({ statusCode: 500, message: 'Clé API Anthropic non configurée' })
  }

  const { presentationSlug, slideIndex, messages, catalogSelection } = await readBody<ChatBody>(event)

  if (!presentationSlug || !messages?.length) {
    throw createError({ statusCode: 400, message: 'presentationSlug et messages requis' })
  }

  // Construire le contexte et le system prompt
  const context = buildContext(presentationSlug, slideIndex)
  const systemPrompt = buildSystemPrompt(context, catalogSelection)
  const tools = createTools(presentationSlug)

  const anthropic = createAnthropic({ apiKey: config.anthropicApiKey })

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: systemPrompt,
    messages,
    tools,
    maxSteps: 5,
  })

  // Streamer en format SSE custom pour le client
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const part of result.fullStream) {
          let event: string | null = null

          switch (part.type) {
            case 'text-delta':
              event = JSON.stringify({ type: 'text-delta', text: part.textDelta })
              break
            case 'tool-call':
              event = JSON.stringify({
                type: 'tool-call',
                toolName: part.toolName,
                args: part.args,
              })
              break
            case 'tool-result':
              event = JSON.stringify({
                type: 'tool-result',
                toolName: part.toolName,
                result: part.result,
              })
              break
            case 'error':
              event = JSON.stringify({ type: 'error', error: String(part.error) })
              break
            case 'finish':
              event = JSON.stringify({ type: 'finish' })
              break
          }

          if (event) {
            controller.enqueue(encoder.encode(`data: ${event}\n\n`))
          }
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'error', error: String(err) })}\n\n`),
        )
      } finally {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      }
    },
  })

  setResponseHeader(event, 'content-type', 'text/event-stream')
  setResponseHeader(event, 'cache-control', 'no-cache')
  setResponseHeader(event, 'connection', 'keep-alive')

  return stream
})
