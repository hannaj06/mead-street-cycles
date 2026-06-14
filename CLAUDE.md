# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server with hot reload (http://localhost:8080)
npm run build    # build to _site/
npm run deploy   # build, sync to S3, and invalidate CloudFront cache
```

There is no test suite. Linting runs automatically via pre-commit hooks (stylelint on CSS, Prettier on CSS/JS). To run manually:

```bash
npx stylelint src/styles/site.css --config src/stylelint.config.js
npx prettier --write src/styles/site.css src/scripts/site.js
```

## Architecture

This is an [Eleventy](https://11ty.dev) static site. Input is `src/`, output is `_site/`.

**Template hierarchy:**
- `src/_includes/layouts/base.njk` — root HTML shell (head, nav, footer)
- `src/_includes/layouts/home.njk` — extends base; contains the hardcoded bike image grid
- `src/_includes/layouts/bike.njk` — extends base; renders all bike detail content from frontmatter
- `src/_includes/layouts/about.njk`, `contact.njk` — extend base
- `src/_includes/partials/` — nav and footer fragments included by layouts

**Adding a new bike:**
Create `src/bikes/<slug>.njk` with only YAML frontmatter — no template body needed. The `layouts/bike.njk` layout handles all rendering. Available frontmatter fields:

```yaml
layout: layouts/bike.njk
title: "Bike Name"
year: 1990
make: Brand
model: Model Name
tags: [tag1, tag2]
hero: /images/bikes/<slug>.jpg
description: |          # rendered as markdown
  Text here.
specs:                  # key/value component list
  Tires: Brand 28mm
gallery:                # array of close-up image paths
  - /images/close_ups/<slug>/photo.jpg
blurb: |                # rendered as raw HTML
  <p>Story here.</p>
closing_image: /images/close_ups/<slug>/final.jpg
```

Then add the bike to the hardcoded grid in `src/_includes/layouts/home.njk` and add images under `src/images/bikes/` (hero) and `src/images/close_ups/<slug>/` (gallery). Images are passthrough-copied by Eleventy.

**Global site data** (`src/_data/site.json`): title, description, author, and Instagram URL — available in all templates as `{{ site.title }}` etc.

**Styles** (`src/styles/site.css`): Single file. CSS custom properties on `:root` control theming (colors, spacing, font sizes). BEM naming convention enforced by stylelint. No ID selectors allowed.

**JavaScript** (`src/scripts/site.js`): Single vanilla JS file. Currently only handles mobile nav toggle using `data-nav="wrapper"`, `data-nav-toggle`, and `data-nav-menu` attributes.
