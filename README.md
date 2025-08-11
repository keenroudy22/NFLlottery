
# NFL 8-Player Snake Draft (2 AFC, 2 NFC)

A tiny static site for running an 8-player, 4-round snake draft where each player gets exactly 2 AFC and 2 NFC teams. Includes:
- **Manual picking**: click teams in the current conference pool when it's your turn
- **Auto / random picks**: use "Auto-pick speed" or the "Next Pick" button
- **Logos** via ESPN CDN (or drop your own in `/logos` and switch the `LOGO_URL` line)
- **Copy Image / Download PNG** of the draft boards (auto-falls back without logos if CORS blocks export)
- **Custom player names via URL**: `?players=Kinnon,Brittany,Alex,Sam,Luke,Ava,Max,Rae`

## Quick Start (GitHub Pages)
1. Create a new repo and upload these files to the repo root.
2. GitHub → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` (root) → **Save**.
3. Open the site. Optional: add `?players=...` to prefill names.

## Manual Drafting
- Set **Auto-pick speed** to **Manual (Next Pick)**.
- Click a team in the conference shown under **Conference: AFC/NFC**.

## Exporting Images
- Click **Copy Image** to copy the boards to your clipboard.
- If clipboard isn't supported, it will download a PNG instead.
- If export says logos are hidden due to CORS, you can avoid that by putting logo PNGs in `/logos` and changing:
  ```js
  // in script.js
  // from
  const LOGO_URL = (abbr) => `https://a.espncdn.com/i/teamlogos/nfl/500/${abbr}.png`;
  // to
  const LOGO_URL = (abbr) => `./logos/${abbr}.png`;
  ```

## Logos folder
Put 32 PNGs in `/logos` named by these codes:
```
buf mia ne nyj bal cin cle pit hou ind jax ten kc lv lac den
dal nyg phi wsh det min gb chi tb atl car no sf sea lar ari
```
