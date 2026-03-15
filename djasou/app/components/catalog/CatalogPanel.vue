<template>
  <USlideover
    v-model:open="isOpen"
    side="left"
    title="Composants"
    :ui="{ body: 'p-0' }"
  >
    <template #body>
      <div class="p-4 space-y-6">
        <div v-for="group in catalog.grouped.value" :key="group.label">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {{ group.label }}
          </h3>

          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="item in group.items"
              :key="item.slug"
              class="text-left px-3 py-2 rounded-lg border transition-colors"
              :class="catalog.isSelected(item.slug)
                ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                : 'border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700 hover:text-gray-300'"
              @click="catalog.toggle(item.slug)"
            >
              <p class="text-xs font-medium truncate">{{ item.name }}</p>
              <p class="text-[10px] text-gray-600 truncate mt-0.5">{{ item.description }}</p>
            </button>
          </div>
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <UButton
        color="neutral"
        variant="outline"
        size="sm"
        @click="catalog.clearSelection(); close()"
      >
        Annuler
      </UButton>
      <UButton
        size="sm"
        :disabled="!catalog.selection.value.size"
        @click="apply(close)"
      >
        Utiliser ({{ catalog.selection.value.size }})
      </UButton>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'apply': [slugs: string[]]
}>()

const isOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit('update:open', val),
})

const catalog = useCatalog()

function apply(closeFn: () => void) {
  emit('apply', catalog.selectedSlugs())
  catalog.clearSelection()
  closeFn()
}
</script>
