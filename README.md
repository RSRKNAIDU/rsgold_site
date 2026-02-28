# RS GOLD Website - Basic Handling Guide

This project is a **Jekyll-based static website** for RS GOLD.

## 1. Project Structure (Important Files)

- `_layouts/` -> page structure
- `_includes/` -> reusable sections (hero, contact, live rates, locations, footer, etc.)
- `_data/` -> all editable business content in YAML format
- `assets/css/main.css` -> main design/style file
- `assets/js/live-rates.js` -> real-time gold/silver rate logic
- `_config.yml` -> site-level settings

## 2. Where To Edit Business Content

- Brand/contact/services/content:
  - `_data/home.yaml`
- Hero slider text:
  - `_data/hero.yaml`
- About points:
  - `_data/about.yaml`
- FAQ:
  - `_data/faq.yaml`
- Testimonials:
  - `_data/testimonials.yaml`
- Top menu items:
  - `_data/navigation.yaml`

## 3. Live Gold Rate Section

- Section file: `_includes/live-rates.html`
- Script file: `assets/js/live-rates.js`
- Current behavior:
  - Fetches live gold (`XAU`) and silver (`XAG`) in USD
  - Converts to INR using USD->INR forex rate
  - Shows per-gram values for Gold 24K, 22K, 18K and Silver

If API is down, it shows "Unavailable".

## 4. Store Locations (Google Maps)

- Section file: `_includes/locations.html`
- Data source: `_data/home.yaml` -> `locations.items`

To update/add a branch, edit:
- `name`
- `full_address`
- `map_link`
- `embed_query` (latitude,longitude)

## 5. WhatsApp Integration

- Floating button include: `_includes/whatsapp-float.html`
- Number/message settings:
  - `_data/home.yaml` -> `whatsapp.number`, `whatsapp.text`

Use number format without `+` (example: `919885975975`).

## 6. Logo Update

Logo path is controlled in:
- `_data/home.yaml` -> `brand.logo`

Steps:
1. Put logo file in `assets/img/`
2. Update `brand.logo` path (example: `/assets/img/your-logo.png`)

Header and footer will update automatically.

## 7. Run Locally

From project root:

```powershell
bundle install
bundle exec jekyll serve
```

Open:
- `http://127.0.0.1:4000/rsgold_site/` (if `baseurl: "/rsgold_site"` in `_config.yml`)

## 8. Common Safe Workflow

1. Edit YAML content in `_data/`
2. Check spacing/indentation (YAML is indentation-sensitive)
3. Run local server
4. Verify on mobile + desktop
5. Commit changes

## 9. Quick Troubleshooting

- Site not loading section:
  - Check YAML indentation and colons in `_data/*.yaml`
- Styles not applying:
  - Confirm changes are in `assets/css/main.css`
- Live rates show unavailable:
  - API may be blocked/unreachable temporarily
- Map not showing:
  - Verify `embed_query` has valid `lat,long`

## 10. Recommendation Before Every Update

- Keep a backup commit before major changes.
- Update only one area at a time (content -> style -> scripts) for easy rollback.
