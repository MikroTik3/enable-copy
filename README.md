# Enable Copy

A Chrome extension that removes copy protection from any website — unlocks text selection, right-click menu, and clipboard access.

## Features

- **Enable Copy** — removes `oncopy`, `oncontextmenu`, `selectstart` blocks and intercepts event listeners that prevent selection
- **Infinity Mode** — keeps the bypass active permanently, even after page reloads
- **CSS unlock** — injects `user-select: text !important` on all elements
- Clean dark UI with live ON/OFF status indicator

## Project Structure

```
src/
├── popup/
│   └── popup.tsx          # Extension popup UI
├── contentScript/
│   └── contentScript.tsx  # Injected into every page
├── background/
│   └── background.ts      # Service worker
└── static/
    └── tailwind.css
manifest.json
tsconfig.json
webpack.config.js
```

## How It Works

| Component | Role |
|---|---|
| `popup.tsx` | UI with two toggles; sends messages to background |
| `background.ts` | Service worker; routes messages to the correct tab, handles Infinity Mode on page reload |
| `contentScript.tsx` | Injected at `document_start`; intercepts events, patches `addEventListener`, injects CSS |

### Enable Copy (per-tab)

Toggles copy unlock for the currently active tab only. State resets on page reload.

### Infinity Mode (persistent)

Saved to `chrome.storage.local`. The content script reads this on every page load and auto-activates the bypass — no manual toggle needed.

## Installation

### Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev
```

Then in Chrome:
1. Go to `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `dist/` folder

### Production

```bash
npm run build
```

Zip the `dist/` folder and upload to the Chrome Web Store.

## Permissions

| Permission | Why |
|---|---|
| `activeTab` | Access the current tab to inject scripts |
| `scripting` | Programmatically inject content scripts |
| `storage` | Save Infinity Mode state across sessions |
| `tabs` | Detect tab updates for Infinity Mode |
| `<all_urls>` | Work on any website |

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Webpack 5
- Manifest V3