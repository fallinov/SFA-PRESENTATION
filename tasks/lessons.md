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
