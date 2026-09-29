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
- `community.html` — community service, including NC State CUSA Scarlet Night
- `contact.html` — email and phone

Shared assets: `style.css`, `script.js`, `favicon.svg`, `images/`.

## GitHub Pages

This repo deploys with the GitHub Actions workflow in `.github/workflows/pages.yml`. In the repository **Settings → Pages**, set the source to **GitHub Actions** and add the custom domain `jasoncao.com`.

The custom domain file is `CNAME` in the repo root.

At your DNS provider (this cannot be done from the repo):

1. Apex `jasoncao.com` — `A` records to GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and the matching `AAAA` records if you want IPv6).
2. `www.jasoncao.com` — `CNAME` to `t0ast0507.github.io`.

Until DNS is set, GitHub will still serve the site at the Pages URL after the first successful workflow.

## Preview locally

From this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 on your machine. That is only for local preview; the public site is [https://jasoncao.com](https://jasoncao.com).
