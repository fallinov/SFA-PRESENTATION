# SFA-PRESENTATION

Dépôt centralisé des présentations HTML utilisées dans les cours ESIG et les projets CEJEF.

## Consulter en ligne

**GitHub Pages** : https://fallinov.github.io/SFA-PRESENTATION/

## Structure

```
SFA-PRESENTATION/
├── index.html                                # Sommaire (page d'accueil)
├── package.json                              # Dépendances (markdown-it, gray-matter)
├── assets/
│   ├── logos/                                # Logos SVG (20 fichiers)
│   └── backgrounds/                          # Arrière-plans PNG (6 fichiers)
├── libs/
│   ├── slides.js                             # Moteur de slides (navigation, clavier, touch, ARIA)
│   ├── slides.css                            # Styles communs (slides, animations, dots, nav)
│   ├── md2slides.mjs                         # Convertisseur Markdown → HTML
│   ├── tailwind.js                           # Tailwind CSS (script standalone, local)
│   ├── fonts.css                             # Déclarations @font-face
│   └── fonts/                                # Fichiers woff2 (Inter, JetBrains Mono)
├── djasou/                                   # App Nuxt 4 — chat IA pour créer des présentations
├── wordpress/                                # ESIG 741 — WordPress
│   ├── wordpress-gestion-medias.html
│   └── wordpress-plugins.html
├── devjs/                                    # ESIG 122/141 — JavaScript & Vue.js
│   ├── js-intro.html
│   ├── vue-composants.html
│   ├── vue-intro.html
│   └── vue-lifecycle-watchers.html
├── cours-mots-de-passes/                     # CEJEF — Sécurité
│   └── cours-mots-de-passes.html
└── referentiel-logiciels/                    # CEJEF — GCN / COPIL / SEN
    ├── referentiel-logiciels.html
    ├── referentiel-logiciels-copil.html
    ├── referentiel-logiciels-sen.html
    └── site-cejef-copil.html
```

## Stack technique

- **HTML** statique autonome (un fichier par présentation)
- **Tailwind CSS** local (`libs/tailwind.js`) pour le style
- **slides.js** — moteur de slides unifié (navigation clavier, touch, contraste, copie code, ARIA)
- **slides.css** — styles communs (animations, dots, progress bar, nav)
- **md2slides.mjs** — préprocesseur Markdown → HTML (optionnel, pour écrire les slides en Markdown)
- **Polices** self-hosted : Inter + JetBrains Mono (`libs/fonts/`)
- Aucun CDN externe — tout est self-hosted

## md2slides — Écrire en Markdown

Les présentations peuvent être écrites en Markdown et converties en HTML identique aux versions codées à la main.

```bash
node libs/md2slides.mjs wordpress/gestion-medias.md   # un fichier
node libs/md2slides.mjs                                # tous les .md
node libs/md2slides.mjs --watch                        # watch mode
npm run build                                          # alias
npm run watch                                          # alias
```

Voir `CLAUDE.md` pour le format Markdown détaillé (frontmatter, directives, comportements automatiques).

## Provenance

| Dossier | Projet source | Cours/Contexte |
|---------|---------------|----------------|
| `wordpress/` | ESIG/741, 2026-sfa-wordpress-gestion-medias | Atelier CMS (ESIG2) |
| `devjs/` | devjs (devjs.ch) | Cours 122/141 (ESIG1-2) |
| `cours-mots-de-passes/` | 2026-cours-mots-de-passes | Formation ProtonPass (CEJEF) |
| `referentiel-logiciels/` | 2025-cns-sfa-referentiel-logiciels-cejef | Projet CNS / GCN |

## Ajouter une présentation

### Option 1 : HTML direct

1. Placer le fichier HTML dans le sous-dossier projet
2. Dans `<head>` : référencer `tailwind.js`, `fonts.css`, `slides.css`
3. Avant `</body>` : référencer `slides.js`
4. Stocker les assets dans `assets/`
5. Mettre à jour `index.html` (sommaire)

### Option 2 : Markdown (recommandé)

1. Créer un fichier `.md` dans le sous-dossier projet
2. Ajouter le frontmatter YAML (titre, couleurs, gradients)
3. Écrire les slides séparées par `---`
4. `npm run build` pour générer le HTML
5. Mettre à jour `index.html` (sommaire)
