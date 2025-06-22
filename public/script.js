const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

/**
 * Appends a new message to the chat box.
 * @param {string} sender - The message sender ('user' or 'bot').
 * @param {string} text - The message content.
 * @returns {HTMLElement} The newly created message element.
 */
const appendMessage = (sender, text) => {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
};

/**
 * Fetches a reply from the bot via the API.
 * @param {string} message - The user's message.
 * @returns {Promise<string>} The bot's reply.
 */
const getBotReply = async (message) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    // Try to get a specific error message from the server, or fall back to a generic one.
    const errorData = await response.json().catch(() => ({ error: 'An unknown error occurred.' }));
    throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.reply;
};

/**
 * Handles the chat form submission.
 * @param {Event} e - The submit event.
 */
const handleFormSubmit = async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  // Show a "thinking" indicator
  const botMessageElement = appendMessage('bot', '...');
  botMessageElement.classList.add('thinking');

  try {
    const reply = await getBotReply(userMessage);
    // To render paragraphs and line breaks from the API response,
    // replace newline characters with <br> tags and use innerHTML.
    const formattedReply = reply.replace(/\n/g, '<br>');
    botMessageElement.innerHTML = formattedReply;
  } catch (error) {
    console.error('Failed to get bot reply:', error);
    botMessageElement.textContent = 'Sorry, I am having trouble connecting. Please try again later.';
  } finally {
    // Always remove the "thinking" indicator
    botMessageElement.classList.remove('thinking');
  }
};

form.addEventListener('submit', handleFormSubmit);
