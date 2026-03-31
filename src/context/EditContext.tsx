import React, { createContext, useContext, useState } from 'react';

export const EDIT_PREFIX = 'portfolioEdit:';
const ADMIN_SESSION_KEY = 'portfolioAdminSession';
// Password is read from .env (VITE_ADMIN_PASSWORD). Change it there.
const ADMIN_PASSWORD = (import.meta as any).env?.VITE_ADMIN_PASSWORD ?? 'jeremy2025';

interface EditCtx {
  isAdmin: boolean;
  isEditing: boolean;
  toggle: () => void;
  adminLogin: (pw: string) => boolean;
  adminLogout: () => void;
  /** Directly grant admin (e.g. after Supabase login) — no password needed */
  elevate: () => void;
}

const EditContext = createContext<EditCtx>({
  isAdmin: false,
  isEditing: false,
  toggle: () => {},
  adminLogin: () => false,
  adminLogout: () => {},
  elevate: () => {},
});

export function EditProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === '1');
  const [isEditing, setIsEditing] = useState(false);

  const elevate = () => {
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    setIsAdmin(true);
  };

  const adminLogin = (pw: string): boolean => {
    if (pw === ADMIN_PASSWORD) {
      elevate();
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdmin(false);
    setIsEditing(false);
  };

  const toggle = () => {
    if (isAdmin) setIsEditing(v => !v);
  };

  return (
    <EditContext.Provider value={{ isAdmin, isEditing, toggle, adminLogin, adminLogout, elevate }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEditMode() { return useContext(EditContext); }

export function readContent(k: string, fallback: string): string {
  return localStorage.getItem(EDIT_PREFIX + k) ?? fallback;
}
export function saveContent(k: string, value: string): void {
  localStorage.setItem(EDIT_PREFIX + k, value);
}
export function resetContent(k: string): void {
  localStorage.removeItem(EDIT_PREFIX + k);
}
