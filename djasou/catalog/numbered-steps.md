---
name: Numbered Steps
description: Étapes numérotées pour processus, tutoriels ou workflows
category: content
---

## Usage

Présenter un processus séquentiel, des instructions pas-à-pas ou un workflow. Chaque étape a un numéro dans un cercle, un titre et une description optionnelle.

## Template

```html
<h2 class="text-4xl text-5xl font-bold mb-12">Checklist</h2>

<!-- Variante grille horizontale (3-5 étapes) -->
<div class="grid grid-cols-5 gap-4 mb-12">
  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
    <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <span class="text-2xl font-bold">1</span>
    </div>
    <h3 class="font-bold mb-2 text-center">Étape un</h3>
    <p class="text-white/80 text-sm text-center">Description courte de l'étape</p>
  </div>
  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
    <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <span class="text-2xl font-bold">2</span>
    </div>
    <h3 class="font-bold mb-2 text-center">Étape deux</h3>
    <p class="text-white/80 text-sm text-center">Description courte de l'étape</p>
  </div>
  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
    <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <span class="text-2xl font-bold">3</span>
    </div>
    <h3 class="font-bold mb-2 text-center">Étape trois</h3>
    <p class="text-white/80 text-sm text-center">Description courte de l'étape</p>
  </div>
  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
    <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <span class="text-2xl font-bold">4</span>
    </div>
    <h3 class="font-bold mb-2 text-center">Étape quatre</h3>
    <p class="text-white/80 text-sm text-center">Description courte de l'étape</p>
  </div>
  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
    <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <span class="text-2xl font-bold">5</span>
    </div>
    <h3 class="font-bold mb-2 text-center">Étape cinq</h3>
    <p class="text-white/80 text-sm text-center">Description courte de l'étape</p>
  </div>
</div>

<!-- Variante verticale compacte -->
<div class="space-y-3">
  <div class="flex items-center gap-3">
    <span class="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center font-bold text-blue-400">1</span>
    <span class="text-slate-300">Première étape à suivre</span>
  </div>
  <div class="flex items-center gap-3">
    <span class="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center font-bold text-blue-400">2</span>
    <span class="text-slate-300">Deuxième étape à suivre</span>
  </div>
  <div class="flex items-center gap-3">
    <span class="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center font-bold text-blue-400">3</span>
    <span class="text-slate-300">Troisième étape à suivre</span>
  </div>
  <div class="flex items-center gap-3">
    <span class="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center font-bold text-blue-400">4</span>
    <span class="text-slate-300">Quatrième étape à suivre</span>
  </div>
</div>
```

## Notes

- Deux variantes principales :
  - **Grille horizontale** : pour les résumés/checklists (3-5 items), utilise `bg-white/10 backdrop-blur-sm` (sur fond gradient)
  - **Liste verticale** : pour les étapes détaillées dans une colonne, plus compact
- Sur fond `bg-slate-900`, les numéros utilisent `bg-blue-500/20 text-blue-400`
- Sur fond gradient, les numéros utilisent `bg-white/20 text-white`
- Variante avec label coloré pour les numéros dans un contexte pédagogique :
  ```html
  <span class="text-blue-500 font-bold">1.</span>
  ```
