---
title: "Gestion des médias — WordPress"
nav: scroll
colors:
  wp: "#0073aa"
  wpDark: "#23282d"
  wpLight: "#00a0d2"
  wpOrange: "#d54e21"
gradients:
  gradient-wp: "linear-gradient(135deg, #0073aa 0%, #23282d 100%)"
  gradient-wp-light: "linear-gradient(135deg, #00a0d2 0%, #0073aa 100%)"
---
<!-- class: gradient-wp -->
<!-- layout: title -->
<!-- blurs -->

# Gestion des médias

Optimiser vos images pour le web

---
<!-- section: 01 / Introduction -->

<div class="grid md:grid-cols-2 gap-12 items-center">
<div>

## Pourquoi <span class="text-wp">optimiser</span> ses images ?

<blockquote class="text-xl text-slate-300 mb-6 leading-relaxed border-l-4 border-wp pl-6 italic">
"Un bon croquis vaut mieux qu'un long discours"
</blockquote>

Une mauvaise gestion des images impacte le <strong class="text-white">référencement</strong> de votre site et la <strong class="text-wpOrange">patience</strong> de vos visiteurs.

<strong class="text-wpOrange">3 secondes</strong> — c'est déjà une éternité pour un internaute !

</div>
<div class="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
<h3 class="text-lg font-semibold mb-4 text-red-400 flex items-center gap-2">
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
Erreurs fréquentes
</h3>
<div class="space-y-3">
<div class="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg">
<span class="text-red-400 text-xl">✗</span>
<div>
<p class="font-medium">Mauvais format d'image</p>
<p class="text-sm text-slate-300">JPG pour un logo, PNG pour une photo...</p>
</div>
</div>
<div class="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg">
<span class="text-red-400 text-xl">✗</span>
<div>
<p class="font-medium">Images trop lourdes</p>
<p class="text-sm text-slate-300">Pas de compression = pages lentes</p>
</div>
</div>
<div class="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg">
<span class="text-red-400 text-xl">✗</span>
<div>
<p class="font-medium">Images trop grandes</p>
<p class="text-sm text-slate-300">Photos de 5000px non redimensionnées</p>
</div>
</div>
<div class="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg">
<span class="text-red-400 text-xl">✗</span>
<div>
<p class="font-medium">Noms incompréhensibles</p>
<p class="text-sm text-slate-300">DC00345.jpg, IMG_2847.png...</p>
</div>
</div>
<div class="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg">
<span class="text-red-400 text-xl">✗</span>
<div>
<p class="font-medium">Pas de texte alternatif</p>
<p class="text-sm text-slate-300">Mauvais pour l'accessibilité et le SEO</p>
</div>
</div>
</div>
</div>
</div>

---
<!-- section: 02 / Formats -->

## Utiliser le <span class="text-wp">bon format</span>

<div class="grid md:grid-cols-3 gap-4 mb-6">
<div class="bg-slate-900/50 p-5 rounded-2xl border border-slate-700 hover:border-wp/50 transition-colors">
<div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-3">
<span class="text-yellow-400 font-bold text-lg">JPG</span>
</div>
<h3 class="text-lg font-bold mb-2">JPEG</h3>
<p class="text-slate-400 text-sm mb-2">Idéal pour les <strong class="text-white">photos</strong></p>
<ul class="text-sm text-slate-300 space-y-1">
<li>✓ Compression efficace</li>
<li>✓ 100% navigateurs</li>
<li>✗ Pas de transparence</li>
</ul>
</div>
<div class="bg-slate-900/50 p-5 rounded-2xl border border-slate-700 hover:border-wp/50 transition-colors">
<div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
<span class="text-blue-400 font-bold text-lg">PNG</span>
</div>
<h3 class="text-lg font-bold mb-2">PNG</h3>
<p class="text-slate-400 text-sm mb-2">Idéal pour les <strong class="text-white">logos</strong></p>
<ul class="text-sm text-slate-300 space-y-1">
<li>✓ Transparence</li>
<li>✓ Sans perte (lossless)</li>
<li>✗ Fichiers lourds</li>
</ul>
</div>
<div class="bg-slate-900/50 p-5 rounded-2xl border border-slate-700 hover:border-wp/50 transition-colors">
<div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-3">
<span class="text-orange-400 font-bold text-lg">SVG</span>
</div>
<h3 class="text-lg font-bold mb-2">SVG</h3>
<p class="text-slate-400 text-sm mb-2">Idéal pour les <strong class="text-white">icônes</strong></p>
<ul class="text-sm text-slate-300 space-y-1">
<li>✓ Vectoriel (zoom ∞)</li>
<li>✓ Très léger</li>
<li>✗ Pas pour photos</li>
</ul>
</div>
<div class="bg-slate-900/50 p-5 rounded-2xl border border-slate-700 hover:border-wp/50 transition-colors">
<div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-3">
<span class="text-purple-400 font-bold text-lg">GIF</span>
</div>
<h3 class="text-lg font-bold mb-2">GIF</h3>
<p class="text-slate-400 text-sm mb-2">Idéal pour les <strong class="text-white">animations</strong></p>
<ul class="text-sm text-slate-300 space-y-1">
<li>✓ Animations simples</li>
<li>✗ 256 couleurs max</li>
<li>✗ Fichiers lourds</li>
</ul>
</div>
<div class="bg-wp/20 p-5 rounded-2xl border border-wp/50 transition-colors">
<div class="w-12 h-12 bg-wp/30 rounded-xl flex items-center justify-center mb-3">
<span class="text-wp font-bold text-sm">WebP</span>
</div>
<h3 class="text-lg font-bold mb-2 text-wp">WebP</h3>
<p class="text-slate-400 text-sm mb-2"><strong class="text-white">Moderne</strong> (Google)</p>
<ul class="text-sm text-slate-300 space-y-1">
<li>✓ 25-35% plus léger que JPG</li>
<li>✓ Transparence + animation</li>
<li>✓ <strong class="text-green-400">97% navigateurs</strong></li>
</ul>
</div>
<div class="bg-green-500/20 p-5 rounded-2xl border border-green-500/50 transition-colors">
<div class="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center mb-3">
<span class="text-green-400 font-bold text-sm">AVIF</span>
</div>
<h3 class="text-lg font-bold mb-2 text-green-400">AVIF</h3>
<p class="text-slate-400 text-sm mb-2"><strong class="text-white">Nouvelle génération</strong></p>
<ul class="text-sm text-slate-300 space-y-1">
<li>✓ <strong class="text-green-400">50% plus léger</strong> que JPG</li>
<li>✓ Meilleure qualité</li>
<li>✓ ~90% navigateurs</li>
</ul>
</div>
</div>

<div class="grid md:grid-cols-2 gap-4">
<div class="bg-wp/10 border border-wp/30 p-4 rounded-2xl">
<p class="text-wp font-medium">💡 Recommandation 2026</p>
<p class="text-slate-300 text-sm mt-2"><strong class="text-white">WebP</strong> reste le choix le plus sûr (97% de support). <strong class="text-green-400">AVIF</strong> offre une meilleure compression mais avec un support légèrement inférieur (~90%).</p>
</div>
<div class="bg-slate-900/50 border border-slate-700 p-4 rounded-2xl">
<p class="text-slate-300 font-medium">📊 Comparaison taille (photo 1MB en JPG)</p>
<div class="flex gap-4 mt-2 text-sm">
<span class="text-yellow-400">JPG: 1 MB</span>
<span class="text-wp">WebP: ~700 KB</span>
<span class="text-green-400">AVIF: ~500 KB</span>
</div>
</div>
</div>

---
<!-- section: 03 / Dimensions -->

## <span class="text-wp">Redimensionner</span> ses images

<div class="grid md:grid-cols-2 gap-12 items-center">
<div>

Si vos images s'affichent au maximum sur <strong class="text-white">750px</strong> de large, pourquoi envoyer des images de <strong class="text-wpOrange">5000px</strong> ?

Il est rare de voir des images de plus de <strong class="text-white">1800px</strong> de large sur un site web.

<div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-6">
<h3 class="text-lg font-bold mb-3 flex items-center gap-2">
<svg class="w-5 h-5 text-wp" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
Trouver la taille max utile
</h3>
<ol class="text-slate-400 space-y-2 text-sm">
<li><span class="text-wp font-bold">1.</span> Ouvrir la page sur un grand écran</li>
<li><span class="text-wp font-bold">2.</span> Inspecter l'image (F12 → Elements)</li>
<li><span class="text-wp font-bold">3.</span> Vérifier sa taille réelle d'affichage</li>
<li><span class="text-wp font-bold">4.</span> Redimensionner à cette taille (ou légèrement plus pour le Retina)</li>
</ol>
</div>

<div class="bg-wp/10 border border-wp/30 p-4 rounded-xl">
<p class="text-wp font-medium">✨ Règle d'or</p>
<p class="text-slate-300 text-sm mt-1">Toujours redimensionner <strong class="text-white">avant</strong> d'envoyer sur le serveur.</p>
</div>

</div>
<div class="space-y-6">
<div class="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
<h3 class="text-lg font-bold mb-4">Comparaison de poids</h3>
<div class="space-y-4">
<div>
<div class="flex justify-between text-sm mb-1">
<span class="text-slate-300">Photo originale (5000px)</span>
<span class="text-red-400 font-bold">8.5 Mo</span>
</div>
<div class="w-full bg-slate-700 rounded-full h-4">
<div class="bg-red-500 h-4 rounded-full" style="width: 100%"></div>
</div>
</div>
<div>
<div class="flex justify-between text-sm mb-1">
<span class="text-slate-300">Redimensionnée (1800px)</span>
<span class="text-yellow-400 font-bold">1.2 Mo</span>
</div>
<div class="w-full bg-slate-700 rounded-full h-4">
<div class="bg-yellow-500 h-4 rounded-full" style="width: 14%"></div>
</div>
</div>
<div>
<div class="flex justify-between text-sm mb-1">
<span class="text-slate-300">+ compression WebP</span>
<span class="text-green-400 font-bold">350 Ko</span>
</div>
<div class="w-full bg-slate-700 rounded-full h-4">
<div class="bg-green-500 h-4 rounded-full" style="width: 4%"></div>
</div>
</div>
</div>
</div>
<div class="bg-wp/10 p-4 rounded-xl border border-wp/30 text-center">
<p class="text-3xl font-bold text-wp mb-1">-96%</p>
<p class="text-slate-300 text-sm">Réduction de poids possible</p>
</div>
</div>
</div>
