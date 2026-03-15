---
name: Good/Bad Comparison
description: Comparaison bon/mauvais côte à côte avec codes couleur vert/rouge
category: content
---

## Usage

Comparer de bonnes et mauvaises pratiques, des exemples corrects et incorrects, ou des patterns do/don't. Utilise le rouge pour les erreurs et le vert pour les bonnes pratiques.

## Template

```html
<h2 class="text-4xl text-5xl font-bold mb-8">Titre de la <span class="text-blue-500">comparaison</span></h2>

<div class="grid grid-cols-2 gap-12 items-start">
  <div class="space-y-6">
    <div class="bg-red-500/10 p-6 rounded-2xl border border-red-500/30">
      <h3 class="text-lg font-bold mb-4 text-red-400 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        Mauvaises pratiques
      </h3>
      <div class="space-y-2 font-mono text-sm">
        <div class="bg-slate-900/50 p-3 rounded-lg text-red-300">Exemple incorrect 1</div>
        <div class="bg-slate-900/50 p-3 rounded-lg text-red-300">Exemple incorrect 2</div>
        <div class="bg-slate-900/50 p-3 rounded-lg text-red-300">Exemple incorrect 3</div>
      </div>
    </div>
  </div>

  <div class="space-y-6">
    <div class="bg-green-500/10 p-6 rounded-2xl border border-green-500/30">
      <h3 class="text-lg font-bold mb-4 text-green-400 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        Bonnes pratiques
      </h3>
      <div class="space-y-2 font-mono text-sm">
        <div class="bg-slate-900/50 p-3 rounded-lg text-green-300">Exemple correct 1</div>
        <div class="bg-slate-900/50 p-3 rounded-lg text-green-300">Exemple correct 2</div>
        <div class="bg-slate-900/50 p-3 rounded-lg text-green-300">Exemple correct 3</div>
      </div>
    </div>
  </div>
</div>
```

## Notes

- Le pattern rouge/vert est immédiatement compréhensible par les étudiants
- Variante avec items détaillés (titre + description) :
  ```html
  <div class="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg">
    <span class="text-red-400 text-xl flex-shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </span>
    <div>
      <p class="font-medium">Titre de l'erreur</p>
      <p class="text-sm text-slate-300">Explication de pourquoi c'est une erreur</p>
    </div>
  </div>
  ```
- Peut aussi être utilisé dans une seule colonne (erreurs uniquement, comme une liste de pièges)
- Les exemples en `font-mono` sont parfaits pour du code ou des noms de fichiers
