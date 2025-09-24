// Minimal chat behaviors for popup
(() => {
  const messagesEl = document.getElementById('messages');
  const inputEl = document.getElementById('input');
  const formEl = document.getElementById('composer');
  const sendBtn = document.getElementById('sendBtn');
  const clearBtn = document.getElementById('clearBtn');

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function createMessageElement(role, text) {
    const wrapper = document.createElement('div');
    wrapper.className = `message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = role === 'user' ? 'You' : 'EZ';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;

    const ts = document.createElement('span');
    ts.className = 'timestamp';
    ts.textContent = formatTime(new Date());
    bubble.appendChild(ts);

    if (role === 'user') {
      wrapper.appendChild(bubble);
      wrapper.appendChild(avatar);
    } else {
      wrapper.appendChild(avatar);
      wrapper.appendChild(bubble);
    }

    return wrapper;
  }

  function setSendingState(isSending) {
    sendBtn.disabled = isSending || inputEl.value.trim().length === 0;
  }

  function autoresize() {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 140) + 'px';
  }

  inputEl.addEventListener('input', () => {
    autoresize();
    setSendingState(false);
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formEl.requestSubmit();
    }
  });

  clearBtn.addEventListener('click', () => {
    const first = messagesEl.firstElementChild;
    messagesEl.innerHTML = '';
    if (first) messagesEl.appendChild(first);
    scrollToBottom();
  });

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (!text) return;

    const userEl = createMessageElement('user', text);
    messagesEl.appendChild(userEl);
    scrollToBottom();
    inputEl.value = '';
    autoresize();
    setSendingState(true);

    try {
      // Simulated bot reply for now
      await new Promise((r) => setTimeout(r, 350));
      const botText = `You said: "${text}"\n(I'll turn this into a calendar event soon.)`;
      const botEl = createMessageElement('bot', botText);
      messagesEl.appendChild(botEl);
      scrollToBottom();
    } catch (err) {
      const botEl = createMessageElement('bot', 'Sorry, something went wrong.');
      messagesEl.appendChild(botEl);
      scrollToBottom();
    } finally {
      setSendingState(false);
    }
  });

  // Initialize
  autoresize();
  setSendingState(false);
})();


