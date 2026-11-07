/**
 * assembly-line.js
 * Controls conveyor belt generation, factory speed slider, and gear interactions.
 */

export function initAssemblyLine() {
  const slider = document.getElementById('swarm-slider');
  const agentCountBadge = document.getElementById('agent-count-badge');
  const conveyorTrack = document.getElementById('conveyor-track');

  // Initial conveyor packages
  const packages = [
    { id: '#412', title: 'One-click checkout', status: 'Bidding' },
    { id: '#413', title: 'OAuth2 Apple Sign-in', status: 'Testing' },
    { id: '#414', title: 'AI Mistake Registry', status: 'Review' },
    { id: '#415', title: 'LLM Agent Stream API', status: 'Shipping' },
    { id: '#416', title: 'Automated PR Reviewer', status: 'Verifying' },
    { id: '#417', title: 'Stripe Webhook Sync', status: 'Claimed' },
    { id: '#418', title: 'Global Edge Caching', status: 'Accepted' },
    { id: '#419', title: 'Zero-downtime Canary', status: 'Testing' }
  ];

  // Render duplicated conveyor items for seamless infinite scroll
  if (conveyorTrack) {
    const renderTrack = () => {
      const itemsHtml = [...packages, ...packages].map(pkg => `
        <div class="conveyor-item" data-id="${pkg.id}">
          <span class="crate-icon">📦</span>
          <b>${pkg.id}</b>
          <span>${pkg.title}</span>
          <span class="badge-spec">• ${pkg.status}</span>
        </div>
      `).join('');
      conveyorTrack.innerHTML = itemsHtml;
    };
    renderTrack();
  }

  // Handle Swarm Slider change
  if (slider && agentCountBadge) {
    const updateSwarmSpeed = (val) => {
      const count = parseInt(val, 10);
      agentCountBadge.textContent = `${count.toLocaleString()} AGENTS`;

      // Calculate animation speed inverse to agent count
      // Min 10 agents -> 20s gear / 30s conveyor
      // Max 1000 agents -> 2.5s gear / 4s conveyor
      const gearSec = Math.max(1.8, 20 - (count / 1000) * 18);
      const conveyorSec = Math.max(3.5, 30 - (count / 1000) * 26);

      document.documentElement.style.setProperty('--gear-speed', `${gearSec.toFixed(1)}s`);
      document.documentElement.style.setProperty('--conveyor-speed', `${conveyorSec.toFixed(1)}s`);

      // Update agent numbers in board rows dynamically
      const agentBadges = document.querySelectorAll('.th-agents-working');
      agentBadges.forEach((badge, idx) => {
        const base = idx === 0 ? 34 : 12;
        const dynamicCount = Math.round(base * (count / 250));
        badge.innerHTML = `<i></i>${Math.max(1, dynamicCount)} working`;
      });
    };

    slider.addEventListener('input', (e) => {
      updateSwarmSpeed(e.target.value);
    });

    // Initialize with slider default
    updateSwarmSpeed(slider.value);
  }

  // Scroll velocity interaction: speed up gears slightly when user scrolls fast
  let lastScrollTop = window.scrollY;
  let scrollTimeout = null;

  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY;
    const delta = Math.abs(currentScrollTop - lastScrollTop);
    lastScrollTop = currentScrollTop;

    if (delta > 8) {
      document.body.classList.add('fast-scroll');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('fast-scroll');
      }, 300);
    }
  }, { passive: true });
}

export function addNewCrateToConveyor(id, title) {
  const conveyorTrack = document.getElementById('conveyor-track');
  if (!conveyorTrack) return;

  const newCrate = document.createElement('div');
  newCrate.className = 'conveyor-item';
  newCrate.innerHTML = `
    <span class="crate-icon">✨</span>
    <b>${id}</b>
    <span>${title}</span>
    <span class="badge-spec">• Just Added</span>
  `;
  newCrate.style.background = 'rgba(57, 120, 246, 0.35)';
  conveyorTrack.prepend(newCrate);
}
