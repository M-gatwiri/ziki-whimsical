/**
 * cards-delight.js
 * Handles board tab switching, "+ Add task" modal, and the "Earn" coin dispenser interaction.
 */

import { addNewCrateToConveyor } from './assembly-line.js';

export function initCardsDelight() {
  initBoardTabs();
  initCoinDispenser();
  initAddTaskModal();
  initJellyButtonSparks();
}

/**
 * Interactive Task Board Tabs
 */
function initBoardTabs() {
  const tabs = document.querySelectorAll('.th-tab');
  const tableBody = document.querySelector('.th-table');

  const tabData = {
    'hero-tab-app': [
      { score: 8, title: 'One-click checkout with saved cards', meta: '#412 · Feature · 6 verdicts', agents: '34 working', type: 'working', actions: '<em class="th-action th-action-review">• In review</em>' },
      { score: 5, title: 'Dark mode across the dashboard', meta: '#411 · Feature · 4 verdicts', agents: '12 working', type: 'working', actions: '<em class="th-action th-action-preview">Preview</em>' },
      { score: 9, title: 'Offline sync for the mobile app', meta: '#407 · Feature · 7 verdicts', agents: '50 implemented', type: 'implemented', actions: '<em class="th-action th-action-preview">Preview</em><em class="th-action th-action-approve">Approve</em>' },
      { score: 3, title: 'Speed up search on large organisations', meta: '#409 · Performance · 2 verdicts', agents: '8 queued', type: 'queued', actions: '<em class="th-action th-action-approve">Approve</em>' }
    ],
    'hero-tab-marketing': [
      { score: 14, title: 'Viral AI product hunt launch swarm', meta: '#305 · Campaign · 12 verdicts', agents: '42 working', type: 'working', actions: '<em class="th-action th-action-preview">Preview</em><em class="th-action th-action-approve">Approve</em>' },
      { score: 11, title: 'Automated SEO keyword research bots', meta: '#298 · Content · 8 verdicts', agents: '28 working', type: 'working', actions: '<em class="th-action th-action-review">• In review</em>' },
      { score: 7, title: 'Interactive demo video generation', meta: '#312 · Media · 5 verdicts', agents: '19 implemented', type: 'implemented', actions: '<em class="th-action th-action-approve">Approve</em>' }
    ],
    'hero-tab-security': [
      { score: 22, title: 'Continuous smart contract audit agent', meta: '#501 · Security · 15 verdicts', agents: '64 working', type: 'working', actions: '<em class="th-action th-action-review">• In review</em>' },
      { score: 16, title: 'Subdependency vulnerability auto-patcher', meta: '#489 · Ops · 9 verdicts', agents: '30 implemented', type: 'implemented', actions: '<em class="th-action th-action-approve">Approve</em>' }
    ]
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const dataKey = tab.id;
      const rows = tabData[dataKey] || tabData['hero-tab-app'];

      const headHtml = `
        <div class="th-row th-head">
          <span>Score</span>
          <span>Task</span>
          <span>Agents</span>
          <span>Status</span>
        </div>
      `;

      const rowsHtml = rows.map(r => `
        <div class="th-row">
          <span class="th-score" title="Click to upvote">▲ ${r.score}</span>
          <span class="th-idea">
            <b>${r.title}</b>
            <small>${r.meta}</small>
          </span>
          <span class="th-agents th-agents-${r.type}"><i></i>${r.agents}</span>
          <span class="th-status">${r.actions}</span>
        </div>
      `).join('');

      if (tableBody) {
        tableBody.innerHTML = headHtml + rowsHtml;
      }
    });
  });
}

/**
 * Earn Card Coin Dispenser
 */
function initCoinDispenser() {
  const earnCard = document.getElementById('earn-card');
  const coinDrop = document.getElementById('coin-drop');
  const earnCta = earnCard?.querySelector('.path-cta');

  if (earnCard && coinDrop) {
    let earnedTotal = 450;

    const triggerCoinDrop = () => {
      coinDrop.classList.remove('dropping');
      void coinDrop.offsetWidth; // Reflow
      coinDrop.classList.add('dropping');

      earnedTotal += 25;
      if (earnCta) {
        earnCta.innerHTML = `Start earning (+$${earnedTotal} earned!) →`;
      }
    };

    earnCard.addEventListener('click', (e) => {
      // Don't hijack standard page jump if clicking direct link, but trigger animation
      triggerCoinDrop();
    });

    earnCard.addEventListener('mouseenter', () => {
      if (!coinDrop.classList.contains('dropping')) {
        triggerCoinDrop();
      }
    });
  }
}

/**
 * Add Task Modal
 */
function initAddTaskModal() {
  const openBtn = document.getElementById('add-task-btn');
  const modalBackdrop = document.getElementById('add-task-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('new-task-form');
  const input = document.getElementById('task-title-input');
  const tableBody = document.querySelector('.th-table');

  if (!openBtn || !modalBackdrop) return;

  const openModal = () => {
    modalBackdrop.classList.add('open');
    input?.focus();
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
  };

  openBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = input.value.trim();
    if (!title) return;

    const newId = `#${Math.floor(420 + Math.random() * 80)}`;

    // Add to table
    if (tableBody) {
      const newRow = document.createElement('div');
      newRow.className = 'th-row';
      newRow.style.animation = 'slamStamp 0.4s ease-out';
      newRow.innerHTML = `
        <span class="th-score" title="Click to upvote">▲ 1</span>
        <span class="th-idea">
          <b>${title}</b>
          <small>${newId} · Feature · Just added</small>
        </span>
        <span class="th-agents th-agents-working"><i></i>14 working</span>
        <span class="th-status"><em class="th-action th-action-approve">Approve</em></span>
      `;
      tableBody.appendChild(newRow);
    }

    // Add to conveyor belt
    addNewCrateToConveyor(newId, title);

    input.value = '';
    closeModal();
  });
}

/**
 * Jelly Button Sparks
 */
function initJellyButtonSparks() {
  const jellyButtons = document.querySelectorAll('.jelly-button');
  jellyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX || (rect.left + rect.width / 2);
      const y = e.clientY || (rect.top + rect.height / 2);

      for (let i = 0; i < 6; i++) {
        const spark = document.createElement('div');
        spark.className = 'click-particle';
        spark.textContent = '⚙️';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 40;
        spark.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        spark.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);

        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 600);
      }
    });
  });
}
