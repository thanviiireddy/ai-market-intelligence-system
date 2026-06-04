import { useState, useEffect } from "react";

/**
 * Custom hook to sync react state with localStorage.
 * @param {string} key - The local storage key.
 * @param {*} initialValue - The fallback initial state value.
 */
export function useLocalStorage(key, initialValue) {
  // Read value on initialization
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  // Write value to localStorage when it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
