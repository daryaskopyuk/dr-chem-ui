const storageKey = 'applicationData';
const storage = window.localStorage;

export const getLocalstorage = (key: string) => {
  const store = JSON.parse(storage.getItem(storageKey) || '{}');
  const storeExist = !!store;

  return storeExist ? store[key] : null;
};

export const setLocalstorage = (key: string, val: string | boolean) => {
  const store = JSON.parse(storage.getItem(storageKey) || '{}');
  const storeExist = !!store;
  if (storeExist) {
    store[key] = val;
    storage.setItem(storageKey, JSON.stringify(store));
  } else {
    storage.setItem(storageKey, JSON.stringify({ [key]: val }));
  }
};

export const clearLocalstorage = () => {
  storage.removeItem(storageKey);
};
