'use strict';

const root = document.querySelector('.todoapp');

const newTodoField = root.querySelector('.new-todo');
const itemsList = root.querySelector('.todo-list');
const allToggler = root.querySelector('.toggle-all');
const clearCompletedButton = root.querySelector('.clear-completed');

const filter = root.querySelector('.filters');

filter.addEventListener('click', (event) => {
  if (!event.target.dataset.filter) {
    return;
  }

  const filterButtons = root.querySelectorAll('[data-filter]');

  for (const button of filterButtons) {
    button.classList.toggle('selected', event.target === button);
  }

  const togglers = root.querySelectorAll('.toggle');

  for (const toggler of togglers) {
    const item = toggler.closest('.todo-item');

    switch(event.target.dataset.filter) {
      case 'all':
        item.hidden = false;
        break;
      
      case 'active':
        item.hidden = toggler.checked;
        break;

      case 'completed':
        item.hidden = !toggler.checked;

      default:
        break;  
    }
  }
});

function updateInfo() {
  const completedTogglers = root.querySelectorAll('.toggle:checked');
  const activeTogglers = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');
  const footer = root.querySelector('.footer');
  const toggleAllContainer = root.querySelector('.toggle-all-container');
  
  counter.innerHTML = `${activeTogglers.length} items left`;
  allToggler.checked = activeTogglers.length === 0;
  clearCompletedButton.hidden = completedTogglers.length === 0;

  const hasTodos = completedTogglers.length > 0 || activeTogglers.length > 0;
  footer.hidden = !hasTodos;
  toggleAllContainer.hidden = !hasTodos;
}

clearCompletedButton.addEventListener('click', () =>{
  const completedTogglers = root.querySelectorAll('.toggle:checked');

  for (const toggler of completedTogglers) {
    toggler.closest('.todo-item').remove();
  }

  updateInfo();
});

allToggler.addEventListener('change', () => {
  const togglers = root.querySelectorAll('.toggle');

  console.log(allToggler.checked);

  for (const toggler of togglers) {
    toggler.checked = allToggler.checked;
    toggler.closest('.todo-item').classList.toggle('completed', allToggler.checked);
  }

  updateInfo();
});

newTodoField.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') {
    return;
  }

  if (!newTodoField.value) {
    return;
  }

  const id = +new Date();

  itemsList.insertAdjacentHTML('beforeend', `
    <li class="todo-item">
      <input
        type="checkbox"
        id="todo-${id}"
        class="toggle"
      >
      <label for="todo-${id}">
        ${newTodoField.value}
      </label>
      <button class="destroy"></button>
    </li>
  `);

  newTodoField.value = '';
  updateInfo();
});

itemsList.addEventListener('click', (event) => {
  if (!event.target.matches('.destroy')) {
    return;
  }

  event.target.closest('.todo-item').remove();
  updateInfo();
})

itemsList.addEventListener('change', (event) => {
  if (!event.target.matches('.toggle')) {
    return;
  }

  event.target.closest('.todo-item').classList.toggle('completed', event.target.checked);
  updateInfo();
})
 