export const getStorage = (key: string): unknown | null => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`getStorage error for key "${key}":`, error);
    return null;
  }
};

export const setStorage = (key: string, value: unknown): void => {
  try {
    const item = JSON.stringify(value);
    window.localStorage.setItem(key, item);
  } catch (error) {
    console.error(`setStorage error for key "${key}":`, error);
  }
};
