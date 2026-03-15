<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-white">Présentations</h1>
      <UButton @click="showCreate = true; createError = ''">
        Nouvelle présentation
      </UButton>
    </div>

    <!-- Grille des présentations -->
    <div v-if="presentations?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <PresentationCard
        v-for="p in presentations"
        :key="p.slug"
        :presentation="p"
        @delete="confirmDelete"
      />
    </div>

    <div v-else class="text-center py-24 text-gray-500">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <p class="text-lg">Aucune présentation</p>
      <p class="text-sm mt-2 text-gray-600">Créez votre première présentation pour commencer.</p>
    </div>

    <!-- Modal création -->
    <UModal v-model:open="showCreate">
      <template #content>
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Nouvelle présentation</h3>
          </template>

          <UForm :state="newForm" @submit="handleCreate">
            <div class="space-y-4">
              <UFormField label="Titre" name="title">
                <UInput v-model="newForm.title" placeholder="Ma présentation" class="w-full" autofocus />
              </UFormField>

              <div v-if="createError" class="text-sm text-red-400 bg-red-500/10 rounded-md px-3 py-2">
                {{ createError }}
              </div>

              <UButton type="submit" block :loading="creating">
                Créer
              </UButton>
            </div>
          </UForm>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const { presentations, remove, create } = usePresentations()

const showCreate = ref(false)
const creating = ref(false)
const createError = ref('')
const newForm = reactive({ title: '' })

async function handleCreate() {
  if (!newForm.title.trim()) return
  creating.value = true
  createError.value = ''

  try {
    const result = await create(newForm.title.trim())
    showCreate.value = false
    newForm.title = ''
    navigateTo(`/editor/${result.meta.slug}`)
  } catch (err) {
    const msg = (err as { data?: { message?: string } })?.data?.message
      || (err as Error)?.message
      || 'Erreur lors de la création'
    createError.value = msg
  } finally {
    creating.value = false
  }
}

async function confirmDelete(slug: string) {
  if (!confirm('Supprimer cette présentation ?')) return
  try {
    await remove(slug)
  } catch (err) {
    const msg = (err as { data?: { message?: string } })?.data?.message
      || 'Erreur lors de la suppression'
    alert(msg)
  }
}
</script>
