<h1 align="center">Songbook Builder 🎵</h1>

<div align="center">

[![NodeJS](https://img.shields.io/badge/node.js-22-gray?style=for-the-badge&colorA=5FA04E&logo=Node.js&logoColor=white)](https://nodejs.org/docs/latest-v22.x/api/index.html)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

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

### **Prerequisites**

* [Node.js](https://nodejs.org/) (v18 or higher)
* npm or yarn
* Firebase account (free tier works!)

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RodrigoPita/songbook-builder.git
   cd songbook-builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

   > 💡 **Tip:** Copy `.env.example` and fill in your Firebase credentials

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:5173
   ```

---

## 🔥 Firebase Setup

### **1. Create Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Follow the setup wizard

### **2. Enable Firestore Database**

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Production mode**
4. Select location: `southamerica-east1` (São Paulo)

**Set Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /songs/{songId} {
      allow read: if true;  // Public read
      allow write: if false; // Only admins can write
    }
  }
}
```

### **3. Enable Storage**

1. In Firebase Console, go to **Storage**
2. Click **Get started**
3. Choose **Production mode**
4. Select location: `southamerica-east1`

**Set Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /charts/{filename} {
      allow read: if true;  // Public read
      allow write: if false; // Only admins can write
    }
    match /index.json {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

### **4. Configure CORS (if needed)**

Create `cors.json`:
```json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
```

Apply CORS:
```bash
gsutil cors set cors.json gs://your-project.appspot.com
```

### **5. Get Admin SDK Credentials**

For running sync scripts locally:

1. Firebase Console → Project Settings → Service Accounts
2. Click **Generate new private key**
3. Save as `serviceAccountKey.json` in project root
4. ⚠️ **Important:** This file is in `.gitignore` - never commit it!

---

## 📦 Adding Songs

### **Method 1: Local Files (Recommended)**

1. **Create a ChordPro file** in `public/charts/`:

   ```chordpro
   {title: Amazing Grace}
   {artist: John Newton}
   {tags: hymn, classic}

   A[G]mazing [C]grace, how [G]sweet the sound
   That [G]saved a [D]wretch like [G]me
   ```

2. **Sync to Firebase:**
   ```bash
   npm run sync
   ```

3. **Done!** Song appears instantly in the app.

### **Method 2: Firebase Console**

1. Upload `.cho` file to **Storage → charts/**
2. Make it public
3. Run sync to update Firestore:
   ```bash
   npm run sync
   ```

---

## 🎵 ChordPro Format

This app supports standard ChordPro format:

### **Supported Directives:**

* `{title: Song Title}` - Song title
* `{artist: Artist Name}` - Artist name
* `{tags: tag1, tag2}` - Tags for search
* `{key: C}` - Original key (auto-detected)
* `{start_of_chorus}` / `{soc}` - Start of chorus
* `{end_of_chorus}` / `{eoc}` - End of chorus

### **Chord Notation:**

```chordpro
[C]Chord above lyric
[Am7]More [G/B]complex [Csus4]chords
[(G/B][A)] - Chords in parentheses
```

### **Example Song:**

```chordpro
{title: Amazing Grace}
{artist: John Newton}
{key: G}
{tags: hymn, classic, worship}

{start_of_chorus}
A[G]mazing [C]grace, how [G]sweet the sound
That [G]saved a [D]wretch like [G]me
{end_of_chorus}

I [G]once was [C]lost, but [G]now am [Em]found
Was [G]blind, but [D]now I [G]see
```

---

## 🛠️ Available Scripts

### **Development**

```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build locally
```

### **Firebase Management**

```bash
npm run sync       # Sync songs (local ↔ Firebase, bidirectional)
npm run migrate    # One-time migration (if needed)
```

### **Deployment**

```bash
npm run deploy     # Build and deploy to GitHub Pages
```

---

## 🚀 Deployment

### **Deploy to GitHub Pages**

1. **Configure GitHub Secrets:**
   
   Go to: `Settings → Secrets and variables → Actions`
   
   Add these secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

2. **Deploy:**
   ```bash
   npm run deploy
   ```

3. **Access:**
   ```
   https://yourusername.github.io/songbook-builder/
   ```

### **Automatic Deployment (GitHub Actions)**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      env:
        VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
        VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
        VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
        VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
        VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
        VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
      run: npm run build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

Now every push to `main` automatically deploys! 🎉

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

## 💰 Cost & Performance

### **Firebase Free Tier Limits**

With **300 songs** and **1,000 users/month**:

| Service | Usage | Free Limit | Status |
|---------|-------|------------|--------|
| **Firestore Reads** | ~30k/month | 50k/day | ✅ Free |
| **Firestore Storage** | ~150 KB | 1 GB | ✅ Free |
| **Storage Files** | ~1.5 MB | 5 GB | ✅ Free |
| **Storage Downloads** | ~100 MB/month | 1 GB/day | ✅ Free |

**You'd only pay if you exceed 50,000+ users/month** 💰

---

## 🐛 Troubleshooting

### **"ERR_BLOCKED_BY_CLIENT" in console**

- Caused by browser extensions (AdBlock, etc.)
- Test in incognito/private mode
- Won't occur in production

### **Songs not loading**

1. Check Firebase Console → Firestore (should have documents)
2. Check Firebase Console → Storage (should have `.cho` files)
3. Verify `.env.local` or GitHub Secrets are correct
4. Check browser console for errors

### **Transposition not working**

- Ensure `{key: X}` directive is present in `.cho` file
- Run `npm run sync` to update metadata

### **Build fails**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
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

---

<div align="center">

Made with ❤️ by [Rodrigo Pita](https://github.com/RodrigoPita)

**[⬆ back to top](#songbook-builder-)**

</div>
