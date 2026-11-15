---
paths:
  - src/bikes/**
  - src/_includes/layouts/home.njk
---

# Adding new bikes to the home grid

When adding a new bike, put its `<figure>` in the **second position** of the `image-grid` section in `src/_includes/layouts/home.njk`, directly after the first figure (Univega "Billy"). Newest bikes go first after Billy, so don't append to the end of the grid.

Use the same markup as the other tiles:

```html
<figure>
    <a href="/bikes/<slug>/index.html"><img src="/images/bikes/<slug>.jpg" alt="<Make Model>">
    <figcaption><Make Model></figcaption></a>
</figure>
```
