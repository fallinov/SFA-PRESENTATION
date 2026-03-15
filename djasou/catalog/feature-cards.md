---
name: Feature Cards
description: Grille de cartes avec icônes, titres et descriptions
category: content
---

## Usage

Afficher des fonctionnalités, des concepts ou des options sous forme de cartes visuelles dans une grille. Chaque carte a une icône dans un badge coloré, un titre et une description courte.

## Template

```html
<h2 class="text-4xl md:text-5xl font-bold mb-12">Titre de la <span class="text-blue-500">section</span></h2>

<div class="grid md:grid-cols-3 gap-4">
  <div class="bg-slate-900/50 p-5 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
    <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-3">
      <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    </div>
    <h3 class="text-lg font-bold mb-2">Fonctionnalité A</h3>
    <p class="text-slate-400 text-sm mb-2">Description courte de la fonctionnalité</p>
    <ul class="text-sm text-slate-300 space-y-1">
      <li>Point positif 1</li>
      <li>Point positif 2</li>
      <li>Point négatif</li>
    </ul>
  </div>

  <div class="bg-slate-900/50 p-5 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
    <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
      <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
      </svg>
    </div>
    <h3 class="text-lg font-bold mb-2">Fonctionnalité B</h3>
    <p class="text-slate-400 text-sm mb-2">Description courte de la fonctionnalité</p>
    <ul class="text-sm text-slate-300 space-y-1">
      <li>Point positif 1</li>
      <li>Point positif 2</li>
      <li>Point négatif</li>
    </ul>
  </div>

  <div class="bg-slate-900/50 p-5 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
    <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-3">
      <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
      </svg>
    </div>
    <h3 class="text-lg font-bold mb-2">Fonctionnalité C</h3>
    <p class="text-slate-400 text-sm mb-2">Description courte de la fonctionnalité</p>
    <ul class="text-sm text-slate-300 space-y-1">
      <li>Point positif 1</li>
      <li>Point positif 2</li>
      <li>Point négatif</li>
    </ul>
  </div>
</div>
```

## Notes

- Grilles de 2, 3 ou 4 colonnes selon le nombre d'items : `grid-cols-2`, `grid-cols-3`, `grid-cols-4`
- Les icônes utilisent un badge carré arrondi : `w-12 h-12 bg-{color}-500/20 rounded-xl`
- Chaque carte peut avoir une couleur d'icône différente pour différencier visuellement
- Le hover sur la bordure utilise la couleur d'accent : `hover:border-blue-500/50 transition-colors`
- Pour mettre en avant une carte, utiliser `bg-blue-500/20 border-blue-500/50` au lieu du style neutre
- Variante sans liste : remplacer le `<ul>` par un simple `<p>` de description
