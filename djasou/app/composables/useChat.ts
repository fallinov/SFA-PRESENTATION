/**
 * Composable chat avec streaming SSE.
 * Gère les messages, l'envoi, le streaming et la détection des tool calls.
 */

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  toolCalls?: ToolCallInfo[]
}

export interface ToolCallInfo {
  toolName: string
  args: Record<string, unknown>
  result?: unknown
}

interface StreamEvent {
  type: 'text-delta' | 'tool-call' | 'tool-result' | 'error' | 'finish'
  text?: string
  toolName?: string
  args?: Record<string, unknown>
  result?: unknown
  error?: string
}

export function useChat(slug: MaybeRef<string>) {
  const resolvedSlug = toRef(slug)

  const messages = ref<ChatMessage[]>([])
  const isStreaming = ref(false)
  const error = ref<string | null>(null)
  const slideIndex = ref<number | undefined>(undefined)
  const catalogSelection = ref<string[] | undefined>(undefined)

  // Émis quand un tool call modifie la présentation
  const toolCallbacks: Array<(tc: ToolCallInfo) => void> = []
  function onToolExecuted(cb: (tc: ToolCallInfo) => void) {
    toolCallbacks.push(cb)
  }

  function generateId(): string {
    return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  }

  async function send(content: string) {
    if (!content.trim() || isStreaming.value) return

    error.value = null

    // Ajouter le message utilisateur
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
    }
    messages.value.push(userMessage)

    // Préparer le message assistant (vide, sera rempli par le stream)
    const assistantId = generateId()
    messages.value.push({
      id: assistantId,
      role: 'assistant',
      content: '',
      toolCalls: [],
    })
    const assistantIdx = messages.value.length - 1

    isStreaming.value = true

    try {
      // Construire les messages pour l'API (format CoreMessage)
      const apiMessages = messages.value
        .filter(m => m.id !== assistantId)
        .map(m => ({ role: m.role, content: m.content }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presentationSlug: resolvedSlug.value,
          slideIndex: slideIndex.value,
          messages: apiMessages,
          catalogSelection: catalogSelection.value,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({ message: 'Erreur serveur' }))
        throw new Error(err.message || `HTTP ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('Pas de stream')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()

          if (data === '[DONE]') continue

          try {
            const event: StreamEvent = JSON.parse(data)
            const msg = messages.value[assistantIdx]!

            switch (event.type) {
              case 'text-delta':
                msg.content += event.text || ''
                // Trigger reactivity via splice-in-place
                messages.value.splice(assistantIdx, 1, { ...msg })
                break

              case 'tool-call': {
                const toolCall: ToolCallInfo = {
                  toolName: event.toolName!,
                  args: event.args || {},
                }
                msg.toolCalls = [...(msg.toolCalls || []), toolCall]
                messages.value.splice(assistantIdx, 1, { ...msg })
                break
              }

              case 'tool-result': {
                const tc = msg.toolCalls?.find(
                  t => t.toolName === event.toolName && !t.result,
                )
                if (tc) {
                  tc.result = event.result
                  messages.value.splice(assistantIdx, 1, { ...msg })
                  // Notifier que la présentation a changé
                  toolCallbacks.forEach(cb => cb(tc))
                }
                break
              }

              case 'error':
                error.value = event.error || 'Erreur inconnue'
                break
            }
          } catch {
            // Ligne SSE malformée, on ignore
          }
        }
      }
    } catch (err) {
      error.value = (err as Error).message
      // Retirer le message assistant vide en cas d'erreur
      const assistantMsg = messages.value[assistantIdx]
      if (assistantMsg && !assistantMsg.content && !assistantMsg.toolCalls?.length) {
        messages.value.splice(assistantIdx, 1)
      }
    } finally {
      isStreaming.value = false
      // Reset la sélection catalogue après envoi
      catalogSelection.value = undefined
    }
  }

  function clear() {
    messages.value = []
    error.value = null
  }

  function setSlideMode(index: number | undefined) {
    slideIndex.value = index
  }

  function setCatalogSelection(selection: string[] | undefined) {
    catalogSelection.value = selection
  }

  return {
    messages,
    isStreaming,
    error,
    slideIndex,
    catalogSelection,
    send,
    clear,
    setSlideMode,
    setCatalogSelection,
    onToolExecuted,
  }
}
