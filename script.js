// Minimal chat behaviors for popup
(() => {
  const messagesContainer = document.getElementById('messages');
  const inputEl = document.getElementById('input');
  const formEl = document.getElementById('composer');
  const sendBtn = document.getElementById('sendBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsDropdown = document.getElementById('settingsDropdown');

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

  // Load settings content immediately since it's bundled
  async function loadSettingsContent() {
    try {
      const response = await fetch('SettingsContent.html');
      const html = await response.text();
      settingsDropdown.innerHTML = html;
    } catch (error) {
      console.error('Failed to load settings content:', error);
      settingsDropdown.innerHTML = '<div class="settings-item">Settings</div>';
    }
  }

  // Load settings on page load
  loadSettingsContent();

  // Handle settings form interactions after content is loaded
  async function initializeSettings() {
    await loadSettingsContent();
    
    const modelSelect = document.getElementById('modelSelect');
    const apiKeyInput = document.getElementById('apiKey');
    
    if (modelSelect) {
      // Load saved model preference
      chrome.storage.sync.get(['selectedModel'], (result) => {
        if (result.selectedModel) {
          modelSelect.value = result.selectedModel;
        }
      });
      
      // Save model selection when changed
      modelSelect.addEventListener('change', (e) => {
        chrome.storage.sync.set({
          selectedModel: e.target.value
        });
        console.log('Model selected:', e.target.value);
      });
    }
    
    if (apiKeyInput) {
      // Load saved API key
      chrome.storage.sync.get(['apiKey'], (result) => {
        if (result.apiKey) {
          apiKeyInput.value = result.apiKey;
        }
      });
      
      // Save API key when changed (with debounce)
      let apiKeyTimeout;
      apiKeyInput.addEventListener('input', (e) => {
        clearTimeout(apiKeyTimeout);
        apiKeyTimeout = setTimeout(() => {
          chrome.storage.sync.set({
            apiKey: e.target.value
          });
        }, 300);
      });
    }
  }

  // Initialize settings when page loads
  initializeSettings();

  // Helper function to get all settings
  async function getSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['selectedModel', 'apiKey'], (result) => {
        resolve({
          selectedModel: result.selectedModel || 'gpt-5-nano',
          apiKey: result.apiKey || ''
        });
      });
    });
  }
  
  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsDropdown.classList.toggle('hidden');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!settingsDropdown.classList.contains('hidden') && 
        !settingsDropdown.contains(e.target) && 
        !settingsBtn.contains(e.target)) {
      settingsDropdown.classList.add('hidden');
    }
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


