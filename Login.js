import { login } from '../state/auth.js';
import { navigateTo } from '../router.js';

export const LoginView = {
  async render() {
    return `
      <div class="max-w-md mx-auto animate-scale-in">
        <div class="mb-8 text-center space-y-3">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white text-2xl mb-4 animate-bounce-gentle">
            🔐
          </div>
          <h2 class="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">Welcome back</h2>
          <p class="text-slate-600 dark:text-slate-300">Login to continue to your secure dashboard</p>
        </div>
        <form id="loginForm" class="bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 shadow-2xl space-y-6 glass backdrop-blur-xl">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
            <input name="username" required class="w-full px-4 py-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 focus-ring" placeholder="Enter your username" />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input name="password" type="password" required class="w-full px-4 py-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 focus-ring" placeholder="Enter your password" />
          </div>
          <button class="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 active:from-brand-800 active:to-brand-900 transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-glow focus-ring">
            <span class="flex items-center justify-center gap-2">
              <span>Login</span>
              <span class="animate-pulse">→</span>
            </span>
          </button>
          <div class="text-sm text-center text-slate-600 dark:text-slate-300">
            No account? <a class="text-brand-600 hover:text-brand-700 font-medium hover:underline transition-colors" href="#/signup">Sign up</a>
          </div>
        </form>
      </div>
    `;
  },
  async afterRender() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      try {
        login({ username: data.username.trim(), password: data.password });
        navigateTo('#/dashboard');
      } catch (err) {
        alert(err.message);
      }
    });
  }
};



