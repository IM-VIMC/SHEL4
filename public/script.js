async function sendMessage() {
  const input = document.getElementById('user-input');
  const msg = input.value;
  if (!msg) return;

  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<p><b>Versa:</b> ${msg}</p>`;
  input.value = '';

  const res = await fetch('/ask', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  chatBox.innerHTML += `<p><b>Shel4:</b> ${data.response}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}