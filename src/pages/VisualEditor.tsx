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

  // ── Claude chat state ──────────────────────────────────────────────────────
  const [chatOpen,    setChatOpen]    = useState(false);
  const [chatMsgs,    setChatMsgs]    = useState<{role:'user'|'assistant';content:string}[]>([]);
  const [chatInput,   setChatInput]   = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [apiKey,      setApiKey]      = useState(() => localStorage.getItem('claude-api-key') ?? '');
  const [showKeyInput,setShowKeyInput]= useState(false);
  const [selectedLabel,setSelectedLabel] = useState<string|null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

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
    });

    editorRef.current = editor;

    // Track selected element for Claude context
    editor.on('component:selected',   (c: any) => setSelectedLabel(c?.getName?.() ?? 'element'));
    editor.on('component:deselected', ()        => setSelectedLabel(null));

    // ── Custom blocks ───────────────────────────────────────────────────────
    const bm = editor.BlockManager;
    // Remove the generic default blocks to avoid duplication
    ['column1','column2','column3','column3-7','text','link','image','video','map','link-block','quote','text-basic'].forEach(id => {
      try { bm.remove(id); } catch { /* ignore if not present */ }
    });

    const icon = (svg: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">${svg}</svg>`;

    // Layout
    bm.add('section-1', {
      label: '1 Section',   category: 'Layout',
      media: icon('<rect x="2" y="4" width="20" height="16" rx="2"/>'),
      content: '<section style="padding:64px 32px"><div style="max-width:1120px;margin:0 auto"><p>Section content goes here.</p></div></section>',
    });
    bm.add('section-2', {
      label: '1/2 Section',  category: 'Layout',
      media: icon('<rect x="2" y="4" width="9" height="16" rx="1"/><rect x="13" y="4" width="9" height="16" rx="1"/>'),
      content: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;padding:64px 32px"><div><p>Left column</p></div><div><p>Right column</p></div></div>',
    });
    bm.add('section-3', {
      label: '1/3 Section', category: 'Layout',
      media: icon('<rect x="2" y="4" width="5.5" height="16" rx="1"/><rect x="9.25" y="4" width="5.5" height="16" rx="1"/><rect x="16.5" y="4" width="5.5" height="16" rx="1"/>'),
      content: '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;padding:64px 32px"><div><p>Column 1</p></div><div><p>Column 2</p></div><div><p>Column 3</p></div></div>',
    });
    bm.add('section-37', {
      label: '3/7 Section', category: 'Layout',
      media: icon('<rect x="2" y="4" width="8" height="16" rx="1"/><rect x="12" y="4" width="10" height="16" rx="1"/>'),
      content: '<div style="display:grid;grid-template-columns:3fr 4fr;gap:32px;padding:64px 32px"><div><p>Sidebar</p></div><div><p>Main content</p></div></div>',
    });

    // Content
    bm.add('text', {
      label: 'Text', category: 'Content',
      media: icon('<path d="M4 6h16M4 10h16M4 14h10"/>'),
      content: '<p style="font-size:16px;line-height:1.7;color:#1d1d1f">Your text here.</p>',
    });
    bm.add('heading', {
      label: 'Heading', category: 'Content',
      media: icon('<path d="M4 6h4m0 0v12m0-6h8m0-6h4m0 0v12"/>'),
      content: '<h2 style="font-size:2rem;font-weight:700;letter-spacing:-0.02em;color:#1d1d1f;margin-bottom:16px">Section heading</h2>',
    });
    bm.add('text-section', {
      label: 'Text Section', category: 'Content',
      media: icon('<path d="M4 5h16M4 9h12M4 13h16M4 17h8"/>'),
      content: '<div style="padding:64px 32px"><div style="max-width:680px"><p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#0066cc;margin-bottom:12px">Label</p><h2 style="font-size:2rem;font-weight:700;color:#1d1d1f;margin-bottom:16px">Section heading</h2><p style="font-size:18px;line-height:1.7;color:#86868b">Supporting body copy that describes the section in more detail.</p></div></div>',
    });
    bm.add('quote', {
      label: 'Quote', category: 'Content',
      media: icon('<path d="M3 21l2-6a9 9 0 1 1 3.2 3.2L3 21"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>'),
      content: '<blockquote style="border-left:4px solid #0066cc;padding:16px 24px;margin:24px 0;background:#f5f5f7;border-radius:0 12px 12px 0"><p style="font-style:italic;color:#86868b;line-height:1.7">An insightful quote or callout text.</p></blockquote>',
    });
    bm.add('image', {
      label: 'Image', category: 'Content',
      media: icon('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>'),
      content: '<figure style="margin:24px 0"><img src="https://placehold.co/1200x600" alt="Image" style="width:100%;border-radius:16px;display:block"/><figcaption style="text-align:center;font-size:12px;color:#86868b;margin-top:8px">Image caption</figcaption></figure>',
    });
    bm.add('divider', {
      label: 'Divider', category: 'Content',
      media: icon('<line x1="3" y1="12" x2="21" y2="12"/>'),
      content: '<hr style="border:none;border-top:1px solid #d2d2d7;margin:32px 0"/>',
    });

    // Interactive
    bm.add('button', {
      label: 'Button', category: 'Interactive',
      media: icon('<rect x="3" y="8" width="18" height="8" rx="9999"/><path d="M8 12h8"/>'),
      content: '<a href="#" style="display:inline-block;background:#0066cc;color:#fff;padding:14px 28px;border-radius:9999px;font-size:16px;font-weight:500;text-decoration:none">Button label</a>',
    });
    bm.add('link', {
      label: 'Link', category: 'Interactive',
      media: icon('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
      content: '<a href="#" style="color:#0066cc;font-size:16px;text-decoration:none">Link text →</a>',
    });
    bm.add('link-block', {
      label: 'Link Block', category: 'Interactive',
      media: icon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 13a5 5 0 0 0 7.54.54l1-1"/><path d="M14 11a5 5 0 0 0-7.54-.54l-1 1"/>'),
      content: '<a href="#" style="display:block;padding:24px;border:1px solid #d2d2d7;border-radius:16px;text-decoration:none;color:inherit"><p style="font-weight:600;color:#1d1d1f;margin-bottom:6px">Card title</p><p style="font-size:14px;color:#86868b">Short description</p></a>',
    });

    // Grid / List
    bm.add('grid-items', {
      label: 'Grid Items', category: 'Collections',
      media: icon('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'),
      content: '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding:32px 0">' +
        ['1','2','3'].map(() => '<div style="border:1px solid #d2d2d7;border-radius:16px;padding:24px"><p style="font-weight:600;color:#1d1d1f;margin-bottom:8px">Card title</p><p style="font-size:14px;color:#86868b">Card description text goes here.</p></div>').join('') +
        '</div>',
    });
    bm.add('list-items', {
      label: 'List Items', category: 'Collections',
      media: icon('<line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor"/><circle cx="4" cy="12" r="1.5" fill="currentColor"/><circle cx="4" cy="18" r="1.5" fill="currentColor"/>'),
      content: '<ul style="list-style:none;padding:0;margin:0">' +
        ['Item one','Item two','Item three'].map(t => `<li style="display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid #d2d2d7"><span style="width:8px;height:8px;border-radius:50%;background:#0066cc;flex-shrink:0;margin-top:6px"></span><span style="color:#1d1d1f">${t}</span></li>`).join('') +
        '</ul>',
    });

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

  // ── Claude chat ────────────────────────────────────────────────────────────
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMsgs]);

  const handleClaudeChat = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;

    const selected    = editorRef.current?.getSelected();
    const selectedHtml = selected ? selected.toHTML() : null;

    const userMsg = { role: 'user' as const, content: text };
    setChatMsgs(prev => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    const system = `You are a web design assistant helping refine Jeremy Dos Santos' portfolio site.
Design tokens: primary #0066cc, text #1d1d1f, grey #86868b, surface #f5f5f7, border #d2d2d7.
Font: -apple-system / SF Pro. Apple-influenced minimalism — generous whitespace, tight type.
Card radius 24px, button radius 9999px, section padding 96px top+bottom.
${selectedHtml ? `\nCurrently selected element:\n\`\`\`html\n${selectedHtml.slice(0, 3000)}\n\`\`\`` : ''}
When returning modified HTML wrap it in a single fenced block: \`\`\`html ... \`\`\`
For copy-only changes just return the text. Be concise and direct.`;

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 2048,
          system,
          messages: [...chatMsgs, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text ?? data.error?.message ?? 'No response received.';
      setChatMsgs(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setChatMsgs(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    }
    setChatLoading(false);
  };

  const applyClaudeHtml = (msgContent: string) => {
    const match = msgContent.match(/```html\n([\s\S]*?)```/);
    if (!match) return;
    const html = match[1].trim();
    const sel  = editorRef.current?.getSelected();
    if (sel) {
      sel.replaceWith(html);
    } else {
      editorRef.current?.setComponents(html);
    }
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

        <div style={{ width: 1, height: 20, background: '#2a2a2a', margin: '0 4px' }} />

        {/* ── Ask Claude button ── */}
        <button
          onClick={() => setChatOpen(o => !o)}
          style={{
            padding: '5px 14px', borderRadius: 9999, fontSize: 12, fontWeight: 600,
            background: chatOpen ? '#4c1d95' : 'transparent',
            color: chatOpen ? '#e9d5ff' : '#a78bfa',
            border: '1px solid #4c1d95',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          ✦ Claude{selectedLabel ? ` · ${selectedLabel}` : ''}
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

      {/* ── Claude chat panel ── */}
      {chatOpen && (
        <div style={{
          position: 'absolute', right: 0, top: 48, bottom: 0, width: 340,
          background: '#111', borderLeft: '1px solid #2a2a2a',
          display: 'flex', flexDirection: 'column', zIndex: 20,
        }}>
          {/* Header */}
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <span style={{ color: '#a78bfa', fontSize: 13, fontWeight: 600 }}>✦ Ask Claude</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => setShowKeyInput(s => !s)}
                style={{ fontSize: 10, color: apiKey ? '#4ade80' : '#f87171', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {apiKey ? '● key set' : '● no key'}
              </button>
              <button onClick={() => setChatOpen(false)} style={{ color: '#555', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '0 2px' }}>×</button>
            </div>
          </div>

          {/* API key input */}
          {showKeyInput && (
            <div style={{ padding: '10px 14px', borderBottom: '1px solid #2a2a2a', background: '#0d0d0d', flexShrink: 0 }}>
              <p style={{ fontSize: 10, color: '#666', marginBottom: 6 }}>Anthropic API key — stored in this browser only</p>
              <input
                type="password"
                placeholder="sk-ant-api03-…"
                value={apiKey}
                onChange={e => { setApiKey(e.target.value); localStorage.setItem('claude-api-key', e.target.value); }}
                style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, padding: '6px 10px', color: '#ccc', fontSize: 11, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          )}

          {/* Selected element indicator */}
          {selectedLabel && (
            <div style={{ padding: '5px 14px', background: '#1a0a2e', borderBottom: '1px solid #2a2a2a', fontSize: 10, color: '#a78bfa', flexShrink: 0 }}>
              ↳ <strong>{selectedLabel}</strong> selected — Claude has its HTML as context
            </div>
          )}

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {chatMsgs.length === 0 && (
              <div style={{ color: '#444', fontSize: 11, lineHeight: 1.7 }}>
                <p style={{ color: '#666', marginBottom: 8 }}>Select an element on the canvas, then ask Claude to refine it.</p>
                <p>Try:<br />
                  · "Rewrite this copy to sound more confident"<br />
                  · "Make this section more minimal"<br />
                  · "Add a subtle divider below this heading"<br />
                  · "Improve the visual hierarchy here"
                </p>
              </div>
            )}

            {chatMsgs.map((msg, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{
                  padding: '8px 12px', borderRadius: msg.role === 'user' ? '10px 10px 3px 10px' : '10px 10px 10px 3px',
                  background: msg.role === 'user' ? '#0066cc' : '#1e1e1e',
                  color: msg.role === 'user' ? '#fff' : '#ccc',
                  fontSize: 12, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                }}>
                  {msg.content.replace(/```html[\s\S]*?```/g, '[→ HTML block ready to apply]')}
                </div>
                {msg.role === 'assistant' && /```html/.test(msg.content) && (
                  <button
                    onClick={() => applyClaudeHtml(msg.content)}
                    style={{ alignSelf: 'flex-start', padding: '4px 12px', borderRadius: 9999, fontSize: 10, fontWeight: 600, background: '#16a34a', color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    ↳ Apply to {editorRef.current?.getSelected() ? 'selected element' : 'page'}
                  </button>
                )}
              </div>
            ))}

            {chatLoading && (
              <div style={{ color: '#555', fontSize: 11 }}>Claude is thinking…</div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '10px 14px', borderTop: '1px solid #2a2a2a', display: 'flex', gap: 8, flexShrink: 0 }}>
            <textarea
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleClaudeChat(); } }}
              placeholder={apiKey ? 'Ask Claude to refine… (Enter to send)' : 'Set your API key first ↑'}
              disabled={!apiKey}
              rows={2}
              style={{ flex: 1, background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '7px 10px', color: '#ccc', fontSize: 11, resize: 'none', outline: 'none', lineHeight: 1.5 }}
            />
            <button
              onClick={handleClaudeChat}
              disabled={chatLoading || !chatInput.trim() || !apiKey}
              style={{
                padding: '0 14px', borderRadius: 8, fontSize: 11, fontWeight: 600,
                background: '#6d28d9', color: '#fff', border: 'none',
                cursor: chatLoading || !chatInput.trim() || !apiKey ? 'not-allowed' : 'pointer',
                opacity: chatLoading || !chatInput.trim() || !apiKey ? 0.4 : 1,
                alignSelf: 'stretch',
              }}
            >
              Send
            </button>
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
