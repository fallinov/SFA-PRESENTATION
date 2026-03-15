---
name: Tip/Info Box
description: Encadré conseil ou information avec fond coloré et icône
category: feedback
---

## Usage

Mettre en avant un conseil, une recommandation ou une information importante. Fond semi-transparent avec bordure colorée. Utilisé pour les bonnes pratiques, les astuces et les recommandations.

## Template

```html
<!-- Conseil / Tip (couleur d'accent) -->
<div class="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl">
  <p class="text-blue-500 font-medium">Conseil</p>
  <p class="text-slate-300 text-sm mt-2">
    Texte du conseil avec des mots <strong class="text-white">importants</strong> mis en avant.
  </p>
</div>

<!-- Information neutre (slate) -->
<div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
  <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
    <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    Information
  </h3>
  <p class="text-slate-400 text-sm">Contenu informatif détaillé.</p>
</div>

<!-- Bonne pratique (vert) -->
<div class="bg-green-500/10 border border-green-500/30 p-4 rounded-xl">
  <p class="text-green-400 font-medium flex items-center gap-2">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    Bonne pratique
  </p>
  <p class="text-slate-300 text-sm mt-2">
    Description de la bonne pratique à suivre.
  </p>
</div>

<!-- Recommandation avec fond backdrop (sur gradient) -->
<div class="bg-white/10 backdrop-blur-sm p-5 rounded-xl">
  <h3 class="font-bold mb-2 flex items-center gap-2">
    <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
    </svg>
    Recommandation
  </h3>
  <p class="text-white/80 text-sm">Texte de la recommandation.</p>
</div>
```

## Notes

- Le pattern de base est `bg-{color}-500/10 border border-{color}-500/30 p-4 rounded-xl`
- Le titre utilise `text-{color} font-medium`
- Le contenu est en `text-slate-300 text-sm mt-2`
- Sur fond gradient, utiliser `bg-white/10 backdrop-blur-sm` au lieu des couleurs nommées
- Variante plus proéminente avec `rounded-2xl p-6` pour les encadrés importants
- Peut contenir des listes à puces pour les conseils multiples
