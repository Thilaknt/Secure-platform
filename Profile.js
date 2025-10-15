import { getCurrentUser } from '../state/auth.js';

export const ProfileView = {
  async render() {
    const user = getCurrentUser();
    return `
      <div class="max-w-xl mx-auto space-y-6">
        <div>
          <h2 class="text-2xl font-bold">Profile</h2>
          <p class="text-slate-600 dark:text-slate-300">Your account details</p>
        </div>
        <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-soft">
          <dl class="divide-y divide-slate-200 dark:divide-slate-800">
            <div class="py-3 grid grid-cols-3 gap-4">
              <dt class="text-sm font-medium text-slate-500">Name</dt>
              <dd class="col-span-2">${user?.name}</dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-4">
              <dt class="text-sm font-medium text-slate-500">Username</dt>
              <dd class="col-span-2">${user?.username}</dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-4">
              <dt class="text-sm font-medium text-slate-500">Role</dt>
              <dd class="col-span-2">${user?.role}</dd>
            </div>
          </dl>
        </div>
      </div>
    `;
  }
};




