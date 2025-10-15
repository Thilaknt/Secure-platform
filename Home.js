export const HomeView = {
  async render() {
    return `
      <section class="grid md:grid-cols-2 gap-10 items-center min-h-[80vh]">
        <div class="space-y-8 animate-slide-up">
          <div class="space-y-4">
            <span class="inline-flex items-center gap-2 text-sm font-medium text-brand-700 bg-brand-50 dark:bg-brand-900/30 px-4 py-2 rounded-full border border-brand-200 dark:border-brand-800 animate-bounce-gentle">
              🔐 Trusted Demo • Frontend Only
            </span>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-brand-600 to-slate-900 dark:from-slate-100 dark:via-brand-400 dark:to-slate-100 bg-clip-text text-transparent">
              Secure closed-group communication for defence and families
            </h1>
            <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Prototype showcasing clean UI/UX, auth flows, dashboard, chat, and an AI assistant. All data stays in your browser.
            </p>
          </div>
          
          <div class="flex flex-wrap gap-4">
            <a href="#/signup" class="group px-6 py-3 rounded-xl text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-soft hover:shadow-glow transition-all duration-300 transform hover:scale-105 focus-ring">
              <span class="flex items-center gap-2">
                Get Started
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
            <a href="#/login" class="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 focus-ring">
              I already have an account
            </a>
          </div>
          
          <div class="flex items-center gap-6 text-sm text-slate-500">
            <div class="flex items-center gap-2 animate-pulse-slow">
              <span class="h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
              <span>Frontend only</span>
            </div>
            <div class="flex items-center gap-2 animate-pulse-slow" style="animation-delay: 0.5s">
              <span class="h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
              <span>Safe demo data</span>
            </div>
          </div>
        </div>
        
        <div class="relative animate-float">
          <div class="absolute -inset-8 bg-gradient-to-br from-brand-300/30 via-brand-500/20 to-brand-700/30 blur-3xl rounded-3xl animate-pulse-slow"></div>
          <div class="relative rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl p-8 glass">
            <div class="grid grid-cols-3 gap-4">
              ${[...Array(9)].map((_,i)=>`
                <div class="h-20 rounded-2xl ${i%3===0?'bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/50 dark:to-brand-800/50':i%3===1?'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700':'bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50'} shimmer transition-all duration-500 hover:scale-110" style="animation-delay: ${i*0.1}s"></div>
              `).join('')}
            </div>
            <div class="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          </div>
        </div>
      </section>
    `;
  }
};



