const storageKey = 'applicationData';
const storage = window.localStorage;

export const getLocalstorage = (key: string) => {
  const store = JSON.parse(storage.getItem(storageKey) || '{}');
  const storeExist = !!store;

  return storeExist ? store[key] : null;
};

export const setLocalstorage = (
  key: string,
  val: string | boolean | object
) => {
  const store = JSON.parse(storage.getItem(storageKey) || '{}');
  const storeExist = !!store;
  if (storeExist) {
    store[key] = val;
    storage.setItem(storageKey, JSON.stringify(store));
  } else {
    storage.setItem(storageKey, JSON.stringify({ [key]: val }));
  }
};

export const removeLocalstorage = (key: string) => {
  const store = JSON.parse(storage.getItem(storageKey) || '{}');
  const storeExist = !!store;
  if (storeExist) {
    delete store[key];
    storage.setItem(storageKey, JSON.stringify(store));
  }
};

export const clearLocalstorage = () => {
  storage.removeItem(storageKey);
};
