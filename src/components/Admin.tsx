import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { portfolioProjects } from '../data/portfolioData';
import { useEditMode, EDIT_PREFIX } from '../context/EditContext';
import { LogOut, Pencil, ExternalLink, RotateCcw, Lock } from 'lucide-react';

const COMPANY_GRADIENTS: Record<string, string> = {
  'PSA Peugeot Citroën': 'from-slate-700 to-slate-900',
  'Renault':             'from-amber-400 to-orange-600',
  'Glovo':               'from-orange-400 to-yellow-500',
  'HP':                  'from-blue-500 to-blue-800',
  'V+D':                 'from-gray-700 to-black',
  'Momentum':            'from-teal-400 to-cyan-600',
  'SoundJourney':        'from-indigo-500 to-purple-700',
  'AAB Media':           'from-purple-500 to-pink-600',
  'Crown Jewel Marketing': 'from-amber-500 to-yellow-600',
  'WEOP':                'from-emerald-500 to-green-700',
};

function getGradient(company: string) {
  return COMPANY_GRADIENTS[company] ?? 'from-blue-600 to-blue-900';
}

// Check if a case study has a localStorage text override
function hasContentOverride(slug: string): boolean {
  return localStorage.getItem(EDIT_PREFIX + `case-study:${slug}`) !== null ||
         localStorage.getItem(EDIT_PREFIX + `images:${slug}`) !== null;
}

export const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, elevate, adminLogout } = useEditMode();

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [filter, setFilter] = useState<'all' | 'edited'>('all');

  // Sync Supabase session → EditContext admin state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s) elevate();
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s) elevate();
      else adminLogout();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    adminLogout();
  };

  const handleResetOverride = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm(`Reset all content overrides for "${slug}"?`)) return;
    [
      EDIT_PREFIX + `case-study:${slug}`,
      EDIT_PREFIX + `images:${slug}`,
      EDIT_PREFIX + `cover:${slug}`,
    ].forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  const handleEditCase = (slug: string) => {
    navigate(`/work/${slug}`);
  };

  if (loading) return (
    <div className="pt-32 text-center text-gray-400 text-sm">Loading…</div>
  );

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-cardborder">
          <div className="flex items-center gap-2 justify-center mb-6">
            <Lock size={18} className="text-blue-600" />
            <h2 className="text-2xl font-heading font-bold">Admin Login</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setLoginError(''); }}
                className="w-full px-4 py-2 rounded-lg border border-cardborder focus:ring-2 focus:ring-primary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-grey mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setLoginError(''); }}
                className="w-full px-4 py-2 rounded-lg border border-cardborder focus:ring-2 focus:ring-primary outline-none"
                required
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-xs text-grey text-center">
            Use your Supabase account credentials.
          </p>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  const displayed = filter === 'edited'
    ? portfolioProjects.filter(p => hasContentOverride(p.slug))
    : portfolioProjects;

  return (
    <div className="pt-28 pb-20 px-6 sm:px-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Content Admin</h1>
          <p className="text-sm text-gray-400 mt-1">
            {session.user.email} · {portfolioProjects.length} case studies
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
            <Pencil size={11} /> Inline editor active — use the pencil on any page
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-grey hover:text-primary transition-colors text-sm"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        {(['all', 'edited'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? `All (${portfolioProjects.length})` : `Edited (${portfolioProjects.filter(p => hasContentOverride(p.slug)).length})`}
          </button>
        ))}
      </div>

      {/* Case study grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {displayed.map(project => {
          const edited = hasContentOverride(project.slug);
          return (
            <div
              key={project.slug}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className={`h-28 bg-gradient-to-br ${getGradient(project.company)} flex items-end p-3 relative`}>
                {edited && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Edited
                  </span>
                )}
                <div>
                  <div className="text-white/70 text-[9px] font-bold uppercase tracking-widest mb-0.5">{project.company}</div>
                  <div className="text-white text-xs font-semibold leading-tight line-clamp-2">{project.title}</div>
                </div>
              </div>

              {/* Meta */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-50 text-blue-600 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {Array.isArray(project.discipline)
                      ? (project.discipline as string[])[0]
                      : (project.discipline as string)?.split('·')[0].trim()}
                  </span>
                  <span className="text-gray-300 text-xs">{project.year}</span>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => handleEditCase(project.slug)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                  >
                    <Pencil size={11} /> Edit
                  </button>
                  <Link
                    to={`/work/${project.slug}`}
                    target="_blank"
                    className="flex items-center justify-center w-9 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-lg transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink size={13} />
                  </Link>
                  {edited && (
                    <button
                      onClick={e => handleResetOverride(project.slug, e)}
                      className="flex items-center justify-center w-9 bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Reset content overrides"
                    >
                      <RotateCcw size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {displayed.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-2xl">
            No edited case studies yet.
          </div>
        )}
      </div>

      {/* Global reset */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Content overrides are stored in browser localStorage. Use the pencil icon on any page to make edits.
        </p>
        <button
          onClick={() => {
            if (!confirm('Reset ALL content overrides across the entire site?')) return;
            Object.keys(localStorage)
              .filter(k => k.startsWith(EDIT_PREFIX))
              .forEach(k => localStorage.removeItem(k));
            window.location.reload();
          }}
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors"
        >
          <RotateCcw size={12} /> Reset all overrides
        </button>
      </div>
    </div>
  );
};
