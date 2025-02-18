import { useState, useEffect } from "react";

type StorageKey = string;
type StorageValue = Record<string, any>;

export function useLocalStorage(key: StorageKey, initialValue: StorageValue = {}) {
  const [storedValue, setStoredValue] = useState<StorageValue>(() => {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Erro ao acessar o localStorage", error);
        return initialValue;
      }
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error("Erro ao salvar no localStorage", error);
      }
    }
  }, [key, storedValue]);

  const setItem = (path: string, value: any) => {
    setStoredValue((prev) => {
      if (path === "token" || path === "refresh_token") {
        return { ...prev, [path]: value };
      }

      const newObj = { ...prev, data: { ...(prev.data || {}) } };
      updateNestedObject(newObj.data, path.split("."), value);
      return newObj;
    });
  };

  const removeItem = (path: string) => {
    setStoredValue((prev) => {
      if (path === "token" || path === "refreshToken") {
        const newObj = { ...prev };
        delete newObj[path];
        return newObj;
      }

      const newObj = { ...prev, data: { ...(prev.data || {}) } };
      const keys = path.split(".");
      const lastKey = keys.pop()!;
      const parent = keys.reduce((acc, key) => (acc[key] = acc[key] || {}), newObj.data);
      delete parent[lastKey];

      return newObj;
    });
  };

  const updateNestedObject = (obj: any, path: string[], value: any) => {
    if (path.length === 1) {
      obj[path[0]] = value;
      return obj;
    }
    const key = path.shift()!;
    if (!obj[key] || typeof obj[key] !== "object") obj[key] = {};
    obj[key] = updateNestedObject(obj[key], path, value);
    return obj;
  };

  const clear = () => {
    setStoredValue({});
  };

  return { storedValue, setItem, removeItem, clear };
}