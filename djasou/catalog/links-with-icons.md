---
name: Links with Icons
description: Liens cliquables avec icônes SVG pour ressources externes
category: content
---

## Usage

Afficher des liens vers des ressources externes (outils, documentation, sites web) avec une icône SVG indicatrice. Utilisé dans les slides de ressources ou de recommandations.

## Template

```html
<!-- Liste de liens avec icône lien externe -->
<div class="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
  <h3 class="text-xl font-bold mb-3">Ressources</h3>
  <div class="space-y-2 text-sm">
    <a href="https://example.com" target="_blank" class="flex items-center gap-2 text-blue-500 hover:underline">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
      </svg>
      example.com — Description courte
    </a>
    <a href="https://tool.example.com" target="_blank" class="flex items-center gap-2 text-blue-500 hover:underline">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
      </svg>
      tool.example.com — Autre ressource
    </a>
  </div>
</div>

<!-- Lien ressource avec icône livre (cours) -->
<a href="https://docs.example.com" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/15 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-medium hover:bg-blue-500/25 transition-colors">
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
  </svg>
  Cours
</a>

<!-- Bouton lien proéminent -->
<a href="https://app.example.com" target="_blank"
   class="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xl px-10 py-5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105">
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
  </svg>
  <span>Ouvrir l'application</span>
  <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
  </svg>
</a>

<!-- Liens avec bullets dans une liste -->
<div class="space-y-2 text-sm">
  <div class="flex items-center gap-2 text-slate-300">
    <span class="text-blue-500">&#8226;</span>
    <span><strong>Outil A</strong> — Description de l'outil</span>
  </div>
  <div class="flex items-center gap-2 text-slate-300">
    <span class="text-blue-500">&#8226;</span>
    <span><strong>Outil B</strong> — Description de l'outil</span>
  </div>
</div>
```

## Notes

- Icône lien externe (la plus utilisée) : flèche en haut à droite sortant d'un rectangle
- Icône livre : pour les liens vers la documentation ou les cours
- Les liens utilisent la couleur d'accent : `text-blue-500 hover:underline`
- Toujours ajouter `target="_blank"` pour les liens externes
- Le bouton proéminent utilise un gradient avec shadow et effet hover scale
- La variante `resource-link` (badge de cours) est un pattern fréquent dans les slides pédagogiques
