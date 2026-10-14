import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Calendar, FileText, X } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminBlogsTab() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const initialFormState = {
    title: '',
    category: 'Visa Policy & Trends',
    summary: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    source: 'SkyGlobal HR Market Intelligence'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingBlogId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlogId(blog.id);
    setFormData({
      title: blog.title,
      category: blog.category,
      summary: blog.summary,
      content: blog.content,
      image: blog.image,
      source: blog.source
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBlogId) {
      updateBlog(editingBlogId, formData);
    } else {
      addBlog(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Manage Visa News & Immigration Articles
          </h2>
          <p className="text-xs text-slate-500">
            Publish legal updates, European policy alerts, and global hiring trend reports.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd300] to-[#f9c913] hover:from-[#ffdf47] hover:to-[#ffd300] text-[#020024] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div 
            key={blog.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="h-40 overflow-hidden relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 text-[#ffd300] text-[10px] font-bold">
                  {blog.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] text-slate-400 block">{blog.date} • {blog.source}</span>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                  {blog.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-3">
                  {blog.summary}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
              <span className="text-slate-400 text-[11px]">ID: {blog.id}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(blog)}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete article "${blog.title}"?`)) {
                      deleteBlog(blog.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {editingBlogId ? 'Edit Article' : 'Publish New Article'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter article details and content.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Australia Subclass 407 Visa Update"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    placeholder="Visa Policy"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Source / Attribution</label>
                  <input
                    type="text"
                    placeholder="Department of Home Affairs"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="1-2 sentences for card previews..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Content *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Full article content and legal guidelines..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-[#020024] bg-gradient-to-r from-[#ffd300] to-[#f9c913] hover:from-[#ffdf47] hover:to-[#ffd300] font-bold shadow-md shadow-[#ffd300]/25"
                >
                  {editingBlogId ? 'Save Changes' : 'Publish Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
