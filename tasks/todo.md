# TODO — SFA-PRESENTATION

## md2slides
- [x] Créer le préprocesseur Markdown → HTML (`libs/md2slides.mjs`)
- [x] Coloration syntaxique (js, css, html, vue, php)
- [x] Directives par slide (class, layout, section, blurs)
- [x] CSS `:not([class])` pour ne pas écraser les classes Tailwind inline
- [x] Prévention du débordement vertical
- [ ] Convertir les présentations existantes en Markdown
- [ ] Ajouter le support des images locales (copie automatique)

## Souveraineté des données
- [x] Télécharger Tailwind CSS et le servir localement → `libs/tailwind.js`
- [x] Télécharger les polices Google Fonts (Inter, JetBrains Mono) → `libs/fonts/`
- [ ] Remplacer les liens CDN Lucide Icons par des SVG inline ou locaux (si utilisés)

## Améliorations
- [ ] Ajouter un bouton retour au sommaire dans chaque présentation
- [x] Harmoniser la navigation clavier → `libs/slides.js` unifié (toggle + scroll)
- [ ] Ajouter un mode impression / export PDF

## Maintenance
- [ ] Vérifier que toutes les présentations fonctionnent sur GitHub Pages (chemins relatifs)
- [ ] Ajouter les nouvelles présentations au fur et à mesure des cours
