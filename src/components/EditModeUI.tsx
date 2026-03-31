import React, { useEffect, useState } from 'react';
import { useEditMode, EDIT_PREFIX } from '../context/EditContext';
import { Pencil, X, RotateCcw, LogOut, Lock } from 'lucide-react';

function LoginModal({ onClose }: { onClose: () => void }) {
  const { adminLogin, toggle } = useEditMode();
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = adminLogin(pw);
    if (ok) {
      toggle(); // enter edit mode right after login
      onClose();
    } else {
      setError(true);
      setPw('');
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-blue-600" />
            <span className="font-bold text-gray-900">Admin Login</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Password</label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false); }}
              autoFocus
              className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all ${
                error
                  ? 'border-red-400 bg-red-50 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
              placeholder="Enter admin password"
            />
            {error && <p className="text-xs text-red-500 mt-1.5">Incorrect password</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign in &amp; edit
          </button>
        </form>
        <p className="text-[11px] text-gray-400 mt-4 text-center">
          Shortcut: Ctrl+Shift+E
        </p>
      </div>
    </div>
  );
}

export function EditModeUI() {
  const { isAdmin, isEditing, toggle, adminLogout } = useEditMode();
  const [showLogin, setShowLogin] = useState(false);

  // Ctrl+Shift+E: open login if not admin, toggle edit if already admin
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        if (!isAdmin) {
          setShowLogin(true);
        } else {
          toggle();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isAdmin, toggle]);

  const handleResetAll = () => {
    if (!confirm('Reset ALL content overrides to original? This cannot be undone.')) return;
    Object.keys(localStorage)
      .filter(k => k.startsWith(EDIT_PREFIX))
      .forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  return (
    <>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* Floating toggle button — only visible when admin */}
      {isAdmin && (
        <button
          onClick={toggle}
          title={isEditing ? 'Exit Edit Mode (Ctrl+Shift+E)' : 'Edit Content (Ctrl+Shift+E)'}
          className={`fixed bottom-24 right-4 z-[100] w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all ${
            isEditing
              ? 'bg-blue-600 text-white shadow-blue-300'
              : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-400 hover:text-blue-600'
          }`}
        >
          {isEditing ? <X size={18} /> : <Pencil size={16} />}
        </button>
      )}

      {/* Edit mode banner */}
      {isEditing && (
        <div className="fixed top-0 left-0 right-0 z-[200] bg-blue-600 text-white text-xs flex items-center justify-between px-4 py-2 shadow-md">
          <div className="flex items-center gap-2">
            <Pencil size={12} />
            <span className="font-semibold">Edit Mode</span>
            <span className="opacity-70">— click any highlighted text to edit · changes save automatically</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetAll}
              className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
            >
              <RotateCcw size={11} /> Reset all
            </button>
            <button
              onClick={toggle}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded font-medium transition-colors"
            >
              Done editing
            </button>
            <button
              onClick={adminLogout}
              className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity ml-2"
              title="Log out of admin mode"
            >
              <LogOut size={11} /> Log out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
