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
- `slides.js` — Moteur de slides unifié (navigation, clavier, touch, contraste, copie code, ARIA)
- `slides.css` — Styles communs (slides, animations, dots, nav, progress bar, contraste)
- `md2slides.mjs` — Convertisseur Markdown → HTML (voir section dédiée ci-dessous)
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
2. Dans `<head>` : référencer `tailwind.js`, `fonts.css`, `slides.css`
3. Avant `</body>` : référencer `slides.js`
4. Ne mettre dans `<style>` que le CSS custom (couleurs, gradients du thème)
5. Pour le mode scroll : ajouter `data-nav="scroll"` sur `<body>`
6. Ajouter `<nav id="dots"></nav>` dans le HTML (les dots sont générés par JS)
7. Optionnel : `<div id="contrast-badge">` pour l'indicateur de contraste
8. Éléments auto-générés par `slides.js` (ne pas les coder en dur) :
   - Barre de progression (`.slide-progress`)
   - Boutons prev/next (`.slide-nav`)
   - Compteur de slides (`.slide-counter`)
   - Dots de navigation (dans `#dots`)
   - Skip link, keyboard hints, ARIA live region
9. Stocker les assets dans `assets/`
10. Mettre à jour `index.html` (sommaire)
11. Commit + push → déploiement automatique sur GitHub Pages

## md2slides — Préprocesseur Markdown → HTML

Convertisseur qui génère le même HTML que les présentations existantes à partir de fichiers Markdown.

### Commandes

```bash
node libs/md2slides.mjs wordpress/gestion-medias.md   # un fichier
node libs/md2slides.mjs                                # tous les .md
node libs/md2slides.mjs --watch                        # watch mode
npm run build                                          # alias (tous les .md)
npm run watch                                          # alias (watch)
```

### Format Markdown

Frontmatter YAML en tête de fichier :

```yaml
---
title: "Titre de la présentation"
nav: scroll          # optionnel, "scroll" ou omis (toggle)
colors:
  wp: "#0073aa"
gradients:
  gradient-wp: "linear-gradient(135deg, #0073aa 0%, #23282d 100%)"
---
```

Séparateur de slides : `---`

Directives par slide (commentaires HTML) :

```markdown
<!-- class: gradient-wp -->   # classes CSS sur la <section>
<!-- layout: title -->        # layout titre (centré, z-10)
<!-- blurs -->                 # divs décoratives blur
<!-- section: 01 / Intro -->  # label de section
```

### Comportements automatiques

- Code fences → `.code-block[data-code]` avec coloration syntaxique (js, css, html, vue, php)
- Slides sans `class:` → alternance `bg-slate-900` / `bg-slate-800`
- Contenu non-titre → wrapper `<div class="max-w-6xl mx-auto px-6 w-full">` (sauf si commence par `<div`)
- HTML inline passe tel quel (pour les layouts complexes)
- Chemins `libs/` calculés automatiquement selon la profondeur du fichier

### Dépendances

- `markdown-it` (~30 KB) — parsing Markdown
- `gray-matter` (~10 KB) — frontmatter YAML

## Projets sources

Les présentations proviennent de ces dépôts (où elles ont été supprimées) :

| Dossier | Dépôt source |
|---------|-------------|
| `wordpress/` | `~/ESIG/741/` + [2026-sfa-wordpress-gestion-medias](https://github.com/fallinov/2026-sfa-wordpress-gestion-medias) (archivé) |
| `devjs/` | `~/WebstormProjects/devjs/` |
| `cours-mots-de-passes/` | `~/WebstormProjects/2026-cours-mots-de-passes/` |
| `referentiel-logiciels/` | `~/WebstormProjects/2025-cns-sfa-referentiel-logiciels-cejef/` + `~/CNS/` |
