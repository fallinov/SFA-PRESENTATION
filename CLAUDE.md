# SFA-PRESENTATION

Dépôt centralisé de présentations HTML pour les cours ESIG et projets CEJEF.

> Conventions globales (git, code, souveraineté) : voir `~/.claude/CLAUDE.md` et `~/.claude/rules/`.

## Déploiement

- **GitHub Pages** : https://fallinov.github.io/SFA-PRESENTATION/
- Déploiement automatique depuis `main` (mode legacy, pas de workflow GitHub Actions)

## Structure

```
SFA-PRESENTATION/
├── index.html          # Sommaire — page d'accueil avec liens vers toutes les présentations
├── assets/             # Fichiers partagés (logos SVG, backgrounds PNG)
├── wordpress/          # ESIG 741 — Atelier CMS
├── devjs/              # ESIG 122/141 — JavaScript & Vue.js
├── cours-mots-de-passes/ # CEJEF — Formation sécurité
└── referentiel-logiciels/ # CEJEF — GCN, COPIL, SEN
```

## Conventions

### Fichiers HTML
- Un fichier HTML par présentation, ne contient que le contenu + CSS custom (couleurs, gradients)
- Système de slides unifié : `libs/slides.js` (navigation, clavier, touch, contraste) + `libs/slides.css`
- Mode scroll (WordPress) : ajouter `data-nav="scroll"` sur `<body>`
- Mode toggle (défaut) : `.slide` / `.slide.active`
- Tailwind CSS local : `libs/tailwind.js`
- Polices locales : Inter + JetBrains Mono dans `libs/fonts/`
- Aucun CDN externe — tout est self-hosted

### Assets
- Tous les assets partagés dans `assets/` à la racine
- Sous-dossiers : `logos/` (SVG), `backgrounds/` (PNG)
- Depuis un sous-dossier de présentation, référencer avec `../assets/`

### Librairies (`libs/`)
- `slides.js` — Moteur de slides unifié (navigation, clavier, touch, contraste, copie code)
- `slides.css` — Styles communs (slides, animations, dots, coloration syntaxique, contraste)
- `tailwind.js` — Tailwind CSS (script standalone)
- `fonts.css` — Déclarations @font-face (latin + latin-ext)
- `fonts/` — Fichiers woff2 (Inter, JetBrains Mono)
- Depuis un sous-dossier : `../libs/slides.js`, `../libs/slides.css`, etc.
- Depuis la racine : `libs/slides.js`, `libs/slides.css`, etc.

### Organisation
- Un dossier par projet/cours
- Nommage des fichiers : kebab-case descriptif
- Pas de fichiers dupliqués entre dossiers

## Ajouter une présentation

1. Placer le HTML dans le dossier projet approprié (ou en créer un nouveau)
2. Dans `<head>` : référencer `tailwind.js`, `slides.css`, et optionnellement `fonts.css`
3. Avant `</body>` : référencer `slides.js`
4. Ne mettre dans `<style>` que le CSS custom (couleurs, gradients du thème)
5. Pour le mode scroll : ajouter `data-nav="scroll"` sur `<body>`
6. Éléments auto-détectés par `slides.js` : `#dots`, `#progress`, `#currentSlide`, `#totalSlides`
7. Stocker les assets dans `assets/`
8. Mettre à jour `index.html` (sommaire)
9. Commit + push → déploiement automatique sur GitHub Pages

## Projets sources

Les présentations proviennent de ces dépôts (où elles ont été supprimées) :

| Dossier | Dépôt source |
|---------|-------------|
| `wordpress/` | `~/ESIG/741/` + [2026-sfa-wordpress-gestion-medias](https://github.com/fallinov/2026-sfa-wordpress-gestion-medias) (archivé) |
| `devjs/` | `~/WebstormProjects/devjs/` |
| `cours-mots-de-passes/` | `~/WebstormProjects/2026-cours-mots-de-passes/` |
| `referentiel-logiciels/` | `~/WebstormProjects/2025-cns-sfa-referentiel-logiciels-cejef/` + `~/CNS/` |
