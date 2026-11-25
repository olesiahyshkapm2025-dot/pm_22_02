'use strict';

const printBtn = document.querySelector('[data-print]');
if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}

// 1. Функція підстановки повного імені користувача за id 
function setPersonName(elementId, fullName) {
  const nameElement = document.getElementById(elementId);
  if (nameElement) {
    nameElement.textContent = fullName;
  }
}

// 2. Функція згортання/розгортання блоків по кліку на стрілку
function initBlockToggles() {
  const arrows = document.querySelectorAll('.toggle-arrow');

  arrows.forEach((arrow) => {
    arrow.addEventListener('click', () => {
      const targetId = arrow.getAttribute('data-target');
      const contentBlock = document.getElementById(targetId);

      if (contentBlock) {
        contentBlock.classList.toggle('is-hidden');
        arrow.classList.toggle('rotated');
      }
    });
  });
}

// 3. Масив даних навичок та функція динамічного рендеру з попереднім очищенням
const skillsData = [
  { name: 'Adobe Photoshop', level: 85 },
  { name: 'Adobe Illustrator', level: 80 },
  { name: 'Microsoft Word', level: 90 },
  { name: 'Microsoft Powerpoint', level: 75 },
  { name: 'HTML-5/CSS-3', level: 95 }
];

function renderSkills(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Очищення вмісту контейнера перед вставленням
  container.innerHTML = '';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name}</span>
      <div class="progress">
        <div class="progress-bar" style="width: ${item.level}%;"></div>
      </div>
    `;
    container.appendChild(li);
  });
}

// Виклик усіх функцій після завантаження документа
document.addEventListener('DOMContentLoaded', () => {
  setPersonName('personName', 'Henry L. Williams');
  initBlockToggles();
  renderSkills('skills-content', skillsData);
});