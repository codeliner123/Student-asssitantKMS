const assistant = document.querySelector('.assistant');
const assistantBox = document.querySelector('.assistant-box');
const chat = document.querySelector('.chat');
const form = document.querySelector('.assistant form');
const input = form.querySelector('input');

function openAssistant(message) {
  assistant.classList.add('open');
  if (message) {
    const note = document.createElement('p');
    note.textContent = message;
    chat.appendChild(note);
    chat.scrollTop = chat.scrollHeight;
  }
  input.focus();
}

document.querySelector('.assistant-toggle').addEventListener('click', () => openAssistant());
document.querySelector('.assistant header button').addEventListener('click', () => assistant.classList.remove('open'));
document.querySelector('.ask-btn').addEventListener('click', () => openAssistant());
document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => openAssistant(
    button.dataset.action === 'roadmap'
      ? 'Your personalized roadmap is ready. Would you like to start with your next milestone?'
      : 'I found 7 skill gaps for your target role. Would you like a prioritized learning plan?'
  ));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!input.value.trim()) return;
  const userMessage = document.createElement('p');
  userMessage.className = 'user-message';
  userMessage.textContent = input.value.trim();
  chat.appendChild(userMessage);
  input.value = '';
  const reply = document.createElement('p');
  reply.textContent = 'Great direction! To tailor your plan, would you like to begin with Resume Analysis, a Skill Quiz, or GitHub Review?';
  setTimeout(() => {
    chat.appendChild(reply);
    chat.scrollTop = chat.scrollHeight;
  }, 300);
});

document.querySelector('.mobile-menu').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('show'));

const todayLabel = document.querySelector('#today-label');
if (todayLabel) {
  todayLabel.textContent = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
}
