# Djasou

App web conversationnelle pour créer des présentations HTML via IA (Claude).

> Conventions globales : voir `~/.claude/CLAUDE.md` et `~/.claude/rules/`.

## Stack

- **Framework** : Nuxt 4 (compatibilityVersion 4)
- **UI** : Nuxt UI 4 (Reka UI + Tailwind v4)
- **IA** : Claude API via Vercel AI SDK (`ai` + `@ai-sdk/anthropic`)
- **Auth** : `nuxt-auth-utils`
- **Stockage** : Fichiers Markdown sur disque (`data/`)

## Structure

```
djasou/
├── app/                        # Code client Nuxt 4
│   ├── assets/css/main.css     # Tailwind v4 + Nuxt UI
│   ├── components/             # Composants Vue
│   ├── composables/            # useChat, usePresentation, etc.
│   ├── layouts/                # default, editor, auth
│   ├── middleware/auth.ts      # Protection des routes
│   └── pages/                  # index, login, editor/[slug]
├── server/
│   ├── api/                    # Routes API Nitro
│   │   ├── auth/               # login, logout, session
│   │   ├── presentations/      # CRUD + render + export
│   │   ├── chat/               # Streaming IA
│   │   ├── catalog/            # Catalogue composants
│   │   └── themes/             # Thèmes disponibles
│   └── lib/
│       ├── md2slides.ts        # Convertisseur MD → HTML (port TS)
│       ├── highlight.ts        # Coloration syntaxique
│       ├── storage.ts          # Lecture/écriture data/
│       └── ai/                 # System prompt, tools, context
├── public/static/              # Assets pour les slides (servis statiquement)
│   ├── slides.js               # Moteur de slides
│   ├── slides.css              # Styles slides
│   ├── tailwind.js             # Tailwind standalone
│   ├── fonts.css               # @font-face
│   └── fonts/                  # woff2
├── catalog/                    # Définitions des composants (fichiers .md)
└── data/                       # Données persistantes (gitignored)
    ├── presentations/{slug}/   # content.md + meta.json
    ├── users.json              # Utilisateurs
    └── tags.json               # Tags disponibles
```

## Conventions

- Le code de `public/static/` provient de SFA-PRESENTATION `libs/` — ne PAS modifier directement
- `md2slides.ts` est le port TypeScript de `libs/md2slides.mjs` — garder en sync
- Les présentations sont stockées comme fichiers Markdown avec frontmatter YAML
- L'iframe de preview utilise `srcdoc` pour isolation CSS/JS complète
- Tous les assets sont self-hosted (zéro CDN)

## Commandes

```bash
npm run dev          # Démarrage dev
npm run build        # Build production
```

## Variables d'environnement

```
NUXT_ANTHROPIC_API_KEY=sk-ant-...
NUXT_SESSION_PASSWORD=...
```
