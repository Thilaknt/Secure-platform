const assistantHTML = `
  <div class="fixed bottom-5 right-5 z-40">
    <div id="assistant-panel" class="hidden w-[320px] sm:w-[360px] h-[440px] bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-2xl overflow-hidden transform origin-bottom-right transition-all duration-300 backdrop-blur-xl glass">
      <div class="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
        <div class="flex items-center gap-2">
          <span class="text-lg animate-bounce-gentle">🤖</span>
          <div class="font-semibold">AI Assistant</div>
        </div>
        <button id="assistant-close" class="p-1 rounded-lg hover:bg-white/10 transition-colors focus-ring">✕</button>
      </div>
      <div class="p-4 border-b border-slate-200/50 dark:border-slate-800/50">
        <input id="assistant-api-key" type="password" placeholder="OpenAI API Key (optional)" class="w-full px-3 py-2 text-sm rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 focus-ring" />
        <div class="text-[11px] text-slate-500 mt-1">Key is stored only in memory for this session.</div>
      </div>
      <div id="assistant-messages" class="h-[300px] overflow-y-auto p-4 space-y-3 bg-slate-50/40 dark:bg-slate-950/40"></div>
      <form id="assistant-form" class="p-4 flex gap-2 border-t border-slate-200/50 dark:border-slate-800/50">
        <input id="assistant-input" placeholder="Ask something..." class="flex-1 px-3 py-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 focus-ring" />
        <button class="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 active:from-brand-800 active:to-brand-900 transition-all duration-300 transform hover:scale-105 shadow-soft focus-ring">
          <span class="text-sm">Send</span>
        </button>
      </form>
    </div>
    <button id="assistant-toggle" class="h-14 w-14 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 active:from-brand-800 active:to-brand-900 text-white shadow-2xl hover:shadow-glow grid place-items-center transition-all duration-300 transform hover:scale-110 focus-ring animate-float">
      <span class="text-xl">💬</span>
    </button>
  </div>
`;

let OPENAI_API_KEY = null;

async function callOpenAI(prompt) {
  if (!OPENAI_API_KEY) {
    await new Promise(r => setTimeout(r, 500));
    return 'For demo, no API key detected. Here\'s a simulated helpful reply. Add a key to get live answers.';
  }
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a concise helpful assistant for a secure comms demo.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
      })
    });
    if (!res.ok) throw new Error('Request failed');
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || 'No response';
  } catch (e) {
    return 'Live call failed (likely CORS or key issue). Showing simulated reply for demo.';
  }
}

function appendMsg(text, who) {
  const wrap = document.getElementById('assistant-messages');
  const bubble = document.createElement('div');
  bubble.className = `max-w-[80%] ${who === 'user' ? 'ml-auto bg-gradient-to-r from-brand-600 to-brand-700 text-white' : 'mr-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100'} px-4 py-3 rounded-2xl shadow-soft message-enter transition-all duration-300 transform hover:scale-105`;
  bubble.textContent = text;
  wrap.appendChild(bubble);
  wrap.scrollTop = wrap.scrollHeight;
}

export const FloatingAssistant = {
  template() { return assistantHTML; },
  bind() {
    const toggle = document.getElementById('assistant-toggle');
    const panel = document.getElementById('assistant-panel');
    const close = document.getElementById('assistant-close');
    const form = document.getElementById('assistant-form');
    const input = document.getElementById('assistant-input');
    const keyInput = document.getElementById('assistant-api-key');

    toggle.addEventListener('click', () => {
      panel.classList.toggle('hidden');
      if (!panel.classList.contains('hidden')) {
        panel.classList.add('animate-scale-in');
        setTimeout(() => panel.classList.remove('animate-scale-in'), 300);
      }
    });
    close.addEventListener('click', () => panel.classList.add('hidden'));
    keyInput.addEventListener('change', () => {
      OPENAI_API_KEY = keyInput.value || null;
    });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      appendMsg(text, 'user');
      // Show typing indicator
      const wrap = document.getElementById('assistant-messages');
      const typingDiv = document.createElement('div');
      typingDiv.id = 'assistant-typing';
      typingDiv.className = 'mr-auto max-w-[80%] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl shadow-soft';
      typingDiv.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="flex gap-1">
            <div class="w-2 h-2 bg-slate-400 rounded-full animate-typing"></div>
            <div class="w-2 h-2 bg-slate-400 rounded-full animate-typing" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 bg-slate-400 rounded-full animate-typing" style="animation-delay: 0.4s"></div>
          </div>
          <span class="text-xs text-slate-500">AI is thinking...</span>
        </div>
      `;
      wrap.appendChild(typingDiv);
      wrap.scrollTop = wrap.scrollHeight;
      
      const reply = await callOpenAI(text);
      typingDiv.remove();
      appendMsg(reply, 'bot');
    });
  }
};



