---
name: Progress Bars
description: Barres de progression avec labels et pourcentages/valeurs
category: data
---

## Usage

Visualiser des comparaisons de tailles, de performances ou de progression. Chaque barre a un label à gauche et une valeur à droite, avec une barre colorée proportionnelle.

## Template

```html
<div class="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
  <h3 class="text-lg font-bold mb-4">Comparaison</h3>
  <div class="space-y-4">
    <div>
      <div class="flex justify-between text-sm mb-1">
        <span class="text-slate-300">Élément le plus grand</span>
        <span class="text-red-400 font-bold">8.5 Mo</span>
      </div>
      <div class="w-full bg-slate-700 rounded-full h-4">
        <div class="bg-red-500 h-4 rounded-full" style="width: 100%"></div>
      </div>
    </div>
    <div>
      <div class="flex justify-between text-sm mb-1">
        <span class="text-slate-300">Élément moyen</span>
        <span class="text-yellow-400 font-bold">1.2 Mo</span>
      </div>
      <div class="w-full bg-slate-700 rounded-full h-4">
        <div class="bg-yellow-500 h-4 rounded-full" style="width: 14%"></div>
      </div>
    </div>
    <div>
      <div class="flex justify-between text-sm mb-1">
        <span class="text-slate-300">Élément optimisé</span>
        <span class="text-green-400 font-bold">180 Ko</span>
      </div>
      <div class="w-full bg-slate-700 rounded-full h-4">
        <div class="bg-green-500 h-4 rounded-full" style="width: 2%"></div>
      </div>
    </div>
  </div>
  <p class="text-slate-400 text-sm mt-4">
    <strong class="text-white">Gain : 98%</strong> de réduction !
  </p>
</div>
```

## Notes

- La hauteur `h-4` donne une barre bien visible, `h-2` pour une variante plus fine
- Le fond de la piste est `bg-slate-700 rounded-full`
- Utiliser des couleurs sémantiques : rouge = mauvais, jaune = moyen, vert = bon
- Le `width` en pourcentage doit être défini via `style` car Tailwind ne supporte pas les pourcentages arbitraires en JIT sans config
- Toujours accompagner les barres d'un label textuel pour l'accessibilité
- Variante horizontale compacte pour les listes de compétences ou niveaux
