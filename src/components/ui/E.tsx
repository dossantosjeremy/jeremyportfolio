import React from 'react';
import { useEditMode, EDIT_PREFIX } from '../../context/EditContext';

function escHtml(s: string) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Never re-render once mounted — DOM is the source of truth while editing
const EditableSpan = React.memo(
  ({ k, iv }: { k: string; iv: string }) => (
    <span
      contentEditable
      suppressContentEditableWarning
      className="outline-dashed outline-2 outline-blue-400/60 rounded-sm cursor-text focus:outline-blue-600 focus:bg-blue-50/30 transition-all"
      onInput={e => localStorage.setItem(EDIT_PREFIX + k, e.currentTarget.textContent ?? '')}
      dangerouslySetInnerHTML={{ __html: escHtml(iv) }}
    />
  ),
  (prev, next) => prev.k === next.k,  // never re-render — k is always stable
);
EditableSpan.displayName = 'EditableSpan';

export function E({ k, children }: { k: string; children: string }) {
  const { isEditing } = useEditMode();
  const stored = localStorage.getItem(EDIT_PREFIX + k);
  const value = stored ?? children;
  if (!isEditing) return <>{value}</>;
  return <EditableSpan k={k} iv={value} />;
}
