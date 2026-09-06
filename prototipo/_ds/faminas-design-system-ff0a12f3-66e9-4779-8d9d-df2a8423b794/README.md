# FAMINAS — Centro Universitário · Design System

A reusable design system for the digital products of **FAMINAS – Centro Universitário**, a Brazilian higher-education institution offering undergraduate, graduate and academic programs across health, technology, business, education and the humanities.

This system standardizes institutional, academic and administrative interfaces — student/teacher portals, applicant flows, coordination and internal systems, course landing pages, dashboards and educational platforms. The identity should convey **confidence, modernity, clarity, warmth and academic credibility**: professional enough for institutional communication, flexible enough for day-to-day products used by students, professors, staff and managers.

> Language note: the products and their copy are in **Brazilian Portuguese**. Keep UI copy in pt-BR.

---

## Sources (what this system was built from)

Everything here is derived from FAMINAS's **real digital products** — three React/shadcn-ui apps that share one institutional palette. Explore them for deeper fidelity:

| Product | Repo | What it is |
|---|---|---|
| **SIGA Preceptores** | `github.com/FlavioAAMotta/preceptor-point` | Ponto (clock-in) + chamada (attendance) + avaliações for medical preceptors. **Most intentional design system** ("Clean Medical Palette") — the canonical token source. React 18 + TS, Supabase. |
| **Portal de Docentes** | `github.com/FlavioAAMotta/profs-faminas` | *Planilha Interativa de Docentes* — faculty statistics dashboard (Medicine). React 19, Framer Motion. |
| **Mapa de Estágios** | `github.com/FlavioAAMotta/discentes_faminas` | *Mapa Interativo de Estágios* — internship sites on a Leaflet map. React 19, Tailwind v4. |

All three are **shadcn/ui + Tailwind** apps using **Lucide** icons and the shared FAMINAS palette (`--faminas-blue` `#2D2A6F`, `--faminas-pink` `#D00C64`, `--faminas-light` `#6097CA`). The reader is encouraged to clone these repos to build new designs with higher fidelity to the real components.

> **Typography:** the FAMINAS design system uses **Plus Jakarta Sans** (display/headings) + **Public Sans** (body/UI), plus **JetBrains Mono** for codes/matrículas. All three are open-source typefaces chosen to fit the institutional character — legible, modern and accessible — and are **self-hosted** in `fonts/` (no external CDN). These are the canonical FAMINAS system fonts.

---

## Content Fundamentals

How FAMINAS products write copy:

- **Language:** Brazilian Portuguese, always. Accents and ç preserved.
- **Tone:** institutional but warm and direct — *"acolhimento e credibilidade acadêmica."* Confident, organized, never cold or bureaucratic.
- **Voice / person:** addresses the user directly and informally-formal (implicit *você*): **"Comece Agora"**, **"Registre sua presença"**, **"Faça Check-in"**, **"Limpar Filtros"**. Imperative verbs for actions.
- **Casing:** **Title Case** for headings and buttons (*"Controle de Ponto e Chamada"*, *"Como Funciona"*). Sentence case for body and helper text. UPPERCASE only for small eyebrow labels / stat captions / table headers (e.g. `REGISTROS`, `ESTUDANTES`, `DOUTORES`).
- **Headlines:** short, benefit-led, often split across two lines with the second line in magenta for emphasis (*"...para **Preceptores FAMINAS**"*).
- **Microcopy:** practical and reassuring — *"Dados protegidos com autenticação segura"*, *"Processo simples em 3 passos"*. Helper text under inputs, placeholders show real-format examples (*"email@hospital.com, usuário ou matrícula"*).
- **Numbers / stats:** featured prominently as large display numbers with an uppercase label beneath (83, 638, 41). Stats build institutional credibility.
- **Naming:** product sub-brands carry the SIGA prefix (*SIGA Preceptores*, *Sistema de Gestão Acadêmica*); always tie back to **FAMINAS** / **FAMINAS-BH**.
- **Emoji:** **avoid in polished UI.** They appear in some data-dense/legacy contexts and dev docs (📍📚🎓 in map popups, 📊🔍 in READMEs) but the institutional surfaces use **Lucide icons** instead. Do not introduce emoji into new interfaces.

---

## Visual Foundations

**Color.** A disciplined institutional palette anchored by three brand colors: **indigo `#2D2A6F`** (the wordmark, headings, primary brand surfaces), **magenta `#D00C64`** (accent — highlights, focus, energy, the header bottom-border, "novo" badges), and **light blue `#6097CA`** (secondary accent, info). A separate **medical blue `#1E40AF`** (`--primary`) is reserved for primary CTAs, *used sparingly*. Everything else is a cool, slightly blue-cast neutral gray. Backgrounds are near-white (`#F7F8FA`) or pure white; color is applied deliberately, never decoratively.

**Type.** Plus Jakarta Sans for display/headings (geometric, friendly, modern; weights 700–800, tight tracking `-0.02em`), Public Sans for body and UI (highly legible, accessible, weights 400–600). JetBrains Mono for matrículas / codes / IDs. Generous line-height (1.5 body, 1.65 lead) for academic readability.

**Spacing.** 4px base scale, **generous and organized** — section padding 32–48px, card padding 18–28px, comfortable gaps. Containers max ~1180–1400px, centered, 32px side padding.

**Backgrounds.** Clean and flat. Subtle brand gradients used only on heroes (`--gradient-faminas`, indigo→light) and card headers (light→magenta in the map product); a faint light-blue wash (`--gradient-subtle`) on landing backgrounds. **No** heavy gradients, no textures, no patterns, no full-bleed photography in the systems (imagery is the institution's own photos when used). The logo "X" mark is the only graphic motif.

**Cards.** White, `1px` border (`#D8DCE3`), radius **8–12px** (xl=12 on larger cards), **soft low-contrast shadow** (`--shadow-sm`/`md`). Some cards use a left accent border (`4px` magenta or primary) or a magenta top/bottom border on headers. Hover lifts cards subtly (`translateY(-1px)` + slightly stronger shadow).

**Borders & radius.** Discreetly rounded corners everywhere (canonical `--radius: 8px`; pills for badges/avatars). Borders are light gray and quiet; never heavy.

**Elevation.** Restrained — shadows are soft and diffuse, never harsh. Two brand-tinted shadows (`--shadow-faminas`, `--shadow-accent`) add depth to hero/primary elements only.

**Animation.** Subtle and functional. `transition: all .15s–.3s ease-in-out`; gentle hover lifts, marker scale `1.1` on hover, smooth expand/collapse on accordions and student cards. No bounces, no infinite loops, no flashy motion.

**States.** Hover = darker fill (primary → `--primary-hover`) or tinted background for ghost/outline; outline buttons shift border + text to primary on hover. Focus = `2px` ring in primary with `2px` offset (`box-shadow: 0 0 0 3px rgba(30,64,175,.15)`). Selected = primary ring + offset. Press is color-based, not scale-based (CTAs may scale `1.05` on the landing hero only).

**Transparency & blur.** Used sparingly — translucent white headers/footers with `backdrop-filter: blur(8px)` on landing pages; otherwise solid surfaces.

**Imagery vibe.** When photography is used it's the institution's own (warm, real, people-focused); the system itself ships no stock imagery. The dominant "image" is the indigo logo on white or its inverse on the indigo brand background.

**Accessibility.** High contrast (foreground `#373E4D` on white, headings `#2A303C`), 44px+ hit targets, visible focus rings, semantic color + icon/text pairing for status (never color alone).

---

## Iconography

- **Primary system: [Lucide](https://lucide.dev)** (`lucide-react` in code) — used across all three products. Outline style, **2px stroke**, rounded line caps, 16–24px typical. In these HTML assets Lucide is loaded from CDN and mounted via a small `Icon` component.
- **Common glyphs:** `stethoscope`, `graduation-cap`, `users`, `book-open`, `map-pin`, `calendar`, `clock`, `file-text`, `clipboard-check`, `bar-chart-3`, `search`, `bell`, `shield`, `log-out`, `chevron-right/down`, `check`, `info`, `alert-triangle`.
- **Icon containers:** icons frequently sit in a rounded square (`--radius-lg`) with a solid brand fill or the accent gradient, rendered white.
- **Emoji / unicode:** **not** part of the institutional icon language. They appear only in legacy data popups and developer docs — avoid in new UI; use Lucide instead.
- **Logo:** the FAMINAS wordmark + "X" mark. `assets/logo-faminas.png` (indigo, for light backgrounds) and `assets/logo-faminas-white.png` (for the indigo brand background). Never recolor the logo to other hues.

---

## Index / Manifest

**Foundations**
- `colors_and_type.css` — all design tokens: brand + semantic colors, neutrals, gradients, radii, elevation, spacing, type scale and semantic type roles (`.ds-h1`, `.ds-body`, `.ds-eyebrow`, …). Import this in every artifact.
- `README.md` — this file.
- `SKILL.md` — Agent-Skill front-matter so this system works as a downloadable Claude skill.

**Assets** (`assets/`)
- `logo-faminas.png` — primary logo (indigo, light backgrounds).
- `logo-faminas-white.png` — inverse logo (indigo/dark backgrounds).

**Preview cards** (`preview/`) — the specimens shown in the Design System tab: colors (brand, primary, neutrals, semantic, gradients), type (display, body, scale, eyebrow/mono), spacing (radii, shadows, spacing), components (buttons, badges, inputs, toggles, alerts, cards, tabs+breadcrumb, table), brand (logo, iconography).

**UI Kits** (`ui_kits/`) — interactive, high-fidelity product recreations (each self-contained: open its `index.html`):
- `siga-preceptores/` — landing → login → preceptor dashboard with interactive chamada. *(preceptor-point)*
- `portal-docentes/` — faculty statistics dashboard with search, filters and expandable rows. *(profs-faminas)*
- `mapa-estagios/` — Leaflet map of internship sites with filters and stats. *(discentes_faminas)*

---

*Built from FAMINAS's real products. To extend fidelity, clone the source repos linked above and lift exact component implementations.*
