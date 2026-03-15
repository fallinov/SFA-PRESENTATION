---
name: Stat Display
description: Affichage de statistiques avec gros chiffres et descriptions
category: data
---

## Usage

Mettre en avant des chiffres clés, des statistiques ou des métriques importantes. Les valeurs sont affichées en très grand avec une couleur d'accent, accompagnées d'une description en dessous.

## Template

```html
<h2 class="text-4xl font-bold mb-4 text-center">Titre de la section</h2>
<p class="text-xl text-slate-400 text-center mb-12">Sous-titre explicatif</p>

<div class="grid grid-cols-1 grid-cols-3 gap-8">
  <div class="text-center">
    <div class="text-6xl font-bold text-blue-500 mb-4">81%</div>
    <p class="text-slate-300">des violations de données sont dues à des mots de passe faibles</p>
  </div>
  <div class="text-center">
    <div class="text-6xl font-bold text-purple-500 mb-4">100+</div>
    <p class="text-slate-300">comptes en ligne en moyenne par utilisateur</p>
  </div>
  <div class="text-center">
    <div class="text-6xl font-bold text-green-500 mb-4">65%</div>
    <p class="text-slate-300">des personnes réutilisent le même mot de passe</p>
  </div>
</div>
```

## Notes

- Variante avec cartes et icônes pour plus de contexte :
  ```html
  <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700/50">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
        <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      </div>
      <p class="text-2xl font-bold text-white">127</p>
    </div>
    <p class="text-blue-400 font-medium mb-1">Logiciels référencés</p>
    <p class="text-slate-400 text-sm">Détail complémentaire</p>
  </div>
  ```
- Variante comparaison rapide (deux blocs côte à côte) :
  ```html
  <div class="grid grid-cols-2 gap-4">
    <div class="bg-red-500/10 p-4 rounded-xl text-center">
      <p class="text-red-400 font-bold text-3xl mt-2">8.5 Mo</p>
      <p class="text-sm text-slate-300">~17 sec en 4G</p>
    </div>
    <div class="bg-green-500/10 p-4 rounded-xl text-center">
      <p class="text-green-400 font-bold text-3xl mt-2">180 Ko</p>
      <p class="text-sm text-slate-300">~0.3 sec en 4G</p>
    </div>
  </div>
  ```
- Les chiffres en `text-6xl font-bold` sont le pattern principal, chacun avec sa couleur d'accent
- Utiliser 2 à 4 stats par slide maximum pour garder la lisibilité
