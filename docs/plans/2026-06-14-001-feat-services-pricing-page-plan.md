---
title: "feat: Add services/pricing page"
date: 2026-06-14
status: active
type: feat
---

# feat: Add Services / Pricing Page

**Summary:** Add a new `/services/` page to the Mead Street Cycles site displaying a clean, Courier-font price list with dot leaders between service names and prices, across two sections (Standard Services and Optimizations), plus a full-rebuild callout. Add "Services" to the top nav.

---

## Problem Frame

The site currently has no way for visitors to see what services and prices Mead Street Cycles offers. This page fills that gap with a clean, minimal design consistent with the existing Courier/monospace aesthetic already used across bike detail pages and the About blurb.

---

## Requirements

- Courier New monospace font throughout the page
- Dot leaders (`......`) between each service name and its price, with prices right-aligned in a consistent column
- Two labeled sections: standard services and optimizations
- A distinct full-rebuild callout at the bottom with the two-week lead time note
- "Services" link added to the top nav, active-state styled consistently with existing nav links

---

## Key Technical Decisions

- **Dot leader technique:** Use a CSS flexbox row with a middle `<span>` filler that has `border-bottom: 1px dotted` and `flex: 1`. This is purely CSS-driven, renders reliably in all browsers, and keeps the HTML clean — no hardcoded dot strings in markup.
- **Layout approach:** New `layouts/services.njk` that extends `layouts/base.njk`, following the same pattern as `layouts/about.njk` and `layouts/contact.njk`. Service data hardcoded in the layout (not frontmatter), since the content is static and not driven by a data file.
- **No new layout file needed:** Given the page content is entirely self-contained (no template-driven data), the layout can be as minimal as `layouts/contact.njk` — just a wrapper section. The actual service rows live in the layout itself rather than in a separate Nunjucks data loop, keeping the structure readable.
- **CSS placement:** New `.services` BEM block appended to the end of `src/styles/site.css`, following the existing pattern. No new file.

---

## Implementation Units

### U1. Services layout

**Goal:** Create the Nunjucks layout that renders the two-section price list.

**Dependencies:** None (extends existing `layouts/base.njk`)

**Files:**
- `src/_includes/layouts/services.njk` *(create)*

**Approach:** Extend `layouts/base.njk`. Inside, render a `<section class="services">` with:
- An `<h1>` from the page frontmatter `title`
- A `<div class="services__section">` for "Standard Services" with each row as:
  ```html
  <div class="services__item">
    <span class="services__name">Bike wash/clean</span>
    <span class="services__dots" aria-hidden="true"></span>
    <span class="services__price">$10</span>
  </div>
  ```
  Items with a parenthetical note (e.g. "done by default", "pair") render the note as a `<span class="services__note">` below or inline in smaller type.
- A `<div class="services__section">` for "Optimizations" with the same row structure
- A `<div class="services__rebuild">` callout for the full bike rebuild line and the two-week note

All service data is hardcoded in this layout (not frontmatter-driven), because the list is static and there is no existing data-looping pattern for this kind of content.

**Test expectation:** none — this is a template/markup unit with no behavioral logic

**Verification:** Running `npm run dev` and visiting `/services/` shows both sections with readable dot-leader rows

---

### U2. Services page entry point

**Goal:** Create the Eleventy page file that triggers the layout and sets the page title / nav active state.

**Dependencies:** U1

**Files:**
- `src/services.njk` *(create)*

**Approach:** Minimal frontmatter-only file, identical in structure to `src/about.njk` and `src/contact.njk`:

```yaml
---
layout: layouts/services.njk
title: "Services"
---
```

No template body needed — the layout handles all rendering.

**Test expectation:** none — scaffolding only

**Verification:** `npm run build` produces `_site/services/index.html`

---

### U3. Services CSS

**Goal:** Style the services price list with Courier font, dot leaders, and section headings consistent with site aesthetics.

**Dependencies:** None (additive to existing stylesheet)

**Files:**
- `src/styles/site.css` *(modify — append new `.services` block)*

**Approach:** Append a new BEM block. Key rules:

- `.services` — page wrapper, max-width and centered like `.about`, Courier font set at the block level
- `.services__section` — groups one price-list section; `margin-bottom` for breathing room
- `.services__section-title` — section heading (`h2`) styled in Lora serif matching `.bike h2` / existing heading convention, or kept in Courier at a slightly larger size — whichever fits the minimalist direction. Use the green heading color (`--bike-heading-color`) for consistency.
- `.services__item` — `display: flex; align-items: baseline` row; `padding: 0.3rem 0` for vertical rhythm
- `.services__name` — `flex: none`; no wrapping
- `.services__dots` — `flex: 1; border-bottom: 1px dotted currentColor; margin: 0 0.5rem; position: relative; top: -0.2em` — the dot leader filler
- `.services__price` — `flex: none; white-space: nowrap`
- `.services__note` — subdued color (`--bike-meta-color`), smaller font size, displayed as `block` under the service name or `inline` after it — whichever reads more clearly at implementation time
- `.services__rebuild` — distinct callout area; light background (`var(--bike-accent-color)`), border, padding, border-radius; matches the `.bike .specs` card aesthetic
- `.services__rebuild-note` — italic or muted small-print for the two-week lead time

Mobile (`width <= 768px`): ensure service name doesn't overflow — allow wrapping on `.services__name` at narrow widths, and the dots filler still fills correctly via flex.

Stylelint BEM convention already enforced by pre-commit hook — no ID selectors, class names only.

**Test scenarios:**
- Dot leaders span the full gap between name and price at a wide viewport (e.g. 1200px)
- At 375px mobile, no text overflows the viewport; rows remain readable
- Price column stays right-aligned across rows of differing name lengths

**Verification:** Dev server shows vertically aligned prices and no horizontal overflow on mobile

---

### U4. Add Services to nav

**Goal:** Add "Services" link to the top nav with consistent active-state behavior.

**Dependencies:** U2 (page URL must exist for active state to work)

**Files:**
- `src/_includes/partials/nav.njk` *(modify)*

**Approach:** Add a new `<li>` to the existing `<ul>` in `nav.njk`, following the exact same active-state pattern as the existing About and Contact links:

```html
<li><a href="/services/index.html" {% if page.url == "/services/" %}class="nav-active" aria-current="page"{% endif %}>Services</a></li>
```

Insert it between About and Contact, or after Contact — the user hasn't specified order. Between About and Contact is a natural flow (learn about → see services → contact).

**Test scenarios:**
- Visiting `/services/` shows the "Services" nav link with the active class (dark green pill background) and `aria-current="page"`
- Visiting any other page shows "Services" as a plain link without active styles
- Mobile menu includes "Services" and toggles correctly with the hamburger

**Verification:** All four nav items render correctly at desktop and mobile widths

---

## Scope Boundaries

### In scope
- Static services pricing page at `/services/`
- Dot-leader CSS price list with two sections + rebuild callout
- Nav link addition

### Deferred to Follow-Up Work
- Data-driven service list (e.g. `src/_data/services.json`) — unnecessary until the list changes frequently
- Online booking or scheduling integration
- Printable/PDF version of the price list

---

## Sources & Research

- Existing nav pattern: `src/_includes/partials/nav.njk`
- Existing layout pattern: `src/_includes/layouts/about.njk`, `src/_includes/layouts/contact.njk`
- Existing Courier font usage: `.bike .title`, `.bike .specs`, `.about-blurb` in `src/styles/site.css`
- CSS dot-leader technique: flex row with `border-bottom: dotted` filler span — established CSS pattern, no external dependencies
