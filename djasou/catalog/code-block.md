---
name: Code Block
description: Bloc de code avec coloration syntaxique et bouton copier
category: content
---

## Usage

Afficher du code source avec coloration syntaxique. En mode md2slides, les code fences Markdown sont automatiquement convertis en `.code-block[data-code]` avec la coloration appropriée.

## Template

```html
<!-- Via md2slides (recommandé) : utiliser des code fences dans le Markdown -->
<!-- Le HTML ci-dessous est généré automatiquement -->

<div class="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
  <p class="text-sm text-slate-300 mb-3 font-mono">Exemple — Description du code</p>
  <div class="code-block pr-20" data-code="const greeting = 'Hello World';
console.log(greeting);">
    <button class="copy-btn" onclick="copyCode(this)">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
      Copier
    </button>
    <code>
      <span class="keyword">const</span> <span class="variable">greeting</span> = <span class="string">'Hello World'</span>;<br>
      <span class="function">console.log</span>(<span class="variable">greeting</span>);
    </code>
  </div>
  <p class="text-slate-400 text-sm mt-3">Explication complémentaire du code.</p>
</div>
```

## Notes

- En **md2slides**, utiliser simplement des code fences avec le langage :
  ````markdown
  ```js
  const greeting = 'Hello World';
  console.log(greeting);
  ```
  ````
- Le convertisseur génère automatiquement la coloration pour : `js`, `css`, `html`, `vue`, `php`
- Classes de coloration disponibles : `.keyword`, `.string`, `.function`, `.comment`, `.tag`, `.attr`, `.value`, `.number`, `.type`, `.variable`, `.php-tag`
- Le `.code-block` a un fond `#1e1e1e` (style VS Code dark)
- L'attribut `data-code` contient le code brut pour le bouton copier
- Le bouton copier est positionné en absolu dans le coin supérieur droit
- Utiliser `pr-20` sur le `.code-block` pour ne pas que le code passe sous le bouton copier
- Envelopper dans `bg-slate-800/50 p-6 rounded-2xl border border-slate-700` pour le contexte
