"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface ToastItem {
  id: number;
  msg: string;
  isErr: boolean;
}

interface ToastContextValue {
  toast: (msg: string, isErr?: boolean) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextToastId = 1;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((msg: string, isErr = false) => {
    const id = nextToastId++;
    setItems((prev) => [...prev, { id, msg, isErr }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }, 3400);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toast-region" id="toastRegion">
        {items.map((item) => (
          <div key={item.id} className={`toast${item.isErr ? " err" : ""}`}>
            {item.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
