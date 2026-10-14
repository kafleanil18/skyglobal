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
  Images, 
  X, 
  CheckCircle, 
  Clock, 
  Filter, 
  ExternalLink,
  Crown,
  ShieldCheck,
  Eye,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles
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
  
  // Quick Preview state
  const [previewEvent, setPreviewEvent] = useState(null);
  const [previewPhotoIndex, setPreviewPhotoIndex] = useState(0);

  const initialFormState = {
    title: '',
    category: 'Visa Handovers',
    timeframe: 'October 2026',
    date: new Date().toISOString().split('T')[0],
    location: 'SkyGlobal Operations Center, Dubai, UAE',
    images: [],
    urlInput: '',
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

  // Total photos across all event albums
  const totalPhotosCount = useMemo(() => {
    return gallery.reduce((acc, item) => {
      const count = Array.isArray(item.images) && item.images.length > 0 
        ? item.images.length 
        : item.image ? 1 : 0;
      return acc + count;
    }, 0);
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
    const itemImages = Array.isArray(item.images) && item.images.length > 0
      ? item.images
      : item.image ? [item.image] : [];

    setFormData({
      title: item.title || '',
      category: item.category || 'Visa Handovers',
      timeframe: item.timeframe || 'October 2026',
      date: item.date || new Date().toISOString().split('T')[0],
      location: item.location || '',
      images: itemImages,
      urlInput: '',
      description: item.description || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || '')
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete the event album "${title}"?`)) {
      deleteGalleryItem(id);
      setToastMsg(`Deleted event album: "${title}".`);
      setTimeout(() => setToastMsg(''), 3500);
    }
  };

  // Multiple File Upload Handler
  const handleMultipleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result]
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  // Add Photo by URL
  const handleAddImageUrl = (e) => {
    e?.preventDefault();
    if (!formData.urlInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, prev.urlInput.trim()],
      urlInput: ''
    }));
  };

  // Remove Photo from Event
  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Set Photo as Event Cover
  const handleSetCoverImage = (indexToCover) => {
    setFormData(prev => {
      const selected = prev.images[indexToCover];
      const rest = prev.images.filter((_, idx) => idx !== indexToCover);
      return {
        ...prev,
        images: [selected, ...rest]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert('Please upload or add at least one photo for this event.');
      return;
    }

    const payload = {
      ...formData,
      image: formData.images[0],
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingItemId) {
      updateGalleryItem(editingItemId, payload);
      setToastMsg(`Updated event "${formData.title}" with ${formData.images.length} photos in ${formData.timeframe}.`);
    } else {
      addGalleryItem(payload);
      setToastMsg(`Published new event "${formData.title}" with ${formData.images.length} photos for ${formData.timeframe}.`);
    }

    setIsModalOpen(false);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const openPreview = (item) => {
    setPreviewEvent(item);
    setPreviewPhotoIndex(0);
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
              Manage Event Gallery & Photo Albums
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
            Upload multiple photos for every candidate deployment, visa handover, or client event. Group photos by time frame periods.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-[#020024] font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#a99410]/25 transition-all cursor-pointer transform hover:-translate-y-0.5 shrink-0"
        >
          <Plus className="w-4 h-4 text-[#020024]" />
          <span>Create Event (Upload Multiple Photos)</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm text-xs">
        <div className="bg-[#faf8ee] p-3.5 rounded-2xl border border-[#a99410]/40">
          <span className="text-[10px] font-bold text-[#a99410] uppercase tracking-wider block mb-1 flex items-center gap-1">
            <Images className="w-3.5 h-3.5 text-[#a99410]" />
            Total Uploaded Photos
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#020024] font-display">
            {totalPhotosCount}
          </span>
          <span className="text-[11px] text-[#8e7c0c] font-semibold block mt-0.5">Across {gallery.length} Event Albums</span>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Event Albums
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 font-display">
            {gallery.length}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">Documented Milestones</span>
        </div>

        <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200">
          <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-700" />
            Time Frames
          </span>
          <span className="text-xl sm:text-2xl font-black text-blue-900 font-display">
            {availableTimeframes.length - 1}
          </span>
          <span className="text-[11px] text-blue-600 block mt-0.5">Periods Tracked</span>
        </div>

        <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            Categories
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-900 font-display">
            {galleryCategories.length - 1}
          </span>
          <span className="text-[11px] text-emerald-700 block mt-0.5">Event Themes</span>
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
            placeholder="Search events by title, batch, or location..."
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
            Event Albums ({filteredItems.length} of {gallery.length})
          </h3>
          <span className="text-xs text-slate-400">
            Click on any event to manage or view photos
          </span>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map(item => {
              const photoCount = Array.isArray(item.images) && item.images.length > 0 
                ? item.images.length 
                : item.image ? 1 : 0;
              const coverPhoto = (item.images && item.images[0]) || item.image;

              return (
                <div 
                  key={item.id}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  {/* Photo Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <img 
                      src={coverPhoto} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Top Timeframe Pill */}
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold text-[#020024] bg-[#faf8ee] px-2 py-0.5 rounded shadow-sm border border-[#a99410]/50 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5 text-[#a99410]" />
                        {item.timeframe}
                      </span>
                    </div>

                    {/* Top Right: Photo Count Badge */}
                    <div className="absolute top-2 right-2 flex items-center gap-1.5">
                      <span className="text-[10px] font-extrabold text-[#020024] bg-white px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-slate-200">
                        <Images className="w-3 h-3 text-[#a99410]" />
                        <span>{photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}</span>
                      </span>
                    </div>

                    {/* Hover to View All Photos */}
                    <button
                      onClick={() => openPreview(item)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white text-xs font-bold gap-1.5"
                    >
                      <Eye className="w-4 h-4 text-[#a99410]" />
                      <span>View All {photoCount} Photos</span>
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                        <span className="font-semibold text-[#101a6d] bg-[#e5f2f9] px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span>{item.date}</span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                      <span className="flex items-center gap-1 truncate max-w-[70%]">
                        <MapPin className="w-3 h-3 text-[#a99410] shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3 text-slate-600" />
                        <span>Edit Album ({photoCount})</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-1.5 rounded-lg text-rose-600 bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                        title="Delete Event Album"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400">
            <ImageIcon className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-xs font-semibold">No event albums found.</p>
          </div>
        )}
      </div>

      {/* Upload Multiple Photos / Edit Event Album Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#101a6d] via-[#0b1456] to-[#020024] text-white p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Images className="w-5 h-5 text-[#a99410]" />
                <h3 className="text-lg font-bold font-display">
                  {editingItemId ? 'Edit Event Album & Photos' : 'Create Event Album (Upload Multiple Photos)'}
                </h3>
              </div>
              <p className="text-xs text-[#a99410] mt-0.5">
                SkyGlobal Overseas Deployment & Event Archives
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Event Title / Caption *
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

              {/* MULTIPLE PHOTO UPLOAD SECTION */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Images className="w-4 h-4 text-[#a99410]" />
                      <span>Event Photos Album ({formData.images.length} photos attached)</span>
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Upload multiple photo files at once or paste external image URLs.
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-[#101a6d] bg-[#e5f2f9] px-2.5 py-1 rounded-lg border border-[#25c0f3]/30">
                    {formData.images.length === 0 ? 'No photos yet' : `${formData.images.length} Photos Selected`}
                  </span>
                </div>

                {/* Upload Buttons & URL Input */}
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  {/* File Upload Button (Multiple) */}
                  <label className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#101a6d] to-[#020024] hover:from-[#182a98] hover:to-[#0b1456] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all">
                    <Upload className="w-4 h-4 text-[#a99410]" />
                    <span>Upload Multiple Photos from Device</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleMultipleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Add Image URL bar */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Or paste photo image URL (https://...)"
                    value={formData.urlInput}
                    onChange={(e) => setFormData({ ...formData, urlInput: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddImageUrl();
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#a99410] bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold shrink-0 transition-colors cursor-pointer"
                  >
                    + Add URL
                  </button>
                </div>

                {/* Photo Thumbnails Tray */}
                {formData.images.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-slate-600 block">
                      Photos in this Event (The first image is the cover photo):
                    </span>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-56 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
                      {formData.images.map((imgSrc, idx) => (
                        <div 
                          key={idx}
                          className={`relative rounded-xl overflow-hidden aspect-square border-2 group bg-slate-900 ${
                            idx === 0 ? 'border-[#a99410] ring-2 ring-[#a99410]/30' : 'border-slate-200'
                          }`}
                        >
                          <img 
                            src={imgSrc} 
                            alt={`Photo ${idx + 1}`} 
                            className="w-full h-full object-cover"
                          />

                          {/* Cover Badge */}
                          {idx === 0 ? (
                            <div className="absolute top-1 left-1 bg-[#a99410] text-[#020024] text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                              <Sparkles className="w-2.5 h-2.5" />
                              Cover
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetCoverImage(idx)}
                              className="absolute top-1 left-1 bg-black/70 hover:bg-[#a99410] text-white hover:text-[#020024] text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Set as Cover Photo"
                            >
                              Make Cover
                            </button>
                          )}

                          {/* Delete Photo Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1 right-1 bg-rose-600/90 hover:bg-rose-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                            title="Remove photo"
                          >
                            <X className="w-3 h-3" />
                          </button>

                          {/* Number badge */}
                          <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded">
                            #{idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Milestone Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="Provide context regarding this deployment, visa handover ceremony, or employer delegation..."
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
                  {editingItemId ? `Save Changes (${formData.images.length} Photos)` : `Publish Album (${formData.images.length} Photos)`}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Admin Multi-Photo Preview Modal */}
      {previewEvent && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewEvent(null)}
        >
          <div 
            className="bg-slate-900 rounded-3xl overflow-hidden max-w-3xl w-full border border-white/20 shadow-2xl relative text-white max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewEvent(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-black/40 hover:bg-white/10 z-20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Active Photo */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              {previewEvent.images && previewEvent.images.length > 0 ? (
                <img 
                  src={previewEvent.images[previewPhotoIndex] || previewEvent.image} 
                  alt={previewEvent.title} 
                  className="w-full h-full object-contain" 
                />
              ) : (
                <img 
                  src={previewEvent.image} 
                  alt={previewEvent.title} 
                  className="w-full h-full object-contain" 
                />
              )}

              {/* Prev / Next photo buttons */}
              {previewEvent.images && previewEvent.images.length > 1 && (
                <>
                  <button
                    onClick={() => setPreviewPhotoIndex(prev => (prev - 1 + previewEvent.images.length) % previewEvent.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#a99410] hover:text-[#020024] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setPreviewPhotoIndex(prev => (prev + 1) % previewEvent.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#a99410] hover:text-[#020024] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Photo counter badge */}
              <div className="absolute bottom-3 right-3 bg-black/70 px-2.5 py-1 rounded-md text-xs font-bold">
                Photo {previewPhotoIndex + 1} of {(previewEvent.images && previewEvent.images.length) || 1}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {previewEvent.images && previewEvent.images.length > 1 && (
              <div className="p-3 bg-slate-950 flex items-center gap-2 overflow-x-auto border-t border-slate-800">
                {previewEvent.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setPreviewPhotoIndex(i)}
                    className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      i === previewPhotoIndex ? 'border-[#a99410] scale-105' : 'border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${i+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Details Footer */}
            <div className="p-5 space-y-1.5 bg-slate-900 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-[#a99410] font-bold">
                <span>{previewEvent.timeframe}</span>
                <span>•</span>
                <span>{previewEvent.category}</span>
                <span>•</span>
                <span className="text-slate-400">{previewEvent.location}</span>
              </div>
              <h4 className="text-base font-bold text-white">{previewEvent.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{previewEvent.description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
