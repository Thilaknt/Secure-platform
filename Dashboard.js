import { getCurrentUser } from '../state/auth.js';

const GROUPS = [
  { id: 'family', name: 'Family Group', desc: 'Stay connected with your family' },
  { id: 'unit-42', name: 'Unit 42', desc: 'Unit-level coordination and updates' },
];

export const DashboardView = {
  async render() {
    const user = getCurrentUser();
    return `
      <div class="space-y-10 animate-fade-in">
        <div class="text-center space-y-4">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white text-3xl mb-4 animate-bounce-gentle">
            👋
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-brand-600 to-slate-900 dark:from-slate-100 dark:via-brand-400 dark:to-slate-100 bg-clip-text text-transparent">
            Welcome, ${user?.name || ''}
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300">Choose a group to begin secure communication</p>
        </div>
        
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${GROUPS.map((g, i) => `
            <a href=\"#/chat/${g.id}\" class=\"group block rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 p-6 shadow-soft hover:shadow-glow transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 glass backdrop-blur-xl animate-slide-up\" style=\"animation-delay: ${i * 0.1}s\">
              <div class=\"flex items-center justify-between mb-3\">
                <div class=\"flex items-center gap-3\">
                  <div class=\"w-10 h-10 rounded-full bg-gradient-to-br ${g.id === 'family' ? 'from-pink-500 to-rose-500' : 'from-blue-500 to-indigo-500'} flex items-center justify-center text-white text-lg\">
                    ${g.id === 'family' ? '👨‍👩‍👧‍👦' : '⚔️'}
                  </div>
                  <div class=\"font-semibold text-lg text-slate-900 dark:text-slate-100\">${g.name}</div>
                </div>
                <span class=\"opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 text-brand-600\">→</span>
              </div>
              <p class=\"text-sm text-slate-600 dark:text-slate-300 leading-relaxed\">${g.desc}</p>
              <div class=\"mt-4 flex items-center gap-2 text-xs text-slate-500\">
                <span class=\"w-2 h-2 rounded-full bg-green-500 animate-pulse\"></span>
                <span>Active</span>
              </div>
            </a>
          `).join('')}
        </div>
        
        <div class="text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300">
            <span class=\"w-2 h-2 rounded-full bg-green-500 animate-ping\"></span>
            <span>All systems secure</span>
          </div>
        </div>
      </div>
    `;
  }
};



