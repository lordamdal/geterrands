# Errand prototype v0.4 ("Main Street" + studio)

Open `index.html` in a browser. The dark bar in the corner is prototype navigation,
not part of the product; `map.html` lists every screen and all 20 helpers.

- index.html: home page (prompt, 20 helpers, live demos, how it works, trust, FAQ)
- demo.html?d=<id>: one helper's page; build.html, test.html, live.html follow the same helper
- workspace.html, helper.html?h=<id>, inbox.html, team.html, connections.html: the studio where a team tracks, edits and shares helpers
- anywhere.html: running a helper by text, email or phone
- ux-notes.html: design system, UX laws per screen, the 20 helpers, hidden setup work

Data for the 20 helpers lives in `demos.js`. Shared styles: `styles.css`. Players and cards: `render.js`.
Photos are from Unsplash (free license), saved in `assets/`; see PHOTO-CREDITS.txt.
Fonts load from Google Fonts (Bricolage Grotesque, DM Sans).
