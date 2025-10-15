import { getCurrentUser } from '../state/auth.js';

const DEMO_HISTORY = {
  'family': [
    { who: 'them', text: 'Welcome to the Family Group! 🎉' },
    { who: 'you', text: 'Hello everyone!' },
    { who: 'them', text: 'Remember: This is a UI demo only.' },
  ],
  'unit-42': [
    { who: 'them', text: 'Unit 42 updates channel initiated.' },
    { who: 'you', text: 'Copy that.' },
  ],
};

export const ChatView = {
  async render({ params }) {
    const [groupId] = params;
    const user = getCurrentUser();
    const history = (DEMO_HISTORY[groupId] || []).map(m => ({ ...m }));
    sessionStorage.setItem('demo_chat_'+groupId, JSON.stringify(history));
    const title = groupId === 'family' ? 'Family Group' : (groupId === 'unit-42' ? 'Unit 42' : 'Group');

    return `
      <div class="max-w-3xl mx-auto h-[70vh] sm:h-[75vh] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-soft flex flex-col">
        <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-950/40">
          <div class="font-semibold">${title}</div>
          <a href="#/dashboard" class="text-sm text-brand-600 hover:underline">Back</a>
        </div>
        <div id="chatWrap" class="flex-1 overflow-y-auto p-4 space-y-2 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950/40 dark:to-slate-900"></div>
        <form id="chatForm" class="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <input id="chatInput" placeholder="Type a message" class="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          <button class="px-4 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800">Send</button>
        </form>
      </div>
    `;
  },
  async afterRender({ params }) {
    const [groupId] = params;
    const wrap = document.getElementById('chatWrap');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    let history = [];
    try { history = JSON.parse(sessionStorage.getItem('demo_chat_'+groupId)) || []; } catch {}

    const renderBubble = (m) => {
      const div = document.createElement('div');
      const isYou = m.who === 'you';
      div.className = `max-w-[75%] ${isYou ? 'ml-auto bg-gradient-to-r from-brand-600 to-brand-700 text-white' : 'mr-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'} px-4 py-3 rounded-2xl shadow-soft message-enter transition-all duration-300 transform hover:scale-105`;
      div.textContent = m.text;
      wrap.appendChild(div);
      wrap.scrollTop = wrap.scrollHeight;
    };

    history.forEach(renderBubble);

    const showTypingIndicator = () => {
      const typingDiv = document.createElement('div');
      typingDiv.id = 'typing-indicator';
      typingDiv.className = 'mr-auto max-w-[75%] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl shadow-soft';
      typingDiv.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="flex gap-1">
            <div class="w-2 h-2 bg-slate-400 rounded-full animate-typing"></div>
            <div class="w-2 h-2 bg-slate-400 rounded-full animate-typing" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 bg-slate-400 rounded-full animate-typing" style="animation-delay: 0.4s"></div>
          </div>
          <span class="text-xs text-slate-500">typing...</span>
        </div>
      `;
      wrap.appendChild(typingDiv);
      wrap.scrollTop = wrap.scrollHeight;
    };

    const hideTypingIndicator = () => {
      const typing = document.getElementById('typing-indicator');
      if (typing) typing.remove();
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      
      const mine = { who: 'you', text };
      history.push(mine);
      renderBubble(mine);
      input.value = '';
      sessionStorage.setItem('demo_chat_'+groupId, JSON.stringify(history));
      
      // Show typing indicator
      setTimeout(() => showTypingIndicator(), 300);
      
      // Simulated reply with typing delay
      setTimeout(() => {
        hideTypingIndicator();
        const replies = [
          'Received: ' + text,
          'Understood, ' + text,
          'Copy that: ' + text,
          'Message received: ' + text,
          'Roger, ' + text
        ];
        const reply = { who: 'them', text: replies[Math.floor(Math.random() * replies.length)] };
        history.push(reply);
        renderBubble(reply);
        sessionStorage.setItem('demo_chat_'+groupId, JSON.stringify(history));
      }, 1500 + Math.random() * 1000);
    });
  }
};



