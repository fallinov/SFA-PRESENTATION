---
name: Title Slide
description: Slide titre centré avec fond gradient et blurs décoratifs
category: layout
---

## Usage

Première slide d'une présentation. Affiche le titre principal, un sous-titre, des badges thématiques et un indicateur de défilement. Utilise un fond gradient personnalisé avec des cercles flous décoratifs.

## Template

```html
<div class="absolute inset-0 opacity-10">
  <div class="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
  <div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
</div>
<div class="text-center px-6 relative z-10">
  <div class="mb-8">
    <!-- Logo ou icône SVG -->
    <svg class="w-32 h-32 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  </div>
  <h1 class="text-5xl md:text-7xl font-bold mb-6">Titre de la présentation</h1>
  <p class="text-xl md:text-2xl text-white/90 mb-8">Sous-titre ou description courte</p>
  <div class="flex flex-wrap gap-4 justify-center">
    <span class="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">Thème 1</span>
    <span class="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">Thème 2</span>
    <span class="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">Thème 3</span>
  </div>
  <div class="mt-16">
    <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
    <p class="text-sm text-white/80 mt-2">Défiler pour commencer</p>
  </div>
</div>
```

## Notes

- La section doit avoir les classes `flex items-center justify-center relative overflow-hidden` et le gradient en classe CSS
- Les blurs décoratifs utilisent `opacity-10` pour rester subtils
- En mode md2slides, utiliser les directives `<!-- layout: title -->` et `<!-- blurs -->` pour générer ce layout
- Les badges `bg-white/20 rounded-full backdrop-blur-sm` servent à lister les thèmes abordés
- L'indicateur de défilement est optionnel (mode scroll uniquement)
