# Bhargav Limbasia – Portfolio

A visually stunning, interactive portfolio showcasing Applied Data Science, Medical AI, DNN Optimization, Vision Transformers, and cutting-edge ML projects.

## ✨ Features

- **Modern Tech Stack**: Vite + React + TypeScript + TailwindCSS + Framer Motion
- **Custom Cursor Effects**: Interactive cursor follower with hover animations
- **Smooth Animations**: Scroll-triggered animations, page transitions, reduced motion support
- **3D Particle Background**: Three.js particle field (auto-disabled if `prefers-reduced-motion`)
- **Section Navigation**: Floating dropdown menu for quick section access
- **Dark/Light Theme**: Fully functional theme toggle with dynamic backgrounds
- **Glassmorphism UI**: Modern glass-effect cards and components
- **Responsive Design**: Mobile-first, works beautifully on all devices
- **Enthusiast Contact Section**: Unique, personality-driven design
- **Zero-Config Deploy**: Ready for GitHub Pages, Netlify, Vercel, Firebase, and more

## Getting Started
```pwsh
# From repository root
cd portfolio-site
npm install
npm run dev
```
Visit http://localhost:5173

## Build
```pwsh
npm run build
npm run preview
```

## Free Hosting Options & Steps

### 1. GitHub Pages
1. Create a GitHub repo (e.g., `bhargav-portfolio`).
2. Commit all files & push.
3. Add GitHub Action (already included suggestion below) to build and deploy `dist` to Pages.
4. In repo Settings > Pages, select GitHub Actions as source.
5. Access site at `https://<username>.github.io/<repo>/`.

### 2. Netlify
1. Sign up at https://netlify.com
2. New Site from Git > pick repo.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Set site name or custom domain. Instant previews + deploys.

### 3. Vercel
1. Add project via Import Git. Framework auto-detected.
2. Build: `npm run build`. Output: `dist`.
3. Get global edge deployment & analytics.

### 4. Cloudflare Pages
1. Create Pages project; connect GitHub.
2. Build command: `npm run build` Output directory: `dist`.
3. Automatic deployment to `<project>.pages.dev`.

### 5. Firebase Hosting (Free Tier)
1. Install CLI: `npm install -g firebase-tools`.
2. `firebase login` then `firebase init hosting`.
3. Use existing project or create one; set public directory to `dist`.
4. After build: `firebase deploy`.

### 6. Render Static Site
1. Create new Static Site from Git.
2. Build command: `npm run build`; Publish directory: `dist`.
3. Free tier redeploys on push.

### 7. Azure Static Web Apps (Free Tier)
1. Create GitHub repo with code.
2. In Azure Portal: Create Static Web App (Free). Link GitHub repo & branch.
3. Set build presets: Custom. App location: `/` Output: `dist`.
4. Azure generates workflow; pushes deploy after each commit.

## GitHub Pages Workflow Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy Portfolio
on:
  push:
    branches: [ main ]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

## Performance & Accessibility Notes
- Particle background can be heavy: automatically removed if user prefers reduced motion.
- All interactive elements have accessible labels.
- Semantic sections used (`header`, `main`, `footer`, `section`).

## Future Enhancements
- MDX blog section
- SEO microdata / OpenGraph
- Project detail pages with dynamic routes
- Simple analytics (privacy-friendly) toggle

## License
Personal portfolio – all rights reserved unless otherwise noted.
