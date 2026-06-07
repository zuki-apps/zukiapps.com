# UX/UI review — ZukiApps-WEB

Act as the **senior UX designer** (see `.claude/agents/senior-ux-designer.md`).

Review the changed pages/components for:

1. **Information hierarchy** — icon → title → value prop → CTA → details
2. **Twilight cohesion** — dark pages use `StarBackground` / `card-twilight`; legal pages use light accent gradients
3. **Accent consistency** — per-app color family matches siblings
4. **Mobile & responsive** — spacing, tap targets, text scale at `md:`
5. **Accessibility** — contrast, focus, aria, reduced motion
6. **RTL** — Hebrew/Arabic alignment and nav
7. **i18n** — no hardcoded copy in TSX

Output: Critical UX → Visual polish → A11y/RTL → Minimal Tailwind patches → summary.

Do not propose a full redesign or new dependencies.
