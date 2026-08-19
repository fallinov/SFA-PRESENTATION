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

## 2026-04-24 — Overflow slides : min-h-screen et p-12 dans un viewport 1280×720

**Contexte** : La présentation `site-cejef-copil.html` avait du contenu tronqué sur plusieurs slides (titre invisible, items coupés)
**Erreur** : Toutes les slides utilisaient `min-h-screen` (inutile car le moteur force 1280×720) et `p-12` (96px de padding vertical, soit 13% du budget perdu). La slide de validation avec 8 items débordait de 186px
**Correction** : Retiré `min-h-screen`, réduit `p-12` → `p-8`, ajouté `bg-slate-900` sur chaque slide (le scaling empêche l'héritage du fond body), scindé la slide 10 (8 items) en 2 slides de 4
**Règle** : Toujours dimensionner le contenu pour 1280×720px fixe. Max ~580px de contenu vertical avec `p-8`. Pas de classes viewport-relatives. Chaque slide doit avoir son propre `bg-*`

## 2026-08-19 — Decks deckadence : le scroll natif des ancres #sN désynchronise la caméra

**Contexte** : Relecture de `devjs/113-demarrage.html` — test des liens directs `#sN` promis dans l'en-tête
**Erreur** : `#viewport { overflow: hidden }` cache les scrollbars mais reste scrollable programmatiquement. Une navigation vers `#s14` (lien d'ancre, hash tapé à la main) déclenchait le scroll natif du fragment : le viewport se décalait de ~10000px, la caméra et le HUD ne le savaient pas → deck complètement désynchronisé
**Correction** : `overflow: clip` sur `html`, `body` et `#viewport` (interdit tout scroll, même programmatique) + listener `hashchange` qui route vers `goto(i)` + `history.replaceState` à chaque navigation pour que l'URL suive la station courante (F5 reprend où on en était)
**Règle** : Dans un moteur caméra à monde infini, toujours utiliser `overflow: clip` (pas `hidden`) sur les conteneurs, et gérer les ancres soi-même via `hashchange`. `replaceState` ne déclenche pas `hashchange` — pas de boucle

## 2026-03-14 — Spécificité CSS : styles globaux écrasent Tailwind inline

**Contexte** : Les styles `.slide p { color: #cbd5e1; font-size: 1.125rem; }` écrasaient les classes Tailwind comme `text-sm` sur le HTML inline dans les slides
**Erreur** : Spécificité `.slide p` (0-1-1) > `.text-sm` (0-1-0) — les paragraphes avec classes Tailwind héritaient quand même du style global
**Correction** : Utiliser `.slide p:not([class])` pour ne cibler que les éléments Markdown nus (sans attribut `class`)
**Règle** : Quand on génère du CSS global qui cohabite avec des classes utilitaires (Tailwind), utiliser `:not([class])` pour ne cibler que les éléments sans classes explicites
