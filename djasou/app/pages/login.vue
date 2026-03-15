<template>
  <div class="w-full max-w-sm mx-auto">
    <h1 class="text-3xl font-bold text-white text-center mb-8">Djasou</h1>

    <UCard>
      <UForm :state="form" @submit="login">
        <div class="space-y-4">
          <UFormField label="Nom d'utilisateur" name="username">
            <UInput v-model="form.username" placeholder="admin" class="w-full" />
          </UFormField>

          <UFormField label="Mot de passe" name="password">
            <UInput v-model="form.password" type="password" class="w-full" />
          </UFormField>

          <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>

          <UButton type="submit" block :loading="loading">
            Se connecter
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { fetch: refreshSession } = useUserSession()

const form = reactive({ username: '', password: '' })
const error = ref('')
const loading = ref(false)

async function login() {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: form,
    })
    await refreshSession()
    navigateTo('/')
  } catch (err: unknown) {
    const fetchErr = err as { data?: { message?: string } }
    error.value = fetchErr.data?.message || 'Erreur de connexion'
  } finally {
    loading.value = false
  }
}
</script>
