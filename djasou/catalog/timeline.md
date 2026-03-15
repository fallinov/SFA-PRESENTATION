---
name: Timeline
description: Timeline horizontale ou verticale avec points et dates
category: content
---

## Usage

Présenter une chronologie, une évolution historique ou une progression dans le temps. Chaque point de la timeline a une date/année, un titre et une description.

## Template

```html
<h2 class="text-4xl text-5xl font-bold mb-12">Évolution</h2>

<!-- Timeline horizontale en grille -->
<div class="grid grid-cols-4 gap-4">
  <div class="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
    <span class="text-2xl font-bold text-blue-500">1995</span>
    <h3 class="text-lg font-bold mt-2 mb-2">Première version</h3>
    <p class="text-slate-400 text-sm">Description de ce qui s'est passé à cette date.</p>
  </div>
  <div class="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
    <span class="text-2xl font-bold text-blue-500">2005</span>
    <h3 class="text-lg font-bold mt-2 mb-2">Évolution majeure</h3>
    <p class="text-slate-400 text-sm">Description de l'évolution.</p>
  </div>
  <div class="bg-blue-500/20 p-6 rounded-2xl border border-blue-500/50">
    <span class="text-2xl font-bold text-blue-500">2015</span>
    <h3 class="text-lg font-bold mt-2 mb-2">Tournant important</h3>
    <p class="text-slate-300 text-sm">L'élément mis en avant a un fond et une bordure colorés.</p>
  </div>
  <div class="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
    <span class="text-2xl font-bold text-blue-500">2025</span>
    <h3 class="text-lg font-bold mt-2 mb-2">Aujourd'hui</h3>
    <p class="text-slate-400 text-sm">État actuel de la technologie.</p>
  </div>
</div>

<!-- Encadré conclusion -->
<div class="mt-8 bg-blue-500/10 border border-blue-500/30 p-4 rounded-2xl">
  <p class="text-blue-500 font-medium">Aujourd'hui</p>
  <p class="text-slate-300 text-sm mt-2">Résumé de la situation actuelle.</p>
</div>
```

## Notes

- Utiliser 3 à 6 points pour garder la lisibilité sur 1280x720
- La grille `grid-cols-4` ou `grid-cols-3` s'adapte au nombre de points
- Mettre en avant un élément clé avec `bg-blue-500/20 border-blue-500/50` au lieu du style neutre
- La date/année est en `text-2xl font-bold text-{accent}` pour être immédiatement visible
- Variante verticale possible avec `space-y-4` et des items en ligne
- Terminer par un encadré "aujourd'hui" pour contextualiser
