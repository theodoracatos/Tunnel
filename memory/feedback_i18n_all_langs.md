---
name: feedback_i18n_all_langs
description: Always update all 5 language translations when changing any UI string in TUNL
metadata:
  type: feedback
---

When renaming or changing any user-visible string in TUNL, always update all 5 languages in `src/i18n.js`: `en`, `de`, `fr`, `it`, `es`.

**Why:** The user expects full parity across languages. Partial updates leave some languages with stale or inconsistent text.

**How to apply:** Any time a translation key value changes in one language, update the corresponding key in all other language objects in the same edit. Never change just `en` and leave the rest.
