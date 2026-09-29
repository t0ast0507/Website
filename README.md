# Jason Cao — Personal Site

Live site: [https://jasoncao.com](https://jasoncao.com)

Static personal website for college applications. Dark, grayscale UI with full-color photographs, multiple pages, built to host on GitHub Pages. No framework and no build step.

## Pages

- `index.html` — home
- `engineering.html` — FRC and Conrad Challenge
- `research.html` — 2D semiconductors and independent paper
- `entrepreneurship.html` — scientific equipment business
- `hobbies.html` — photography, origami, Legos, swimming
- `honors.html` — awards
- `community.html` — community service
- `contact.html` — email and phone

Shared assets: `style.css`, `script.js`, `favicon.svg`, `images/`.

## GitHub Pages

The custom domain is `jasoncao.com` (`CNAME` in the repo root). In the repository settings, enable Pages from the `main` branch, root folder, and confirm the custom domain.

At your DNS provider, point the domain at GitHub Pages (apex `A` records to GitHub’s IPs, or `www` as a `CNAME` to `t0ast0507.github.io`).

## Preview locally

From this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 on your machine. That is only for local preview; the public site is [https://jasoncao.com](https://jasoncao.com).
