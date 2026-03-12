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
- Un fichier HTML autonome par présentation (tout inline : CSS, JS, contenu)
- Système de slides : classes `.slide` / `.slide.active` avec navigation clavier
- Tailwind CSS via CDN pour le style
- Polices : Inter (texte), JetBrains Mono (code) via Google Fonts CDN

### Assets
- Tous les assets partagés dans `assets/` à la racine
- Sous-dossiers : `logos/` (SVG), `backgrounds/` (PNG)
- Depuis un sous-dossier de présentation, référencer avec `../assets/`

### Organisation
- Un dossier par projet/cours
- Nommage des fichiers : kebab-case descriptif
- Pas de fichiers dupliqués entre dossiers

## Ajouter une présentation

1. Placer le HTML dans le dossier projet approprié (ou en créer un nouveau)
2. Stocker les assets dans `assets/logos/` ou `assets/backgrounds/`
3. Vérifier les chemins relatifs (`../assets/` depuis un sous-dossier)
4. Mettre à jour `index.html` (sommaire) avec le lien vers la nouvelle présentation
5. Commit + push → déploiement automatique sur GitHub Pages

## Projets sources

Les présentations proviennent de ces dépôts (où elles ont été supprimées) :

| Dossier | Dépôt source |
|---------|-------------|
| `wordpress/` | `~/ESIG/741/` + [2026-sfa-wordpress-gestion-medias](https://github.com/fallinov/2026-sfa-wordpress-gestion-medias) (archivé) |
| `devjs/` | `~/WebstormProjects/devjs/` |
| `cours-mots-de-passes/` | `~/WebstormProjects/2026-cours-mots-de-passes/` |
| `referentiel-logiciels/` | `~/WebstormProjects/2025-cns-sfa-referentiel-logiciels-cejef/` + `~/CNS/` |
