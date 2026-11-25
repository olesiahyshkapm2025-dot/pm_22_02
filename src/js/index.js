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

// 3. Функція динамічного рендеру навичок з попереднім очищенням контейнера
function renderSkills(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(items)) return;

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

// Коротке службове повідомлення у разі помилки завантаження даних
function showServiceMessage(containerId, message) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `<li class="load-error">${message}</li>`;
  }
}

// Асинхронне завантаження JSON через Fetch API з резервними шляхами для сервера/збірки
async function fetchJsonData(paths) {
  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        return await response.json();
      }
    } catch (_) {
      // Перевіряємо наступний шлях
    }
  }
  throw new Error('Не вдалося завантажити data.json');
}

async function loadLab5Data() {
  try {
    const data = await fetchJsonData(['data.json', './data.json', 'src/data.json']);

    if (data.person) {
      const firstName = data.person.firstName || '';
      const lastName = data.person.lastName || '';
      setPersonName('personName', `${firstName} ${lastName}`.trim());
    }

    if (data.skills) {
      renderSkills('skills-content', data.skills);
    }
  } catch (error) {
    console.error('AJAX error:', error);
    showServiceMessage(
      'skills-content',
      'Помилка завантаження даних. Запустіть сторінку через локальний сервер.'
    );
  }
}

// Виклик функцій після завантаження документа
document.addEventListener('DOMContentLoaded', () => {
  initBlockToggles();
  loadLab5Data();
});