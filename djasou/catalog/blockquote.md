---
name: Blockquote
description: Citation stylisée avec bordure latérale colorée
category: content
---

## Usage

Afficher une citation, un proverbe ou une phrase clé mise en avant. Utilise une bordure colorée à gauche et un style italique pour se distinguer du texte courant.

## Template

```html
<!-- Citation simple avec bordure accent -->
<blockquote class="text-xl text-slate-300 mb-6 leading-relaxed border-l-4 border-blue-500 pl-6 italic">
  "Un bon croquis vaut mieux qu'un long discours"
</blockquote>

<!-- Citation dans un encadré -->
<div class="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
  <blockquote class="text-lg text-slate-300 leading-relaxed border-l-4 border-blue-500 pl-6 italic mb-4">
    "La simplicité est la sophistication suprême."
  </blockquote>
  <p class="text-slate-400 text-sm pl-6">— Léonard de Vinci</p>
</div>

<!-- Citation mise en avant (grande, centrée) -->
<div class="text-center max-w-3xl mx-auto">
  <svg class="w-12 h-12 text-blue-500/30 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
  </svg>
  <blockquote class="text-2xl text-slate-200 leading-relaxed italic mb-6">
    "La meilleure façon de prédire l'avenir, c'est de le créer."
  </blockquote>
  <p class="text-slate-400">— Peter Drucker</p>
</div>

<!-- Citation dans un contexte de résultat (fond blanc) -->
<div class="bg-white rounded-lg p-4 text-slate-900 text-sm">
  <blockquote class="border-l-4 border-blue-500 pl-4 italic text-slate-600">
    Contenu de la citation rendu dans un contexte clair.
  </blockquote>
</div>
```

## Notes

- Le pattern principal est `border-l-4 border-{accent} pl-6 italic`
- Taille du texte : `text-xl` pour les citations proéminentes, `text-lg` pour les citations dans le flux
- Couleur du texte : `text-slate-300` (pas blanc pur) pour contraster avec les titres
- L'auteur est en `text-slate-400 text-sm` avec un tiret cadratin
- La variante centrée avec l'icône guillemet est utilisée pour les slides de citation pleine page
- Sur fond gradient, les citations utilisent `text-white/90` au lieu de `text-slate-300`
- La variante fond blanc (`bg-white text-slate-900`) est utilisée pour montrer un rendu de site web
