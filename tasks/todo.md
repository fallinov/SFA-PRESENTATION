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

## Djasou — App IA
- [x] Phase 1-2 : Scaffold Nuxt 4, auth, CRUD présentations, preview iframe
- [x] Phase 3 : Chat IA streaming (SSE), tools (create/update/delete slides), system prompt
- [x] Phase 4 — ChatModeSelector : bascule édition présentation/slide
- [x] Phase 4 — CatalogPanel : catalogue visuel des 15 composants avec USlideover
- [x] Phase 4 — Endpoint GET /api/catalog
- [x] Phase 4 — Composable useCatalog (fetch, sélection, groupement)
- [ ] Phase 4 — Tests manuels : vérifier mode slide + catalogue en conditions réelles
- [ ] Phase 5 — Thèmes : sélecteur de thème + aperçu
- [ ] Déploiement : VPS Infomaniak (Docker ou PM2)

## Maintenance
- [ ] Vérifier que toutes les présentations fonctionnent sur GitHub Pages (chemins relatifs)
- [ ] Ajouter les nouvelles présentations au fur et à mesure des cours
