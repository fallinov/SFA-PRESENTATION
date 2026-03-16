---
name: Badges & Pills
description: Badges et pills pour tags, catégories, filtres ou labels
category: content
---

## Usage

Afficher des tags, des catégories, des filtres ou des labels sous forme de badges arrondis. Utilisé dans les listes de fonctionnalités, les filtres de recherche ou les tags de contenu.

## Template

```html
<!-- Badges simples (fond semi-transparent) -->
<div class="flex flex-wrap gap-2">
  <span class="bg-slate-700/80 text-sm px-4 py-1.5 rounded-full">Tag neutre</span>
  <span class="bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm px-4 py-1.5 rounded-full">Tag accent</span>
  <span class="bg-green-500/20 border border-green-400/30 text-green-300 text-sm px-4 py-1.5 rounded-full">Tag succès</span>
  <span class="bg-red-500/20 border border-red-400/30 text-red-300 text-sm px-4 py-1.5 rounded-full">Tag erreur</span>
  <span class="bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 text-sm px-4 py-1.5 rounded-full">Tag attention</span>
</div>

<!-- Badge mis en avant (gradient) -->
<span class="bg-gradient-to-r from-blue-600 to-blue-500 text-sm px-4 py-1.5 rounded-full font-medium shadow-lg shadow-blue-500/20">Recommandé</span>

<!-- Badges dans le titre de slide (backdrop) -->
<div class="flex flex-wrap gap-4 justify-center">
  <span class="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">Thème 1</span>
  <span class="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">Thème 2</span>
  <span class="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">Thème 3</span>
</div>

<!-- Badge section (en haut de slide) -->
<div class="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
  <span class="text-blue-400 text-sm font-medium">Section / Contexte</span>
</div>

<!-- Liste de badges avec statut -->
<ul class="space-y-3">
  <li class="flex items-center gap-3">
    <span class="bg-gradient-to-r from-blue-600 to-blue-500 text-sm px-4 py-1.5 rounded-full font-medium shadow-lg shadow-blue-500/20">Actif</span>
    <span class="text-orange-400 text-sm flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
      À valider
    </span>
  </li>
  <li><span class="bg-slate-700/80 text-sm px-4 py-1.5 rounded-full">Inactif</span></li>
</ul>
```

## Notes

- Toujours utiliser `rounded-full` pour l'effet pill
- Taille standard : `text-sm px-4 py-1.5`
- Badge neutre : `bg-slate-700/80` sans bordure
- Badge coloré : `bg-{color}-500/20 border border-{color}-400/30 text-{color}-300`
- Badge proéminent : gradient + shadow (`shadow-lg shadow-blue-500/20`)
- Sur fond gradient : `bg-white/20 backdrop-blur-sm`
- Utilisé comme label de section en haut de slide : `inline-block mb-6`
