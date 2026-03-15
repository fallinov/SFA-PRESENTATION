<template>
  <div class="h-screen bg-gray-950 flex flex-col">
    <header class="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm flex-shrink-0">
      <div class="px-4 h-12 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="text-sm font-medium text-gray-400 hover:text-white">
            ← Retour
          </NuxtLink>
          <span class="text-gray-600">|</span>
          <span class="text-sm font-medium text-white">{{ $route.params.slug }}</span>
        </div>
      </div>
    </header>

    <main class="flex-1 overflow-hidden">
      <slot />
    </main>
  </div>
</template>

