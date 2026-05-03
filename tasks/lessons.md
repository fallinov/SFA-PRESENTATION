# Leçons apprises — SFA-PRESENTATION

## 2026-03-12 — Chemins relatifs cassés après déplacement

**Contexte** : Migration des présentations depuis 5 projets sources vers SFA-PRESENTATION
**Erreur** : La présentation `cours-mots-de-passes` référençait `assets/logos/proton.svg` mais le fichier était maintenant dans `../assets/`
**Correction** : `sed` sur tous les chemins `assets/` → `../assets/` dans le HTML
**Règle** : Toute présentation dans un sous-dossier doit référencer les assets avec `../assets/`, pas `assets/`

## 2026-03-12 — GitHub Pages mode legacy vs workflow

**Contexte** : Activation de GitHub Pages pour le dépôt
**Erreur** : Tentative initiale avec `build_type=workflow` (nécessite un fichier GitHub Actions)
**Correction** : Basculé en mode `legacy` avec `source.branch=main`
**Règle** : Pour du HTML statique sans build, utiliser le mode legacy. Le mode workflow est réservé aux sites nécessitant un build (Jekyll, Astro, etc.)

## 2026-03-14 — Placeholders du tokenizer syntaxique corrompus par le regex number

**Contexte** : Développement de la coloration syntaxique dans `md2slides.mjs`
**Erreur** : Les placeholders `\x00{N}\x00` contenaient un chiffre (`N`). Le regex `\b\d+\b` pour détecter les nombres matchait ce chiffre, remplaçant les commentaires et strings protégés par `<span class="number">0</span>`
**Correction** : Changé le format de placeholder en `§PH_N§` — le caractère `§` n'est pas un word character (`\w`), donc `\b` ne matche pas à la frontière
**Règle** : Quand on utilise des placeholders dans un pipeline de regex, choisir des délimiteurs qui ne peuvent pas être matchés par les autres regex du pipeline

## 2026-03-30 — Présentation avec framework custom (pas slides.js)

**Contexte** : Ajout de fiches-eleves.html (ESIG 113) qui utilise son propre système de slides (pas slides.js/slides.css)
**Erreur** : Le fichier source utilisait `cdn.tailwindcss.com` — violation de la règle souveraineté
**Correction** : Remplacé par `../libs/tailwind.js` (lib locale)
**Règle** : Toute présentation importée doit être auditée pour les CDN externes avant ajout. Remplacer systématiquement par les libs locales

## 2026-03-14 — Spécificité CSS : styles globaux écrasent Tailwind inline

**Contexte** : Les styles `.slide p { color: #cbd5e1; font-size: 1.125rem; }` écrasaient les classes Tailwind comme `text-sm` sur le HTML inline dans les slides
**Erreur** : Spécificité `.slide p` (0-1-1) > `.text-sm` (0-1-0) — les paragraphes avec classes Tailwind héritaient quand même du style global
**Correction** : Utiliser `.slide p:not([class])` pour ne cibler que les éléments Markdown nus (sans attribut `class`)
**Règle** : Quand on génère du CSS global qui cohabite avec des classes utilitaires (Tailwind), utiliser `:not([class])` pour ne cibler que les éléments sans classes explicites
