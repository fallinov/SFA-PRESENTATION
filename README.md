# SFA-PRESENTATION

Dépôt centralisé des présentations HTML utilisées dans les cours ESIG et les projets CEJEF.

## Consulter en ligne

**GitHub Pages** : https://fallinov.github.io/SFA-PRESENTATION/

## Structure

```
SFA-PRESENTATION/
├── index.html                                # Sommaire (page d'accueil)
├── assets/
│   ├── logos/                                # Logos SVG (20 fichiers)
│   └── backgrounds/                          # Arrière-plans PNG (6 fichiers)
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

Toutes les présentations utilisent le même pattern :

- **HTML** statique autonome (un seul fichier par présentation)
- **Tailwind CSS** (CDN) pour le style
- **JavaScript** natif pour la navigation clavier (flèches, espace)
- Système de slides personnalisé (classes `.slide` / `.slide.active`)

## Provenance

| Dossier | Projet source | Cours/Contexte |
|---------|---------------|----------------|
| `wordpress/` | ESIG/741, 2026-sfa-wordpress-gestion-medias | Atelier CMS (ESIG2) |
| `devjs/` | devjs (devjs.ch) | Cours 122/141 (ESIG1-2) |
| `cours-mots-de-passes/` | 2026-cours-mots-de-passes | Formation ProtonPass (CEJEF) |
| `referentiel-logiciels/` | 2025-cns-sfa-referentiel-logiciels-cejef | Projet CNS / GCN |

## Ajouter une présentation

1. Créer un sous-dossier par projet (ou utiliser un existant)
2. Placer le fichier HTML dans le sous-dossier
3. Stocker les assets (images, SVG) dans `assets/`
4. Mettre à jour le sommaire dans `index.html`
5. Si la présentation référence des assets, utiliser des chemins relatifs vers `../assets/`
