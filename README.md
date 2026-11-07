# Ziki Issues — Whimsical Clockwork Prototype

A playful, interactive prototype of the [ziki.dev](https://ziki.dev/) website built for the **HNG15 Individual Task** ("Create a whimsical design for Ziki").

Built with faithful adherence to Ziki's live layout, typography, and color palette, layered with a **"Whimsical Assembly Line" (Clockwork Toy Factory)** creative theme.

---

## 🌟 Whimsical Features

1. **Factory Swarm Speed Controller:** An interactive slider in the hero that dials the agent swarm from 10 to 1,000 agents, dynamically accelerating the gears, conveyor belt, and live issue counters.
2. **Infinite Issue Conveyor Belt:** Crate packages with real issue tags (`#412`, `#413`, etc.) roll smoothly across the factory floor.
3. **Mechanical "Stamp of Approval" Piston:** Clicking "Approve" triggers a descending robotic piston that slams a green `✓ APPROVED` ink stamp onto the task with comic squash-and-stretch.
4. **Bouncing Clockwork Mascot Bot:** An animated SVG robot with a rotating brass winding key that jumps joyfully when tasks are approved or upvoted.
5. **Interactive "+ Add Task" Feeder:** Add custom ideas in real-time; watch them immediately enter the active board and roll onto the conveyor belt.
6. **Tactile Coin Dispenser:** Hovering or clicking the *"Earn with your agent"* card drops an animated 3D brass coin and increments real-time earnings.
7. **Jelly Buttons & Particle Bursts:** Primary CTAs exhibit an elastic spring bounce and emit whimsical mechanical cogs and sparkles on click.
8. **Dark Mode & A11y First:** Full light/dark mode toggle with local storage persistence and full `@media (prefers-reduced-motion: reduce)` compliance.

---

## 📁 Project Structure

```
ziki-whimsical/
├── index.html              # Faithful Ziki structure + semantic whimsical hooks
├── styles/
│   ├── base.css            # Fonts, design tokens, resets, light/dark themes, reduced-motion
│   ├── layout.css          # Island hero, paths grid, FAQ accordions, footer
│   ├── board.css           # Live interactive task board simulation
│   └── whimsical.css       # Gears, conveyor belt, mechanical stamp, coin drop, jumping bot
├── scripts/
│   ├── main.js             # Init, theme toggle, mobile drawer, FAQ accordion
│   ├── assembly-line.js    # Conveyor belt animation & factory speed slider
│   ├── stamp-machine.js    # Mechanical approval stamp & particle burst
│   └── cards-delight.js    # Tab switching, "+ Add task" modal, coin dispenser
├── assets/
│   ├── ziki-mark.svg       # Official geometric brand mark
│   └── hero-sea.webp       # Hero ocean background image
├── vercel.json             # Static deploy configuration
├── README.md               # Local run & deploy documentation
└── DESIGN_NOTES.md         # Concept rationale, effects breakdown & accessibility
```

---

## 🚀 How to Run Locally

Because this prototype is written in clean, dependency-free modern web standards (HTML5 + CSS3 + Modular ES6 JS), you do not need to install heavy npm packages.

### Option A: Using Node.js (Quick Server)
In your terminal, navigate to the project directory and run:

```bash
# Using npx serve
npx serve .

# Or using http-server
npx http-server -p 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option B: Using Python
```bash
# Python 3
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option C: VS Code / IDE Live Server
Right-click `index.html` and choose **"Open with Live Server"**.

---

## 🌐 How to Deploy to Vercel or Render

### Deploying to Vercel (Recommended — 30 seconds)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: Ziki whimsical clockwork prototype"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Leave all build settings at their defaults (Framework Preset: **Other**, Build Command: empty, Output Directory: `./`).
5. Click **"Deploy"**. The site will be live instantly!

*(Alternatively, run `npx vercel` directly from the directory if you have the Vercel CLI).*

### Deploying to Render
1. Push your code to GitHub.
2. Go to [dashboard.render.com](https://dashboard.render.com) and click **"New +" → "Static Site"**.
3. Connect your repository.
4. Set:
   * **Build Command:** *(leave blank)*
   * **Publish Directory:** `.`
5. Click **"Create Static Site"**.
