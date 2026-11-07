# Professional Personal Portfolio — Rohiii Afridai (Emerald Luxury)

All the files of the portfolio website, in a normal project structure — ready to push to GitHub.

## Files

```
index.html                  The web page itself (content + structure)
css/style.css               All styling — Emerald Luxury light + dark theme
js/script.js                Mobile menu, scroll reveal, project toggles,
                            dark-mode toggle, contact-form validation
assets/images/portrait.jpg  Hero portrait photo
backup-single-file.html     The original one-file version (everything inline).
                            Keep it as a backup; you do NOT need it on GitHub Pages.
README.md                   This file
```

One small script is intentionally left inside `index.html` (in the `<head>`):
it reads the saved dark/light choice from localStorage (`portfolio-theme`)
before the page paints, so dark mode never flashes white. Everything else
lives in the separate files above.

Note: `index.html` loads fonts from Google Fonts, so it needs internet for
the exact fonts — everything else works offline.

## Run it locally

Open `index.html` in any browser. Keep the folders (`css`, `js`, `assets`)
next to it — the page loads its style, script, and photo from them.
Better: serve the folder, e.g. `python3 -m http.server` inside this folder,
then open http://localhost:8000

## Push to GitHub (upload via website — no git needed)

1. Go to github.com/rohail467 → **New repository**
   - For a personal site address, name it exactly: `rohail467.github.io`
2. Create the repository, then **uploading an existing file**
3. Upload ALL files and folders from this package, keeping the structure:
   `index.html`, `css/style.css`, `js/script.js`, `assets/images/portrait.jpg`
   (GitHub's web upload keeps folders if you drag the whole folder in.)
   You can skip `backup-single-file.html`.
4. Commit the files.
5. If the repo is named `rohail467.github.io`, the site goes live at
   https://rohail467.github.io automatically.
   For any other repo name: Settings → Pages → Source: **main** branch → Save.
   The site will be live at https://rohail467.github.io/<repo-name>

## Push with git (if you use a computer later)

```bash
git init
git add .
git commit -m "Emerald Luxury portfolio"
git branch -M main
git remote add origin https://github.com/rohail467/rohail467.github.io.git
git push -u origin main
```

## Editing

- Text, projects, links: edit `index.html` (search for the words you see on the page)
- `[University Name]` in `index.html` is the only placeholder — replace it with your university
- Colors: edit `css/style.css` — search for the hex codes
  (dark green `#142820`, forest `#244C3C`, emerald `#55B88A`, background `#F4F5F0`;
  dark mode values are under `[data-theme="dark"]`)
- Photo: replace `assets/images/portrait.jpg` with a new photo using the same file name
- Social image preview: after deploying, you can change the `og:image` in
  `index.html` to your full deployed photo URL for nicer link previews

## Contact form

Static site — no server. The form validates every field, then opens the
visitor's email app with the message pre-addressed to
studentuni725@gmail.com. It never shows a fake "sent" message.
