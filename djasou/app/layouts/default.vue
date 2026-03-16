<template>
  <div class="min-h-screen bg-gray-950">
    <header class="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold text-white">
          Djasou
        </NuxtLink>

        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-400">{{ session?.user?.name }}</span>
          <UButton size="sm" variant="ghost" color="neutral" @click="logout">
            Déconnexion
          </UButton>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { session, clear } = useUserSession()

async function logout() {
  await clear()
  navigateTo('/login')
}
</script>
