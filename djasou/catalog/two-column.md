---
name: Two Column Layout
description: Layout deux colonnes avec grid pour contenu mixte texte/visuel
category: layout
---

## Usage

Layout principal pour les slides de contenu. Colonne gauche pour le texte explicatif, colonne droite pour un visuel, une liste, un bloc de code ou une carte. Utilisé dans la majorité des slides.

## Template

```html
<span class="text-blue-500 font-mono text-base mb-4 block">01 / Section</span>
<h2 class="text-4xl text-5xl font-bold mb-6">Titre avec <span class="text-blue-500">accent</span></h2>

<div class="grid grid-cols-2 gap-12 items-center">
  <div>
    <p class="text-lg text-slate-300 mb-6 leading-relaxed">
      Paragraphe explicatif avec des mots en <strong class="text-white">gras blanc</strong>
      et des accents de <strong class="text-blue-500">couleur</strong>.
    </p>
    <p class="text-lg text-slate-300 mb-6 leading-relaxed">
      Deuxième paragraphe pour développer le propos.
    </p>
    <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Encadré informatif
      </h3>
      <p class="text-slate-400 text-sm">Détails complémentaires dans un encadré sobre.</p>
    </div>
  </div>
  <div class="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
    <h3 class="text-lg font-semibold mb-4">Contenu visuel</h3>
    <div class="space-y-3">
      <div class="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
        <span class="text-blue-500 text-xl">1</span>
        <div>
          <p class="font-medium">Premier point</p>
          <p class="text-sm text-slate-400">Description du point</p>
        </div>
      </div>
      <div class="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
        <span class="text-blue-500 text-xl">2</span>
        <div>
          <p class="font-medium">Deuxième point</p>
          <p class="text-sm text-slate-400">Description du point</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Notes

- Utiliser `gap-12` pour l'espacement entre colonnes
- `items-center` pour aligner verticalement, `items-start` si les hauteurs diffèrent beaucoup
- Le label de section (`01 / Section`) utilise la couleur d'accent et `font-mono`
- Les mots importants dans les paragraphes utilisent `<strong class="text-white">` ou `<strong class="text-blue-500">`
- La colonne droite utilise souvent `bg-slate-800/50 border border-slate-700 rounded-2xl`
