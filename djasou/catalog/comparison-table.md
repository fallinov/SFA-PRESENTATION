---
name: Comparison Table
description: Tableau comparatif avec lignes colorées et icônes
category: data
---

## Usage

Comparer des solutions, des technologies ou des options dans un tableau structuré. Chaque ligne peut être colorée selon son niveau de recommandation. Supporte le défilement horizontal sur mobile.

## Template

```html
<h2 class="text-3xl text-4xl font-bold mb-8 text-center">Comparatif des solutions</h2>

<div class="overflow-x-auto bg-black/40 backdrop-blur-md rounded-xl p-3 p-6 shadow-2xl">
  <table class="min-w-[600px] w-full text-left text-sm text-base">
    <thead>
      <tr class="border-b border-slate-700">
        <th class="p-4 text-slate-400">Solution</th>
        <th class="p-4 text-slate-400">Avantages</th>
        <th class="p-4 text-slate-400">Inconvénients</th>
        <th class="p-4 text-slate-400 text-center">Score</th>
      </tr>
    </thead>
    <tbody class="text-slate-300">
      <tr class="border-b border-slate-800 bg-red-900/20">
        <td class="p-4 font-semibold flex items-center gap-2">
          <svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Option A
        </td>
        <td class="p-4 text-sm">Simple à utiliser</td>
        <td class="p-4 text-sm text-red-300">Peu sécurisé</td>
        <td class="p-4 text-center text-red-400 font-bold">1/5</td>
      </tr>
      <tr class="border-b border-slate-800 bg-yellow-900/20">
        <td class="p-4 font-semibold flex items-center gap-2">
          <svg class="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          Option B
        </td>
        <td class="p-4 text-sm">Intégré, pratique</td>
        <td class="p-4 text-sm text-yellow-300">Limité en fonctionnalités</td>
        <td class="p-4 text-center text-yellow-400 font-bold">3/5</td>
      </tr>
      <tr class="bg-green-900/20">
        <td class="p-4 font-semibold flex items-center gap-2">
          <svg class="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
          Option C (recommandée)
        </td>
        <td class="p-4 text-sm">Complet, sécurisé, synchronisé</td>
        <td class="p-4 text-sm text-slate-400">Dépendance au service</td>
        <td class="p-4 text-center text-green-400 font-bold">5/5</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Notes

- Fond du conteneur : `bg-black/40 backdrop-blur-md rounded-xl` pour un effet glassmorphism
- Couleurs des lignes selon le niveau :
  - Mauvais : `bg-red-900/20`, texte `text-red-400`
  - Moyen : `bg-yellow-900/20`, texte `text-yellow-400`
  - Bon : `bg-green-900/20`, texte `text-green-400`
  - Recommandé : `bg-blue-500/20`, texte `text-blue-400`
- `min-w-[600px]` garantit la lisibilité, combiné avec `overflow-x-auto` pour le scroll mobile
- Les icônes dans la première colonne renforcent le code couleur
- Variante simple sans couleurs de lignes pour les tableaux neutres (juste `border-b border-slate-800`)
- Les scores numériques (`1/5`, `3/5`, `5/5`) sont centrés et en gras avec la couleur sémantique
