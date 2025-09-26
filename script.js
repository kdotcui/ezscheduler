// Minimal chat behaviors for popup
(() => {
  const messagesContainer = document.getElementById('messages');
  const inputEl = document.getElementById('input');
  const formEl = document.getElementById('composer');
  const sendBtn = document.getElementById('sendBtn');
  const settingsBtn = document.getElementById('settingsBtn');

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function createMessageElement(role, text) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${role}`;

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
      messageElement.appendChild(bubble);
      messageElement.appendChild(avatar);
    } else {
      messageElement.appendChild(avatar);
      messageElement.appendChild(bubble);
    }

    return messageElement;
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

  settingsBtn.addEventListener('click', () => {
    window.open('settings.html', '_self');
  });

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (!text) return;

    const userEl = createMessageElement('user', text);
    messagesContainer.appendChild(userEl);
    scrollToBottom();
    inputEl.value = '';
    autoresize();
    setSendingState(true);

    try {
      // Simulated bot reply for now
      await new Promise((r) => setTimeout(r, 350));
      const botText = "Hi, I'm not set up yet! soon ->>";
      const botEl = createMessageElement('bot', botText);
      messagesContainer.appendChild(botEl);
      scrollToBottom();
    } catch (err) {
      const botEl = createMessageElement('bot', 'Sorry, something went wrong.');
      messagesContainer.appendChild(botEl);
      scrollToBottom();
    } finally {
      setSendingState(false);
    }
  });

  // Initialize
  autoresize();
  setSendingState(false);
})();


