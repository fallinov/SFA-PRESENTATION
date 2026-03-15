<template>
  <div class="border-t border-gray-800 p-3">
    <form class="flex gap-2" @submit.prevent="handleSubmit">
      <textarea
        ref="inputRef"
        v-model="input"
        :disabled="disabled"
        :placeholder="placeholder"
        rows="1"
        class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
        @keydown.enter.exact.prevent="handleSubmit"
        @input="autoResize"
      />
      <UButton
        type="submit"
        size="sm"
        :disabled="disabled || !input.trim()"
        :loading="disabled"
        icon="i-lucide-send"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  disabled?: boolean
  placeholder?: string
}>(), {
  disabled: false,
  placeholder: 'Décrivez ce que vous voulez...',
})

const emit = defineEmits<{
  send: [content: string]
}>()

const input = ref('')
const inputRef = ref<HTMLTextAreaElement>()

function handleSubmit() {
  if (!input.value.trim() || props.disabled) return
  emit('send', input.value)
  input.value = ''
  nextTick(() => autoResize())
}

function autoResize() {
  const el = inputRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

onMounted(() => inputRef.value?.focus())

defineExpose({ focus: () => inputRef.value?.focus() })
</script>
