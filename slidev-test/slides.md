---
theme: default
title: Gestion des médias — WordPress
info: ESIG 741 — Atelier CMS
author: Steve Fallet
colorSchema: dark
fonts:
  sans: Inter
  mono: JetBrains Mono
themeConfig:
  primary: '#0073aa'
transition: slide-left
---

# Gestion des médias

Optimiser vos images pour le web

<div class="flex gap-3 mt-8">
  <span class="px-4 py-2 bg-white/10 rounded-full text-sm">Formats</span>
  <span class="px-4 py-2 bg-white/10 rounded-full text-sm">Compression</span>
  <span class="px-4 py-2 bg-white/10 rounded-full text-sm">SEO</span>
  <span class="px-4 py-2 bg-white/10 rounded-full text-sm">Accessibilité</span>
</div>

<div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm opacity-50">
  <lucide-arrow-down class="inline w-5 h-5" /> Flèches pour naviguer
</div>

---
layout: two-cols
---

# Pourquoi <span class="text-[#0073aa]">optimiser</span> ses images ?

<p class="text-sm opacity-70 font-mono mb-4">01 / Introduction</p>

> "Un bon croquis vaut mieux qu'un long discours"

Une mauvaise gestion des images impacte le **référencement** de votre site et la <span class="text-orange-400">patience</span> de vos visiteurs.

<span class="text-orange-400 font-bold">3 secondes</span> — c'est déjà une éternité pour un internaute !

::right::

<div class="pl-6">
<h3 class="text-red-400 flex items-center gap-2 mb-4">
  <lucide-alert-triangle class="w-5 h-5" /> Erreurs fréquentes
</h3>

<div class="space-y-2 text-sm">
  <div class="flex items-start gap-2 p-2 bg-red-500/10 rounded">
    <lucide-x class="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
    <div><strong>Mauvais format d'image</strong><br/><span class="opacity-60">JPG pour un logo, PNG pour une photo...</span></div>
  </div>
  <div class="flex items-start gap-2 p-2 bg-red-500/10 rounded">
    <lucide-x class="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
    <div><strong>Images trop lourdes</strong><br/><span class="opacity-60">Pas de compression = pages lentes</span></div>
  </div>
  <div class="flex items-start gap-2 p-2 bg-red-500/10 rounded">
    <lucide-x class="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
    <div><strong>Images trop grandes</strong><br/><span class="opacity-60">Photos de 5000px non redimensionnées</span></div>
  </div>
  <div class="flex items-start gap-2 p-2 bg-red-500/10 rounded">
    <lucide-x class="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
    <div><strong>Pas de texte alternatif</strong><br/><span class="opacity-60">Mauvais pour l'accessibilité et le SEO</span></div>
  </div>
</div>
</div>

---

# Utiliser le <span class="text-[#0073aa]">bon format</span>

<p class="text-xs opacity-70 font-mono mb-4">02 / Formats</p>

<div class="grid grid-cols-3 gap-4">
  <div class="p-4 rounded-xl border border-slate-700 bg-slate-800/50">
    <div class="text-yellow-400 font-bold text-lg mb-2">JPG</div>
    <h3 class="font-bold mb-1">JPEG</h3>
    <p class="text-sm opacity-60 mb-2">Idéal pour les <strong class="text-white">photos</strong></p>
    <ul class="text-sm space-y-1">
      <li><lucide-check class="inline w-3 h-3 text-green-400" /> Compression efficace</li>
      <li><lucide-check class="inline w-3 h-3 text-green-400" /> 100% navigateurs</li>
      <li><lucide-x class="inline w-3 h-3 text-red-400" /> Pas de transparence</li>
    </ul>
  </div>
  <div class="p-4 rounded-xl border border-slate-700 bg-slate-800/50">
    <div class="text-blue-400 font-bold text-lg mb-2">PNG</div>
    <h3 class="font-bold mb-1">PNG</h3>
    <p class="text-sm opacity-60 mb-2">Idéal pour les <strong class="text-white">logos</strong></p>
    <ul class="text-sm space-y-1">
      <li><lucide-check class="inline w-3 h-3 text-green-400" /> Transparence</li>
      <li><lucide-check class="inline w-3 h-3 text-green-400" /> Netteté parfaite</li>
      <li><lucide-x class="inline w-3 h-3 text-red-400" /> Fichiers lourds</li>
    </ul>
  </div>
  <div class="p-4 rounded-xl border border-slate-700 bg-slate-800/50">
    <div class="text-green-400 font-bold text-lg mb-2">WebP</div>
    <h3 class="font-bold mb-1">WebP</h3>
    <p class="text-sm opacity-60 mb-2">Le <strong class="text-white">meilleur</strong> des deux</p>
    <ul class="text-sm space-y-1">
      <li><lucide-check class="inline w-3 h-3 text-green-400" /> Léger + transparent</li>
      <li><lucide-check class="inline w-3 h-3 text-green-400" /> 97% navigateurs</li>
      <li><lucide-x class="inline w-3 h-3 text-red-400" /> IE non supporté</li>
    </ul>
  </div>
</div>

---
layout: two-cols
---

# Texte alternatif

<p class="text-xs opacity-70 font-mono mb-2">06 / Accessibilité</p>

L'attribut `alt` est essentiel pour l'**accessibilité** et le **référencement**.

<div class="space-y-2 mt-3">
  <div class="p-2 rounded-lg border border-slate-700 bg-slate-800/50">
    <div class="flex items-center gap-2">
      <lucide-accessibility class="w-4 h-4 text-[#0073aa] shrink-0" />
      <strong class="text-sm">Accessibilité</strong>
    </div>
    <p class="text-xs opacity-60 ml-6">Lecteurs d'écran décrivent les images.</p>
  </div>
  <div class="p-2 rounded-lg border border-slate-700 bg-slate-800/50">
    <div class="flex items-center gap-2">
      <lucide-search class="w-4 h-4 text-[#0073aa] shrink-0" />
      <strong class="text-sm">SEO</strong>
    </div>
    <p class="text-xs opacity-60 ml-6">Google indexe les images via le texte alt.</p>
  </div>
  <div class="p-2 rounded-lg border border-slate-700 bg-slate-800/50">
    <div class="flex items-center gap-2">
      <lucide-image class="w-4 h-4 text-[#0073aa] shrink-0" />
      <strong class="text-sm">Fallback</strong>
    </div>
    <p class="text-xs opacity-60 ml-6">S'affiche si l'image ne charge pas.</p>
  </div>
</div>

::right::

<div class="pl-6">

```html
<img src="etang-gruere.jpg"
     alt="Vue de l'étang de la Gruère
          depuis la berge" />
```

<div class="mt-3 p-2 rounded-lg border border-[#0073aa]/30 bg-[#0073aa]/10">
  <p class="text-[#0073aa] font-medium text-sm flex items-center gap-2">
    <lucide-file-text class="w-4 h-4" /> Conseils pour le texte alt
  </p>
  <ul class="text-xs mt-1 space-y-0.5 opacity-80">
    <li>Décrire le contenu ou la fonction</li>
    <li>Utiliser des mots-clés pertinents</li>
    <li>Rester concis (125 caractères max)</li>
    <li>Ne pas commencer par « Image de... »</li>
  </ul>
</div>

```html
<figure>
  <img src="chat.jpg"
       alt="Chat roux dormant" />
  <figcaption>
    Mon chat Pixel fait sa sieste
  </figcaption>
</figure>
```

</div>

---

# Médias dans <span class="text-[#0073aa]">WordPress</span>

<p class="text-xs opacity-70 font-mono mb-3">07 / WordPress</p>

WordPress génère automatiquement **plusieurs tailles** pour chaque image téléversée.

<div class="grid grid-cols-2 gap-4 mt-3">
  <div class="p-3 rounded-xl border border-slate-700 bg-slate-800/50">
    <h3 class="font-bold text-sm mb-2">Champs importants</h3>
    <div class="space-y-2 text-sm">
      <div class="flex items-start gap-2">
        <lucide-type class="w-4 h-4 text-[#0073aa] shrink-0 mt-0.5" />
        <div><strong>Titre</strong> — <span class="opacity-60">recherche interne WP</span></div>
      </div>
      <div class="flex items-start gap-2">
        <lucide-text class="w-4 h-4 text-[#0073aa] shrink-0 mt-0.5" />
        <div><strong>Texte alternatif</strong> — <span class="opacity-60">accessibilité + SEO</span></div>
      </div>
      <div class="flex items-start gap-2">
        <lucide-subtitles class="w-4 h-4 opacity-40 shrink-0 mt-0.5" />
        <div class="opacity-60"><strong>Légende</strong> — sous l'image</div>
      </div>
      <div class="flex items-start gap-2">
        <lucide-file-text class="w-4 h-4 opacity-40 shrink-0 mt-0.5" />
        <div class="opacity-60"><strong>Description</strong> — pages d'attachement</div>
      </div>
    </div>
  </div>

  <div class="p-3 rounded-xl border border-slate-700 bg-slate-800/50">
    <h3 class="font-bold text-sm mb-2">Tailles générées</h3>
    <table class="text-sm w-full">
      <thead><tr class="border-b border-slate-700"><th class="text-left py-0.5">Taille</th><th class="text-right py-0.5">Dimensions</th></tr></thead>
      <tbody>
        <tr class="border-b border-slate-800"><td class="py-0.5">Miniature</td><td class="text-right">150 × 150 px</td></tr>
        <tr class="border-b border-slate-800"><td class="py-0.5">Moyen</td><td class="text-right">300 × 300 px</td></tr>
        <tr class="border-b border-slate-800"><td class="py-0.5">Grand</td><td class="text-right">1024 × 1024 px</td></tr>
        <tr><td class="py-0.5">Taille originale</td><td class="text-right">Variable</td></tr>
      </tbody>
    </table>
    <div class="mt-2 p-1.5 rounded bg-orange-500/10 text-orange-400 text-xs flex items-center gap-2">
      <lucide-alert-triangle class="w-3 h-3 shrink-0" />
      Configurable dans Réglages → Médias
    </div>
  </div>
</div>
