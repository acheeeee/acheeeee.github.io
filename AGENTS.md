## Design decisions are binding

This project's design work runs through the Impeccable skill. Before editing any UI
file (`.astro`, CSS, components, assets), read these in order and treat them as the
authority — not as background reading:

1. `PRODUCT.md` — confirmed product truth: who the site is for, what is real, and
   what must never be fabricated. Facts marked 未定 / 待提供 are open: ask, do not invent.
2. `DESIGN.md` — the committed visual world (tokens, type, spacing, motion).
   If it does not exist yet, the current code is the incumbent authority.
3. `.impeccable/surfaces/*.md` — the surface brief for the page being edited:
   its mode, narrative, and section order.
4. `.kiro/skills/impeccable/SKILL.md` — routing and the command playbook, plus
   `reference/craft-floor.md`, which must be read immediately before any UI edit.
5. `MAINTENANCE.md` — how to actually make common changes (adding work entries,
   closing one, reading-log entries, copy, fonts) and the verification steps that
   must run afterwards. Start here for routine content updates.

Rules:

- A decision recorded in these files outranks a fresh idea. If the work needs to
  depart from them, say so and get agreement first, then update the file.
- Never invent credentials, metrics, awards, papers, clients, or testimonials.
  `PRODUCT.md` lists what does not exist; that list is enforced.
- Refinement preserves the incumbent identity, copy, and behavior outside its scope.
  Only an explicit redesign replaces the visual world.
- After finishing changed web UI, run the detector once:
  `sh .kiro/skills/impeccable/scripts/impeccable detect --json <changed files>`

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
