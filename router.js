import { getCurrentUser } from './state/auth.js';
import { HomeView } from './views/Home.js';
import { LoginView } from './views/Login.js';
import { SignupView } from './views/Signup.js';
import { DashboardView } from './views/Dashboard.js';
import { ProfileView } from './views/Profile.js';
import { ChatView } from './views/Chat.js';

const routes = [
  { path: /^#\/?$/, view: HomeView, guard: null },
  { path: /^#\/login\/?$/, view: LoginView, guard: 'guest' },
  { path: /^#\/signup\/?$/, view: SignupView, guard: 'guest' },
  { path: /^#\/dashboard\/?$/, view: DashboardView, guard: 'auth' },
  { path: /^#\/profile\/?$/, view: ProfileView, guard: 'auth' },
  { path: /^#\/chat\/(.+)\/?$/, view: ChatView, guard: 'auth' },
];

export function navigateTo(hash) {
  window.location.hash = hash;
}

function resolveRoute() {
  const hash = window.location.hash || '#/';
  for (const route of routes) {
    const match = hash.match(route.path);
    if (match) {
      return { route, params: match.slice(1) };
    }
  }
  return { route: routes[0], params: [] };
}

export async function initRouter() {
  await renderCurrentRoute();
  window.addEventListener('hashchange', renderCurrentRoute);
}

async function renderCurrentRoute() {
  const { route, params } = resolveRoute();
  const user = getCurrentUser();

  if (route.guard === 'auth' && !user) {
    navigateTo('#/login');
    return;
  }
  if (route.guard === 'guest' && user) {
    navigateTo('#/dashboard');
    return;
  }

  // Page transition effect
  const transitionEl = document.getElementById('page-transition');
  transitionEl.classList.add('active');
  
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const viewEl = document.getElementById('view');
  viewEl.className = 'flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24';
  viewEl.innerHTML = await route.view.render({ params });
  
  // Add entrance animation
  viewEl.classList.add('animate-slide-up');
  
  if (route.view.afterRender) {
    await route.view.afterRender({ params });
  }
  
  // Remove transition overlay
  setTimeout(() => {
    transitionEl.classList.remove('active');
    viewEl.classList.remove('animate-slide-up');
  }, 300);
}



