import React, { useState, useMemo } from 'react';
import { 
  Camera, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Calendar, 
  MapPin, 
  Upload, 
  Image as ImageIcon, 
  X, 
  CheckCircle, 
  Clock, 
  Filter, 
  ExternalLink,
  Crown,
  ShieldCheck,
  Eye,
  RotateCcw
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';

export default function AdminGalleryTab() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, galleryCategories } = useCMS();
  const { isSuperAdmin, currentUser } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedTimeframeFilter, setSelectedTimeframeFilter] = useState('All Timeframes');
  const [toastMsg, setToastMsg] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const initialFormState = {
    title: '',
    category: 'Visa Handovers',
    timeframe: 'October 2026',
    date: new Date().toISOString().split('T')[0],
    location: 'SkyGlobal Operations Center, Dubai, UAE',
    image: '',
    description: '',
    tags: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // Extract unique timeframes
  const availableTimeframes = useMemo(() => {
    const set = new Set();
    gallery.forEach(item => {
      if (item.timeframe) set.add(item.timeframe);
    });
    return ['All Timeframes', ...Array.from(set)];
  }, [gallery]);

  // Filter gallery items
  const filteredItems = useMemo(() => {
    return gallery.filter(item => {
      const matchesSearch = 
        (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter;
      const matchesTime = selectedTimeframeFilter === 'All Timeframes' || item.timeframe === selectedTimeframeFilter;

      return matchesSearch && matchesCat && matchesTime;
    });
  }, [gallery, searchTerm, selectedCategoryFilter, selectedTimeframeFilter]);

  const handleOpenAdd = () => {
    setEditingItemId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItemId(item.id);
    setFormData({
      title: item.title || '',
      category: item.category || 'Visa Handovers',
      timeframe: item.timeframe || 'October 2026',
      date: item.date || new Date().toISOString().split('T')[0],
      location: item.location || '',
      image: item.image || '',
      description: item.description || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || '')
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete the gallery photo "${title}"?`)) {
      deleteGalleryItem(id);
      setToastMsg(`Deleted gallery item: "${title}".`);
      setTimeout(() => setToastMsg(''), 3500);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image.trim()) {
      alert('Please provide an image URL or upload a file.');
      return;
    }

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingItemId) {
      updateGalleryItem(editingItemId, payload);
      setToastMsg(`Updated photo "${formData.title}" in time frame ${formData.timeframe}.`);
    } else {
      addGalleryItem(payload);
      setToastMsg(`Uploaded new photo "${formData.title}" for time frame ${formData.timeframe}.`);
    }

    setIsModalOpen(false);
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#020024] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#a99410] flex items-center gap-2.5 animate-bounce text-xs font-bold">
          <CheckCircle className="w-4 h-4 text-[#a99410]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Manage Photographic Gallery
            </h2>
            {isSuperAdmin ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#020024] bg-[#faf8ee] border border-[#a99410]/50 px-2.5 py-0.5 rounded-full shadow-xs">
                <Crown className="w-3 h-3 text-[#a99410]" />
                Super Admin
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#101a6d] bg-[#e5f2f9] border border-[#25c0f3]/40 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-[#101a6d]" />
                Admin
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Upload and organize candidate deployment milestones, visa handovers, and corporate photos grouped by time frames.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-[#020024] font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#a99410]/25 transition-all cursor-pointer transform hover:-translate-y-0.5 shrink-0"
        >
          <Plus className="w-4 h-4 text-[#020024]" />
          <span>Upload Image to Time Frame</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm text-xs">
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Photos
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 font-display">
            {gallery.length}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">Archived Records</span>
        </div>

        <div className="bg-[#faf8ee] p-3.5 rounded-2xl border border-[#a99410]/40">
          <span className="text-[10px] font-bold text-[#a99410] uppercase tracking-wider block mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#a99410]" />
            Time Frames
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#020024] font-display">
            {availableTimeframes.length - 1}
          </span>
          <span className="text-[11px] text-[#8e7c0c] font-semibold block mt-0.5">Deployment Periods</span>
        </div>

        <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200">
          <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
            Categories
          </span>
          <span className="text-xl sm:text-2xl font-black text-blue-900 font-display">
            {galleryCategories.length - 1}
          </span>
          <span className="text-[11px] text-blue-600 block mt-0.5">Event Themes</span>
        </div>

        <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            Latest Upload
          </span>
          <span className="text-sm font-black text-emerald-950 font-display truncate block mt-1">
            {gallery[0]?.timeframe || 'N/A'}
          </span>
          <span className="text-[11px] text-emerald-700 block mt-0.5">
            {gallery[0]?.date || 'Recently'}
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by photo caption, location, or milestone..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#a99410]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-semibold whitespace-nowrap">Category:</span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#a99410] cursor-pointer"
          >
            {galleryCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Timeframe Filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-semibold whitespace-nowrap">Time Frame:</span>
          <select
            value={selectedTimeframeFilter}
            onChange={(e) => setSelectedTimeframeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#a99410] cursor-pointer"
          >
            {availableTimeframes.map(tf => (
              <option key={tf} value={tf}>{tf}</option>
            ))}
          </select>
        </div>

        {(searchTerm || selectedCategoryFilter !== 'All' || selectedTimeframeFilter !== 'All Timeframes') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategoryFilter('All');
              setSelectedTimeframeFilter('All Timeframes');
            }}
            className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Gallery Cards Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            Gallery Records ({filteredItems.length} of {gallery.length})
          </h3>
          <span className="text-xs text-slate-400">
            Managed by SkyGlobal Super Admin & Admin Team
          </span>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-bold text-[#020024] bg-[#faf8ee] px-2 py-0.5 rounded shadow-sm border border-[#a99410]/50 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5 text-[#a99410]" />
                      {item.timeframe}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="text-[9px] font-bold text-white bg-[#101a6d]/90 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setPreviewImage(item)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white text-xs font-bold gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Photo</span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1 truncate max-w-[65%]">
                      <MapPin className="w-3 h-3 text-[#a99410] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span>{item.date}</span>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3 text-slate-600" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1.5 rounded-lg text-rose-600 bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400">
            <ImageIcon className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-xs font-semibold">No gallery images found.</p>
          </div>
        )}
      </div>

      {/* Upload / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#101a6d] via-[#0b1456] to-[#020024] text-white p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold font-display">
                {editingItemId ? 'Edit Gallery Photo' : 'Upload Image to Time Frame'}
              </h3>
              <p className="text-xs text-[#a99410] mt-0.5">
                SkyGlobal Overseas Deployment & Event Archives
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Photo Title / Caption *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Malta Single Work Permit Handover Ceremony"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a99410]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Event Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#a99410]"
                  >
                    {galleryCategories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time Frame Period *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. October 2026, Q3 2026, Summer 2026"
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specific Event Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SkyGlobal Dubai HQ, UAE"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>
              </div>

              {/* Image Input Options */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Image Source (Upload File or Enter URL) *
                </label>
                
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste image URL (https://...)"
                    value={formData.image.startsWith('data:') ? '' : formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#a99410]"
                  />
                  <label className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#a99410]" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Preview Thumbnail */}
                {formData.image && (
                  <div className="mt-2 relative rounded-2xl overflow-hidden border border-slate-200 aspect-video max-h-48 bg-slate-900">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded">
                        Preview
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Milestone Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide context regarding this deployment, visa handover, trade test or delegation..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a99410]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Malta, Visa Handover, 2026, Technicians"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#a99410]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-[#020024] font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  {editingItemId ? 'Save Changes' : 'Publish to Gallery'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Admin Quick Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="bg-slate-900 rounded-3xl overflow-hidden max-w-2xl w-full border border-white/20 shadow-2xl relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full bg-black/40 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video bg-black">
              <img src={previewImage.image} alt={previewImage.title} className="w-full h-full object-contain" />
            </div>
            <div className="p-5 space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#a99410] font-bold">
                <span>{previewImage.timeframe}</span>
                <span>•</span>
                <span>{previewImage.category}</span>
              </div>
              <h4 className="text-base font-bold">{previewImage.title}</h4>
              <p className="text-xs text-slate-300">{previewImage.description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
