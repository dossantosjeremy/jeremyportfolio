import React, { useState, useEffect } from 'react';
import { supabase, Project } from '../lib/supabase';
import { Plus, Trash2, Edit2, LogOut, Save, X } from 'lucide-react';

export const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchProjects();
    }
  }, [session]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching projects:', error);
    else setProjects(data || []);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const projectData = {
      title: editingProject.title,
      description: editingProject.description,
      image_url: editingProject.image_url,
      category: editingProject.category,
      link: editingProject.link,
    };

    let error;
    if (editingProject.id) {
      ({ error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editingProject.id));
    } else {
      ({ error } = await supabase
        .from('projects')
        .insert([projectData]));
    }

    if (error) {
      alert(error.message);
    } else {
      setEditingProject(null);
      setIsAdding(false);
      fetchProjects();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) alert(error.message);
    else fetchProjects();
  };

  if (loading) return <div className="pt-32 text-center">Loading...</div>;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-cardborder">
          <h2 className="text-3xl font-heading font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-grey mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-cardborder focus:ring-2 focus:ring-primary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-grey mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-cardborder focus:ring-2 focus:ring-primary outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-xs text-grey text-center">
            Note: You must create an account in your Supabase dashboard first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-heading font-bold">Portfolio CMS</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-grey hover:text-primary transition-colors"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Projects</h2>
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingProject({});
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} /> Add Project
        </button>
      </div>

      {(isAdding || editingProject?.id) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editingProject?.id ? 'Edit Project' : 'New Project'}</h3>
              <button onClick={() => { setEditingProject(null); setIsAdding(false); }} className="text-grey hover:text-text">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-grey mb-1">Title</label>
                <input
                  type="text"
                  value={editingProject?.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-cardborder outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-grey mb-1">Category</label>
                <input
                  type="text"
                  value={editingProject?.category || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-cardborder outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-grey mb-1">Description</label>
                <textarea
                  value={editingProject?.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-cardborder outline-none focus:ring-2 focus:ring-primary h-32"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-grey mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingProject?.image_url || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-cardborder outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-grey mb-1">Project Link (Optional)</label>
                <input
                  type="url"
                  value={editingProject?.link || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-cardborder outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <Save size={20} /> Save Project
                </button>
                <button
                  type="button"
                  onClick={() => { setEditingProject(null); setIsAdding(false); }}
                  className="flex-1 bg-surface text-text py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-xl border border-cardborder shadow-sm flex flex-col">
            <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-1">{project.title}</h3>
            <p className="text-grey text-sm mb-4 line-clamp-2">{project.description}</p>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-label text-primary bg-primary/10 px-2 py-1 rounded">
                {project.category}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProject(project)}
                  className="p-2 text-grey hover:text-primary transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-grey hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-cardborder rounded-2xl text-grey">
            No projects found. Click "Add Project" to get started.
          </div>
        )}
      </div>
    </div>
  );
};
