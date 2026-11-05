# Internship Finder

A responsive, accessible internship listing interface built with **semantic HTML, CSS, and vanilla JavaScript**—no frontend framework required.

## Features

- Responsive layouts for mobile, tablet, and desktop.
- Search by role, company, domain, location, work type, or skill.
- Filter listings by domain.
- Clear filters and helpful empty/error states.
- Semantic landmarks, explicit form labels, skip link, live result announcements, and visible keyboard focus.
- Internship cards are rendered from reusable JSON data using DOM methods and `textContent`.

## Run locally

Because the app loads `internships.json` with `fetch()`, open it through a local web server rather than double-clicking `index.html`.

### Option 1: Python

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

### Option 2: VS Code

Install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

## Project structure

```text
internship-board/
├── index.html
├── styles.css
├── app.js
├── internships.json
├── screenshots/
│   └── add-your-screenshot.png
└── README.md
```

## Accessibility checklist

- [x] Page uses `header`, `nav`, `main`, `section`, and `footer` landmarks.
- [x] A skip link moves keyboard users to the main content.
- [x] Every search/filter control has a visible associated label.
- [x] Keyboard focus is clearly visible.
- [x] Search result changes are announced through `aria-live`.
- [x] Cards use semantic headings and descriptive link labels.
- [x] Reduced-motion preferences are respected.

## Test the requirements

1. Search for `Python`; matching listings should remain.
2. Choose `Design` in the Domain filter.
3. Search for a term that does not exist; the empty state should appear.
4. Select **Clear filters**; all listings should return.
5. Use Tab and Shift+Tab to navigate the page and operate the form.
6. Resize the browser to mobile, tablet, and desktop widths.
7. To test the error state, temporarily rename `internships.json`, refresh, and confirm the helpful error message appears. Restore the filename afterward.

## Data note

The internship records are fictional sample data for a learning exercise. The “Express interest” links use a placeholder email address and are not real application endpoints. Replace them with verified application URLs or your own contact workflow before presenting this as a live job board.

## Add screenshots

After running the project, capture:
- `desktop.png` at a desktop width (for example, 1440 × 900).
- `mobile.png` at a mobile width (for example, 390 × 844).

Save them in `screenshots/` and add them here:

```md
## Screenshots

![Desktop preview](screenshots/desktop.png)
![Mobile preview](screenshots/mobile.png)
```

## Deploy and submit one proof link

1. Create a **public** GitHub repository named `internship-finder`.
2. Upload all project files and the screenshots folder.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then save.
6. Wait for GitHub Pages to publish. Your preview URL will look like:
   `https://YOUR-USERNAME.github.io/internship-finder/`
7. Add the deployed preview URL near the top of this README.
8. Submit the GitHub repository URL as your single proof link. The README will contain the preview URL and screenshots, so the reviewer can find everything from one place.

## What I learned

This project demonstrates semantic page structure, responsive CSS, reusable JSON-driven data, DOM rendering, search and filtering, empty/error handling, and accessible keyboard interactions.
