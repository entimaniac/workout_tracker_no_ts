import { useEffect, useState } from "react";

const readStoredValue = (key, fallbackValue) => {
  if (typeof localStorage === "undefined") {
    return fallbackValue;
  }

  const rawValue = localStorage.getItem(key);

  if (!rawValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.error(`Unable to parse stored value for ${key}.`, error);
    return fallbackValue;
  }
};

export const usePersistentState = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const fallbackValue =
      typeof initialValue === "function" ? initialValue() : initialValue;

    return readStoredValue(key, fallbackValue);
  });

  useEffect(() => {
    if (typeof localStorage === "undefined") {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
