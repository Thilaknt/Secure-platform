const STORAGE_KEYS = {
  USERS: 'demo_users',
  SESSION: 'demo_session',
};

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
  } catch (e) {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEYS.SESSION));
  } catch (e) {
    return null;
  }
}

export function setCurrentUser(user) {
  sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
}

export function logout() {
  sessionStorage.removeItem(STORAGE_KEYS.SESSION);
}

export function signup({ name, username, password, role }) {
  const users = getUsers();
  if (users.some(u => u.username === username)) {
    throw new Error('Username already exists');
  }
  const user = { id: crypto.randomUUID(), name, username, password, role };
  users.push(user);
  saveUsers(users);
  setCurrentUser({ id: user.id, name: user.name, username: user.username, role: user.role });
  return user;
}

export function login({ username, password }) {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  setCurrentUser({ id: user.id, name: user.name, username: user.username, role: user.role });
  return user;
}



