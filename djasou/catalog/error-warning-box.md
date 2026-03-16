---
name: Error/Warning Box
description: Encadré erreur ou avertissement avec fond rouge/orange
category: feedback
---

## Usage

Signaler une erreur courante, un piège ou un avertissement important. Utilise un fond rouge ou orange avec une icône d'alerte. Attire l'attention sur ce qu'il faut éviter.

## Template

```html
<!-- Avertissement (orange/ambre) -->
<div class="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl">
  <p class="text-yellow-400 font-medium flex items-center gap-2">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>
    Attention
  </p>
  <p class="text-slate-300 text-sm mt-2">
    Description de l'avertissement. Gardez <strong class="text-white">toujours vos originaux</strong> !
  </p>
</div>

<!-- Erreur (rouge) -->
<div class="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
  <p class="text-red-400 font-medium flex items-center gap-2">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    Erreur fréquente
  </p>
  <p class="text-slate-300 text-sm mt-2">
    Description de l'erreur à éviter.
  </p>
</div>

<!-- Liste d'erreurs détaillée -->
<div class="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
  <h3 class="text-lg font-semibold mb-4 text-red-400 flex items-center gap-2">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>
    Erreurs fréquentes
  </h3>
  <div class="space-y-3">
    <div class="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg">
      <svg class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <div>
        <p class="font-medium">Titre de l'erreur</p>
        <p class="text-sm text-slate-300">Explication détaillée du problème</p>
      </div>
    </div>
    <div class="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg">
      <svg class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <div>
        <p class="font-medium">Titre de l'erreur</p>
        <p class="text-sm text-slate-300">Explication détaillée du problème</p>
      </div>
    </div>
  </div>
</div>

<!-- Avertissement sur fond gradient (avec backdrop) -->
<div class="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
  <p class="text-white font-medium flex items-center gap-2">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>
    Attention
  </p>
  <p class="text-white/80 text-sm mt-1">
    Avertissement sur fond gradient.
  </p>
</div>
```

## Notes

- Avertissement : `bg-yellow-500/10 border-yellow-500/30 text-yellow-400`
- Erreur : `bg-red-500/10 border-red-500/30 text-red-400`
- Sur fond gradient : `bg-white/20 backdrop-blur-sm text-white`
- L'icône triangle d'avertissement (SVG ci-dessus) est le pattern standard
- La variante "liste d'erreurs" utilise des items avec icône X rouge et description
- Toujours accompagner l'erreur d'une explication constructive
