import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore — grapesjs types are loose
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

// ── Constants ────────────────────────────────────────────────────────────────
export const GJS_OVERRIDE_PREFIX = 'gjs-override:';

const PAGES = [
  { key: 'home',     label: 'Home',     url: '/' },
  { key: 'services', label: 'Services', url: '/services' },
  { key: 'work',     label: 'Work',     url: '/work' },
  { key: 'process',  label: 'Process',  url: '/process' },
  { key: 'profile',  label: 'Profile',  url: '/profile' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Collect all <style> textContent from a document */
function captureStyles(doc: Document): string {
  return Array.from(doc.querySelectorAll('style'))
    .map(s => s.textContent ?? '')
    .join('\n');
}

/** Inject CSS string into a document, tagged so we can remove it later */
function injectCss(doc: Document, css: string) {
  doc.querySelectorAll('style[data-gjs-app]').forEach(el => el.remove());
  if (!css) return;
  const style = doc.createElement('style');
  style.setAttribute('data-gjs-app', 'true');
  style.textContent = css;
  doc.head.appendChild(style);
}

// ── Component ────────────────────────────────────────────────────────────────
export const VisualEditor: React.FC = () => {
  const mountRef        = useRef<HTMLDivElement>(null);
  const captureRef      = useRef<HTMLIFrameElement>(null);
  const editorRef       = useRef<any>(null);
  const capturedCssRef  = useRef('');

  const [activePage, setActivePage] = useState(PAGES[0]);
  const [status, setStatus]         = useState<'idle' | 'loading' | 'ready'>('idle');
  const [saveLabel, setSaveLabel]   = useState('Save Page');
  const [overrides, setOverrides]   = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PAGES.map(p => [p.key, !!localStorage.getItem(GJS_OVERRIDE_PREFIX + p.key)]))
  );

  // ── Load a page into GrapesJS ──────────────────────────────────────────────
  const loadPage = useCallback((page: typeof PAGES[0]) => {
    const iframe = captureRef.current;
    const editor = editorRef.current;
    if (!iframe || !editor) return;

    setStatus('loading');

    const onLoad = () => {
      iframe.removeEventListener('load', onLoad);
      try {
        const doc  = iframe.contentDocument!;
        const main = doc.querySelector('main');
        if (!main) { setStatus('idle'); return; }

        // Prefer saved override HTML; fall back to live-rendered HTML
        const stored  = localStorage.getItem(GJS_OVERRIDE_PREFIX + page.key);
        const html    = stored ? JSON.parse(stored).html : main.innerHTML;

        capturedCssRef.current = captureStyles(doc);

        // Inject CSS into GrapesJS canvas document
        const canvasDoc = editor.Canvas.getDocument();
        if (canvasDoc) injectCss(canvasDoc, capturedCssRef.current);

        editor.setComponents(html);

        // Also restore any saved GJS CSS overrides
        if (stored) {
          const { css } = JSON.parse(stored);
          if (css) editor.setStyle(css);
        }

        setStatus('ready');
      } catch (err) {
        console.error('[VisualEditor] capture failed', err);
        setStatus('idle');
      }
    };

    iframe.addEventListener('load', onLoad);
    iframe.src = window.location.origin + page.url;
  }, []);

  // ── Init GrapesJS once ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!mountRef.current || editorRef.current) return;

    const editor = grapesjs.init({
      container: mountRef.current,
      fromElement: false,
      height: '100%',
      width: 'auto',
      storageManager: false,
      noticeOnUnload: false,
      deviceManager: {
        devices: [
          { name: 'Desktop', width: '' },
          { name: 'Tablet',  width: '768px',  widthMedia: '768px' },
          { name: 'Mobile',  width: '390px',  widthMedia: '390px' },
        ],
      },
      // Remove the default GrapesJS top-bar (we supply our own)
      panels: {
        defaults: [
          {
            id: 'panel-switcher',
            el: '.panel__switcher',
            buttons: [
              { id: 'show-layers',  active: true,  label: 'Layers',  command: 'show-layers',  togglable: false },
              { id: 'show-style',   active: false, label: 'Styles',  command: 'show-styles',  togglable: false },
              { id: 'show-traits',  active: false, label: 'Traits',  command: 'show-traits',  togglable: false },
            ],
          },
        ],
      },
    });

    editorRef.current = editor;

    // Re-inject CSS whenever the canvas frame reloads
    editor.on('canvas:frame:load', () => {
      const canvasDoc = editor.Canvas.getDocument();
      if (canvasDoc && capturedCssRef.current) {
        injectCss(canvasDoc, capturedCssRef.current);
      }
    });

    // Load the first page
    loadPage(PAGES[0]);

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, [loadPage]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSelectPage = (page: typeof PAGES[0]) => {
    setActivePage(page);
    setSaveLabel('Save Page');
    loadPage(page);
  };

  const handleSave = () => {
    const editor = editorRef.current;
    if (!editor || status !== 'ready') return;

    const html = editor.getHtml();
    const css  = editor.getCss();
    localStorage.setItem(GJS_OVERRIDE_PREFIX + activePage.key, JSON.stringify({ html, css }));

    setOverrides(prev => ({ ...prev, [activePage.key]: true }));
    setSaveLabel('✓ Saved!');
    setTimeout(() => setSaveLabel('Save Page'), 2000);
  };

  const handleReset = () => {
    if (!confirm(`Reset visual override for "${activePage.label}"? The original React layout will be restored.`)) return;
    localStorage.removeItem(GJS_OVERRIDE_PREFIX + activePage.key);
    setOverrides(prev => ({ ...prev, [activePage.key]: false }));
    loadPage(activePage);
  };

  const handleDevice = (name: string) => {
    editorRef.current?.setDevice(name);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  const saved = saveLabel.startsWith('✓');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', background: '#1a1a1a' }}>

      {/* ── Top toolbar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '0 14px', height: 48, flexShrink: 0,
        background: '#111', borderBottom: '1px solid #2a2a2a',
      }}>
        <Link to="/admin" style={{ color: '#666', fontSize: 12, textDecoration: 'none', paddingRight: 10 }}>
          ← Admin
        </Link>
        <div style={{ width: 1, height: 20, background: '#2a2a2a' }} />

        {/* Page tabs */}
        {PAGES.map(p => (
          <button
            key={p.key}
            onClick={() => handleSelectPage(p)}
            title={overrides[p.key] ? 'Has visual override' : ''}
            style={{
              padding: '4px 12px', borderRadius: 9999, fontSize: 12,
              fontWeight: activePage.key === p.key ? 600 : 400,
              background: activePage.key === p.key ? '#0066cc' : 'transparent',
              color: activePage.key === p.key ? '#fff' : '#888',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 5,
            }}
          >
            {p.label}
            {overrides[p.key] && (
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
            )}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {/* Status */}
        {status === 'loading' && (
          <span style={{ fontSize: 11, color: '#555' }}>Loading {activePage.label}…</span>
        )}

        {/* Device switcher */}
        {[
          { name: 'Desktop', icon: '🖥' },
          { name: 'Tablet',  icon: '📱' },
          { name: 'Mobile',  icon: '📲' },
        ].map(d => (
          <button
            key={d.name}
            onClick={() => handleDevice(d.name)}
            title={d.name}
            style={{ padding: '4px 8px', borderRadius: 6, fontSize: 14, background: 'transparent', color: '#888', border: '1px solid #2a2a2a', cursor: 'pointer' }}
          >
            {d.icon}
          </button>
        ))}

        <div style={{ width: 1, height: 20, background: '#2a2a2a', margin: '0 2px' }} />

        <button
          onClick={handleReset}
          disabled={!overrides[activePage.key]}
          style={{
            padding: '5px 12px', borderRadius: 9999, fontSize: 12,
            background: 'transparent', color: overrides[activePage.key] ? '#f87171' : '#444',
            border: `1px solid ${overrides[activePage.key] ? '#7f1d1d' : '#2a2a2a'}`,
            cursor: overrides[activePage.key] ? 'pointer' : 'default',
          }}
        >
          Reset
        </button>

        <button
          onClick={handleSave}
          disabled={status !== 'ready'}
          style={{
            padding: '5px 16px', borderRadius: 9999, fontSize: 12, fontWeight: 600,
            background: saved ? '#16a34a' : '#0066cc',
            color: '#fff', border: 'none',
            cursor: status === 'ready' ? 'pointer' : 'not-allowed',
            opacity: status === 'ready' ? 1 : 0.4,
            transition: 'background 0.3s',
          }}
        >
          {saveLabel}
        </button>
      </div>

      {/* ── GrapesJS canvas ── */}
      <div ref={mountRef} style={{ flex: 1, overflow: 'hidden', position: 'relative' }} />

      {/* ── Loading overlay ── */}
      {status === 'loading' && (
        <div style={{
          position: 'absolute', inset: 0, top: 48,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.55)', zIndex: 1,
          pointerEvents: 'none',
        }}>
          <div style={{ background: '#1e1e1e', borderRadius: 12, padding: '20px 28px', border: '1px solid #333' }}>
            <span style={{ color: '#888', fontSize: 13 }}>Capturing {activePage.label} page…</span>
          </div>
        </div>
      )}

      {/* ── Hidden capture iframe (loads the live React app to snapshot HTML) ── */}
      <iframe
        ref={captureRef}
        title="page-capture"
        style={{ position: 'absolute', top: -9999, left: -9999, width: 1440, height: 900, opacity: 0, pointerEvents: 'none' }}
      />
    </div>
  );
};
