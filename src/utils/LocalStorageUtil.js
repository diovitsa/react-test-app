const _getLocalStorage = () => {
  let localStorage;
  try {
    localStorage = window.localStorage;
  } catch (e) {
    console && console.error('LocalStorageUtil: window.localStorage is inaccessible');
  }
  return localStorage;
};

export const getLocalItem = (key) => {
  const localStorage = _getLocalStorage();
  return localStorage ? localStorage.getItem(key) : null;
};

export const setLocalItem = (key, value) => {
  const localStorage = _getLocalStorage();
  localStorage && localStorage.setItem(key, value);
};

export const removeLocalItem = (key) => {
  const localStorage = _getLocalStorage();
  localStorage && localStorage.removeItem(key);
};