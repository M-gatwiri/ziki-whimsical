# DESIGN_NOTES.md — Ziki Whimsical Prototype

## 1. Concept: "The Whimsical Assembly Line" (Clockwork Toy Factory)
* **Core Metaphor:** Ziki's proposition is *"Go on holiday while 1000 agents build and market your product."* This prototype reimagines Ziki as a cheerful, retro-futuristic clockwork automaton workshop. 
* **User Narrative:** As the human product lead, you're kicking back enjoying the sunny ocean breeze, while an autonomous clockwork swarm of tiny robotic agents busily turns raw feature ideas into production-ready software through an interactive assembly line.
* **Why this fits Ziki:** Ziki is not an ethereal black box—it is an attributable, permissioned collaboration platform where every pull request is verified before merge. The clockwork toy factory emphasizes both **rigorous verification** (via mechanical stamps) and **effortless automation** (via the conveyor belt and agent swarm controller).

---

## 2. Whimsical Effects Breakdown & Rationale

| Effect | Implementation | Purpose & Fit for Ziki.dev |
| :--- | :--- | :--- |
| **1. The Factory Swarm Speed Controller** | Tactile range slider modifying CSS variables (`--gear-speed`, `--conveyor-speed`, `--agent-count`) | Gives the user physical agency over the headline *"1000 agents"*. Sliding from 10 to 1,000 accelerates the conveyor, spins the gears faster, and dynamically scales working agent counts in real time. |
| **2. Continuous Rolling Conveyor Belt** | Infinite CSS keyframe translation with dual roller texture buffers | Displays live issue packages (`#412`, `#413`, `#414`, `#415`) rolling smoothly into the review pipeline, making the background feel alive without distracting from copy. |
| **3. Mechanical "Stamp of Approval" Piston** | Descending mechanical piston arm (`.stamp-piston-arm.slamming`) + stamped ink badge (`✓ APPROVED`) | Satisfies the requirement that *"a manager accepts before anything merges"*. Clicking "Approve" triggers an impactful stamp slam, particle sparks, and transforms the row. |
| **4. Tactile Upvote & Score Springs** | CSS transform spring + mechanical particle bursts (`⚙️`, `✨`, `⚡`) | Replaces dry upvoting with a bouncy micro-interaction that rewards user participation. |
| **5. Jumping Clockwork Bot Mascot** | Scalable vector bot with winding key rotation + jump spring on action | Personifies the autonomous AI agents as cheerful, helpful companions rather than faceless bots. Jumps joyfully when approvals happen. |
| **6. Tactile Coin Dispenser on "Earn"** | 3D-styled brass coin drop animation (`@keyframes dropCoin`) + dynamic balance counter | Turns the *"Earn with your agent"* card into a delightful arcade slot that pays out virtual tokens on hover/click. |
| **7. Dynamic "+ Add Task" Assembly Feeder** | Modal form injecting real-time tasks to both the table and the live conveyor belt | Bridges the gap between static prototype and interactive playground. |

---

## 3. Three.js / WebGL Evaluation & Fallback Strategy
* **Decision:** We achieved all 3D depth, meshing gears, and mechanical movements using **pure hardware-accelerated CSS3 transforms (`transform-origin`, `perspective`, `translateZ`) and SVG paths**.
* **Rationale:**
  1. **Zero Bundle Overhead:** Avoided adding a ~600KB Three.js dependency for a task that requires instant initial load times on mobile.
  2. **100% Reliable Graceful Degradation:** Three.js canvases often crash on older mobile devices or when WebGL contexts are lost in background tabs. CSS/SVG is natively rendered by the browser compositor thread at 60fps.
  3. **Low Battery & Thermal Footprint:** Ideal for users visiting on laptops or smartphones while traveling ("on holiday").
* **Fallback Contract:** If a full 3D WebGL hero scene is added in a future iteration, the current SVG gear assembly and CSS conveyor container serve as the seamless zero-delay fallback using `window.WebGLRenderingContext` detection.

---

## 4. Performance, Motion & Accessibility (A11y)
* **60fps Guaranteed:** Only `transform` and `opacity` properties are animated; zero layout thrashing or geometry recalculations during animation loops.
* **`prefers-reduced-motion: reduce` Support:** A comprehensive media query disables continuous rotation, stops conveyor translation, and replaces spring bounces with instant state changes for users with vestibular sensitivities.
* **Full Keyboard & Screen Reader Accessibility:**
  * Focusable elements have distinct `:focus-visible` rings (`outline: 2px solid var(--blue)`).
  * Tab navigation follows standard WAI-ARIA `role="tablist"` and `role="tab"` patterns.
  * Skip-to-content link provided at the top of the DOM.
  * Color contrast matches WCAG AA standards in both light and dark themes.

---

## 5. Browser & Device Support
* **Mobile First:** Tested across 360px mobile viewports up to 4K ultra-wide screens.
* **Browsers:** Compatible with Chrome/Chromium 90+, Safari 14.1+, Firefox 88+, and Edge 90+.
* **Dark Mode:** Supported with auto-detection and persistent toggle stored in `localStorage`.
