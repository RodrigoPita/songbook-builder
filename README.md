<h1 align="center">Songbook Builder 🎵</h1>

<div align="center">

[![NodeJS](https://img.shields.io/badge/node.js-22-gray?style=for-the-badge&colorA=5FA04E&logo=Node.js&logoColor=white)](https://nodejs.org/docs/latest-v22.x/api/index.html)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

**[🎹 Live Demo](https://rodrigopita.github.io/songbook-builder/)** | **[📖 Documentation](#-how-to-use)** | **[🐛 Report Bug](https://github.com/RodrigoPita/songbook-builder/issues)**

</div>

A simple web app to create, transpose, and export multi-page PDF songbooks from ChordPro charts.

---

## ✨ Features

* **🎼 Song Selection:** Build custom songbooks by selecting from your song library
* **🎹 Live Transposition:** Instantly transpose songs up or down to any key with visual feedback
* **📄 PDF Export:** Generate clean, printer-friendly PDFs with proper page breaks
* **🔍 Smart Search:** Quickly find songs by title or artist
* **🌐 Web-Based:** No installation required—runs entirely in your browser
* **💾 Local Storage:** Songs are loaded from ChordPro `.cho` files in your project
* **📱 Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices

---

## 🚀 How to Use

1.  **Visit the App:** Navigate to the [Songbook Builder live page](https://rodrigopita.github.io/songbook-builder/)
2.  **Browse Songs:** Click the sidebar icon (☰) to open the song index
3.  **Search & Select:** Use the search bar to find songs, then click to add them to your songbook
4.  **Transpose:** Use the `+` and `-` buttons to transpose each song. Click `×` to reset to original key
5.  **Export PDF:** Click "Export PDF" to print or save your custom songbook

---

## 🛠️ Tech Stack

* **React 18** - Modern UI library for building interactive interfaces
* **Vite** - Lightning-fast build tool and dev server
* **TailwindCSS** - Utility-first CSS framework for rapid styling
* **Lucide React** - Beautiful, consistent icon library
* **Custom ChordPro Parser** - In-house logic for parsing and transposing chord charts
* **Browser Print API** - Native PDF generation without external dependencies

---

## 💻 Running Locally

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/RodrigoPita/songbook-builder.git
    ```

2.  **Navigate to the directory:**
    ```bash
    cd songbook-builder
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the application:**
    Open the local URL shown in your terminal (usually `http://localhost:5173`) in your browser

---

## 📦 Adding Songs

Songs are stored as ChordPro (`.cho`) files in the `public/charts/` directory.

### 1. Create a ChordPro File

Create a new `.cho` file in `public/charts/` with this format:

```chordpro
{title: Song Title}
{artist: Artist Name}
{key: C}

[C]This is a [G]sample song
With [Am]chords and [F]lyrics
```

### 2. Update the Index

Add your song to `public/charts/index.json`:

```json
{
  "id": "song_title",
  "title": "Song Title",
  "artist": "Artist Name",
  "filename": "song_title.cho"
}
```

### 3. Reload the App

Refresh your browser to see the new song in the sidebar!

---

## 🚀 Deployment

### Deploying to GitHub Pages

The deployment process is already configured in `package.json` using the **gh-pages** package.

To deploy your latest build to GitHub Pages, simply run:

```bash
npm run deploy
```

This command will:

1. Build the project (`npm run build`)
2. Publish the contents of the `dist/` folder to the `gh-pages` branch of your repository

Once complete, your site will be live at:

```
https://rodrigopita.github.io/songbook-builder/
```

### ⚙️ GitHub Pages Settings

1. Go to **Settings → Pages** in your repository
2. Set **Source** to: `Deploy from branch`
3. Set **Branch** to: `gh-pages` / `(root)`
4. Save your changes

### 🔧 Note for Vite Projects

Make sure your `vite.config.js` has the correct `base` path for GitHub Pages:

```js
export default defineConfig({
  base: '/songbook-builder/',
  // ...
})
```

---

## 📁 Project Structure

```
songbook-builder/
├── public/
│   ├── index.json       # Song metadata
│   └── charts/          # Song files (.cho) and index.json
│       └── *.cho        # ChordPro song files
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utilities (transposition, parsing)
│   ├── constants/       # Music theory constants
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

---

## 🎵 ChordPro Format

This app supports standard ChordPro format with the following directives:

* `{title: Song Title}` - Song title
* `{artist: Artist Name}` - Artist name
* `{key: C}` - Original key (auto-detected if present)
* `{start_of_chorus}` / `{soc}` - Start of chorus
* `{end_of_chorus}` / `{eoc}` - End of chorus
* `[Chord]` - Chord notation
* `[Chord]lyrics` - Chord with lyrics

**Example:**
```chordpro
{title: Amazing Grace}
{artist: John Newton}
{key: G}

{start_of_chorus}
A[G]mazing [C]grace, how [G]sweet the sound
That [G]saved a [D]wretch like [G]me
{end_of_chorus}
```

---

<div align="center">

Made with ❤️ by [Rodrigo Pita](https://github.com/RodrigoPita)

**[⬆ back to top](#songbook-builder-)**

</div>
