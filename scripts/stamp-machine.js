/**
 * stamp-machine.js
 * Controls the mechanical stamp piston arm, ink mark stamping, particle bursts, and score upvoting.
 */

export function initStampMachine() {
  const pistonArm = document.getElementById('stamp-piston-arm');
  const boardTable = document.querySelector('.th-table');

  // Particle generator for mechanical sparks and cogs
  function spawnMechanicalBurst(x, y) {
    const symbols = ['⚙️', '✨', '⚡', '✦', '🟢'];
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'click-particle';
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 65;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 700);
    }
  }

  // Handle "Approve" button click with stamp animation
  if (boardTable) {
    boardTable.addEventListener('click', (e) => {
      const approveBtn = e.target.closest('.th-action-approve');
      if (approveBtn) {
        e.preventDefault();
        const row = approveBtn.closest('.th-row');
        const statusContainer = row.querySelector('.th-status');

        // Trigger piston arm slam
        if (pistonArm) {
          pistonArm.classList.add('slamming');
          setTimeout(() => {
            pistonArm.classList.remove('slamming');
          }, 450);
        }

        // Trigger bot jump mascots
        const bots = document.querySelectorAll('.clockwork-bot');
        bots.forEach(bot => {
          bot.classList.add('bot-jumping');
          setTimeout(() => bot.classList.remove('bot-jumping'), 650);
        });

        // Trigger particles at button position
        const rect = approveBtn.getBoundingClientRect();
        spawnMechanicalBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

        // Replace action with stamped mark
        if (statusContainer) {
          statusContainer.innerHTML = `
            <span class="ink-stamp-mark">✓ APPROVED</span>
          `;
        }

        // Change agents status pill to green
        const agentsPill = row.querySelector('.th-agents');
        if (agentsPill) {
          agentsPill.className = 'th-agents th-agents-implemented';
          agentsPill.innerHTML = '<i></i>Merged to main';
        }
      }

      // Handle Score Upvote Click
      const scoreBtn = e.target.closest('.th-score');
      if (scoreBtn) {
        const text = scoreBtn.textContent.replace(/[^\d]/g, '');
        const currentScore = parseInt(text, 10) || 0;
        const newScore = currentScore + 1;
        scoreBtn.innerHTML = `▲ ${newScore}`;
        
        scoreBtn.classList.remove('score-bounced');
        // Force reflow
        void scoreBtn.offsetWidth;
        scoreBtn.classList.add('score-bounced');

        const rect = scoreBtn.getBoundingClientRect();
        spawnMechanicalBurst(rect.left + rect.width / 2, rect.top);
      }
    });
  }
}
