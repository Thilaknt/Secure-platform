export function renderNavbar({ user }) {
  return `
  <div class="fixed top-0 inset-x-0 z-40 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800/50 glass">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="#/" class="flex items-center gap-3 group">
          <span class="inline-flex h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white items-center justify-center shadow-soft group-hover:scale-110 group-hover:shadow-glow transition-all duration-300 animate-bounce-gentle">🔒</span>
          <div class="font-bold tracking-tight text-lg bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">Secure Comm</div>
        </a>
        <nav class="flex items-center gap-2">
          ${user ? `
            <a href="#/dashboard" class="px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 transform hover:scale-105 focus-ring">Dashboard</a>
            <a href="#/profile" class="px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 transform hover:scale-105 focus-ring">Profile</a>
            <button id="logoutBtn" class="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 active:from-brand-800 active:to-brand-900 transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-glow focus-ring">Logout</button>
          ` : `
            <a href="#/login" class="px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 transform hover:scale-105 focus-ring">Login</a>
            <a href="#/signup" class="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 active:from-brand-800 active:to-brand-900 transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-glow focus-ring">Sign up</a>
          `}
        </nav>
      </div>
    </div>
  </div>`;
}

export function bindNavbar({ navigateTo }) {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('demo_session');
      navigateTo('#/');
      setTimeout(() => window.location.reload(), 10);
    });
  }
}



