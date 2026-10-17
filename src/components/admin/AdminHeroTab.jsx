import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  Upload, 
  Eye, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  MapPin, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert,
  AlertCircle,
  Loader2,
  Globe,
  FileImage,
  Check
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { FALLBACK_GALLERY_IMAGE, optimizeImageFile } from '../../utils/imageOptimizer';

// Curated high-res Unsplash photography presets for rapid selection
const PHOTO_PRESETS = [
  {
    name: 'Executive Interview & Screening',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    badge: 'Talent Acquisition'
  },
  {
    name: 'Corporate Handshake & Partnership',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    badge: 'Employer Partnership'
  },
  {
    name: 'Legal Contract & Visa Stamping',
    url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    badge: 'Offer & Visa Stamping'
  },
  {
    name: 'International Airport Deployment',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    badge: 'Deployment Ready'
  },
  {
    name: 'Technical Trade & Engineering Assessment',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    badge: 'Technical Trade'
  },
  {
    name: 'Hospitality & Luxury Resort Onboarding',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    badge: 'Hospitality Staffing'
  }
];

export default function AdminHeroTab() {
  const { heroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide, resetHeroSlides } = useCMS();
  const { isSuperAdmin } = useAuth();

  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [currentEditingSlide, setCurrentEditingSlide] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    subtitle: '',
    badge: 'Talent Acquisition',
    location: 'Bur Dubai HQ',
    stat: '100% Vetted Candidates',
    order: 1
  });
  const [formError, setFormError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [photoSourceMode, setPhotoSourceMode] = useState('upload'); // 'upload' | 'url'
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Guard: Super Admin check
  if (!isSuperAdmin) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-amber-900">Super Admin Access Required</h3>
        <p className="text-xs text-amber-700 max-w-md mx-auto">
          Changing the Hero section photoslide is an executive brand privilege reserved exclusively for Super Administrators.
        </p>
      </div>
    );
  }

  const slides = Array.isArray(heroSlides) && heroSlides.length > 0 ? heroSlides : [];
  const safePreviewIndex = slides.length > 0 ? (activePreviewIndex % slides.length) : 0;
  const previewSlide = slides[safePreviewIndex];

  const handleOpenAddModal = () => {
    setFormData({
      url: PHOTO_PRESETS[0].url,
      title: 'Global Talent Acquisition & Screening',
      subtitle: 'Direct employer interviews & skill vetting in Dubai HQ',
      badge: 'Talent Acquisition',
      location: 'Bur Dubai HQ',
      stat: '100% Vetted Candidates',
      order: slides.length + 1
    });
    setPhotoSourceMode('upload');
    setUploadedFileName('');
    setIsProcessingPhoto(false);
    setIsDraggingOver(false);
    setFormError('');
    setModalMode('add');
    setCurrentEditingSlide(null);
  };

  const handleOpenEditModal = (slide) => {
    setCurrentEditingSlide(slide);
    setFormData({
      url: slide.url || '',
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      badge: slide.badge || 'Talent Acquisition',
      location: slide.location || 'Bur Dubai HQ',
      stat: slide.stat || '100% Vetted Candidates',
      order: slide.order !== undefined ? slide.order : 1
    });
    const isDataUrl = slide.url && slide.url.startsWith('data:');
    setPhotoSourceMode(isDataUrl ? 'upload' : 'url');
    setUploadedFileName(isDataUrl ? 'Custom Uploaded Photo' : '');
    setIsProcessingPhoto(false);
    setIsDraggingOver(false);
    setFormError('');
    setModalMode('edit');
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setCurrentEditingSlide(null);
    setFormError('');
    setIsProcessingPhoto(false);
    setIsDraggingOver(false);
    setUploadedFileName('');
  };

  // High-performance photo compressor & decoder (handles JPG, PNG, WebP, HEIC up to 25MB)
  const processImageFile = async (file) => {
    if (!file) return;

    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];
    const isImage = file.type.startsWith('image/') || validExtensions.some(ext => (file.name || '').toLowerCase().endsWith(ext));
    if (!isImage) {
      setFormError('Please select a valid image file (JPG, PNG, WebP, HEIC).');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setFormError('File size exceeds 25MB limit. Please select a photo under 25MB.');
      return;
    }

    setIsProcessingPhoto(true);
    setFormError('');

    try {
      // Auto-compress to high-resolution JPEG Data URL (max 1600px width/height, quality 85%)
      const compressedDataUrl = await optimizeImageFile(file, 1600, 0.85);
      setFormData(prev => ({ ...prev, url: compressedDataUrl }));
      setUploadedFileName(file.name);
      setPhotoSourceMode('upload');
      setFormError('');
    } catch (err) {
      console.error('Photo optimization error:', err);
      setFormError(err.message || 'Could not process photo. Please try a different JPG or PNG image.');
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.url || !formData.url.trim()) {
      setFormError('Please upload a photo from your computer or select an image.');
      return;
    }
    if (!formData.title || !formData.title.trim()) {
      setFormError('Please enter a headline title for this slide.');
      return;
    }

    if (modalMode === 'add') {
      addHeroSlide(formData);
    } else if (modalMode === 'edit' && currentEditingSlide) {
      updateHeroSlide(currentEditingSlide.id, formData);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    handleCloseModal();
  };

  const handleDeleteSlide = (slideId) => {
    if (slides.length <= 1) {
      alert('You cannot delete the only remaining slide. Please add another slide before deleting this one.');
      return;
    }

    if (confirm('Are you sure you want to permanently delete this photo slide from the Hero section?')) {
      deleteHeroSlide(slideId);
      if (safePreviewIndex >= slides.length - 1) {
        setActivePreviewIndex(0);
      }
    }
  };

  const handleMoveSlide = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const currentSlide = slides[index];
    const targetSlide = slides[targetIndex];

    const currentOrder = currentSlide.order !== undefined ? currentSlide.order : index + 1;
    const targetOrder = targetSlide.order !== undefined ? targetSlide.order : targetIndex + 1;

    updateHeroSlide(currentSlide.id, { order: targetOrder });
    updateHeroSlide(targetSlide.id, { order: currentOrder });
  };

  const handleResetToFactory = () => {
    if (confirm('Reset all Hero photo slides back to original 4 factory recruitment slides? Any custom slides will be replaced.')) {
      resetHeroSlides();
      setActivePreviewIndex(0);
      alert('Hero slides reset to default presets.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">
              Hero Section Photoslide Showcase
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#fff8d6] text-[#101a6d] text-[10px] font-bold border border-[#a99410]/50">
              Super Admin Privilege
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Update, edit, upload, reorder, or delete high-resolution photos and headlines featured in the homepage Hero slider.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleResetToFactory}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Restore default recruitment photos"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#101a6d] to-[#0b1456] hover:from-[#15238d] hover:to-[#101a6d] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-slate-900/10 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#a99410]" />
            <span>Add New Photo Slide</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Hero photo slides updated and synced successfully with database!</span>
        </div>
      )}

      {/* Live Interactive Hero Preview */}
      {previewSlide && (
        <div className="bg-gradient-to-br from-[#0b144d] via-[#101a6d] to-[#020024] p-6 rounded-3xl border border-[#25c0f3]/30 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-white/10 text-[#a99410]">
                <Eye className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-extrabold font-display text-white">Live Hero Showcase Preview</h3>
                <p className="text-[11px] text-[#b6eafb]/80">Exact visual rendering as displayed to visitors on the public homepage</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white bg-black/40 px-2.5 py-1 rounded-full border border-white/20">
                Slide {safePreviewIndex + 1} of {slides.length}
              </span>
              <button
                type="button"
                onClick={() => setActivePreviewIndex(prev => (prev - 1 + slides.length) % slides.length)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewIndex(prev => (prev + 1) % slides.length)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rendered Slide Card - Consistent Aspect Ratio matching Homepage */}
          <div className="relative aspect-[16/10] max-h-[440px] w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/20 shadow-2xl">
            <img 
              src={previewSlide.url} 
              alt={previewSlide.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_GALLERY_IMAGE;
              }}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020024] via-black/25 to-black/30 pointer-events-none" />

            {/* Top Badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-2 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#020024] bg-white/95 px-3 py-1 rounded-full border border-[#a99410]/50 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{previewSlide.badge || 'Talent Acquisition'}</span>
              </span>
            </div>

            {/* Bottom Card */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 p-4 rounded-xl bg-[#09113d]/90 backdrop-blur-xl border border-white/15 shadow-xl text-left space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight line-clamp-1">
                  {previewSlide.title}
                </h4>
                <span className="text-[11px] text-[#a99410] font-black shrink-0 bg-[#a99410]/15 px-2.5 py-0.5 rounded-full border border-[#a99410]/30">
                  {previewSlide.stat}
                </span>
              </div>
              <p className="text-xs text-[#b6eafb]/90 line-clamp-1">
                {previewSlide.subtitle}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-300 border-t border-white/10">
                <span className="flex items-center gap-1 text-[#a99410]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-slate-200">{previewSlide.location}</span>
                </span>
                <span className="text-[10px] text-slate-400">Order #{previewSlide.order || safePreviewIndex + 1}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of All Slides */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-800">
            Active Photoslides ({slides.length} Available)
          </h3>
          <span className="text-xs text-slate-500">
            Tip: You can reorder, edit photo URLs, or upload custom images.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slides.map((slide, idx) => (
            <div 
              key={slide.id || idx}
              className={`bg-white rounded-2xl border transition-all overflow-hidden shadow-xs hover:shadow-md flex flex-col justify-between ${
                idx === safePreviewIndex ? 'border-[#101a6d] ring-2 ring-[#101a6d]/20' : 'border-slate-200'
              }`}
            >
              {/* Card Photo & Top Overlay */}
              <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden group">
                <img 
                  src={slide.url} 
                  alt={slide.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_GALLERY_IMAGE;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Badges on Photo */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-white/95 text-[#020024] shadow-sm">
                    #{slide.order || idx + 1} • {slide.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#a99410] text-[#020024] shadow-sm">
                    {slide.stat}
                  </span>
                </div>

                {/* Quick Preview Click */}
                <button
                  type="button"
                  onClick={() => setActivePreviewIndex(idx)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-[11px] font-bold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3 text-[#a99410]" />
                  <span>Preview</span>
                </button>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-snug line-clamp-1">
                    {slide.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {slide.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium mt-2">
                    <MapPin className="w-3 h-3 text-[#a99410]" />
                    <span>{slide.location}</span>
                  </div>
                </div>

                {/* Actions Toolbar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {/* Reordering */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveSlide(idx, -1)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent text-slate-700 transition-colors cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === slides.length - 1}
                      onClick={() => handleMoveSlide(idx, 1)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent text-slate-700 transition-colors cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Edit / Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(slide)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#101a6d]" />
                      <span>Edit Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="p-1.5 rounded-xl hover:bg-rose-50 text-rose-600 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                      title="Delete slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Slide Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#101a6d] via-[#0b1456] to-[#020024] text-white p-6 flex items-center justify-between border-b border-[#25c0f3]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-[#a99410] border border-white/15 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">
                    {modalMode === 'add' ? 'Add New Hero Photoslide' : 'Edit Hero Photo & Content'}
                  </h3>
                  <p className="text-xs text-[#b6eafb]/80">
                    Customize high-resolution image, overlay headlines, and category tags
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Photo Preview & Source Selection */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-800">
                  Slide Photography Preview
                </label>
                <div className="relative aspect-[16/10] w-full rounded-2xl bg-slate-950 overflow-hidden border border-slate-200 shadow-inner group">
                  <img 
                    src={formData.url || FALLBACK_GALLERY_IMAGE} 
                    alt="Preview"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_GALLERY_IMAGE;
                    }}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-full text-[10px] font-black text-[#020024] shadow-sm">
                    {formData.badge}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md text-white p-3 rounded-xl">
                    <p className="font-bold text-xs truncate">{formData.title || 'Slide Title Preview'}</p>
                    <p className="text-[10px] text-slate-300 truncate">{formData.subtitle || 'Slide subtitle preview...'}</p>
                  </div>
                </div>
              </div>

              {/* Photo Source Tabs: Upload from Computer vs Web URL & Presets */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <div>
                    <label className="block font-bold text-slate-800 text-xs">
                      Photo Source
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Upload directly from your device or use an online image
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl shrink-0">
                    <button
                      type="button"
                      onClick={() => setPhotoSourceMode('upload')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        photoSourceMode === 'upload'
                          ? 'bg-white text-[#101a6d] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5 text-[#a99410]" />
                      <span>Upload from Device</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoSourceMode('url')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        photoSourceMode === 'url'
                          ? 'bg-white text-[#101a6d] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5 text-[#101a6d]" />
                      <span>Web URL / Presets</span>
                    </button>
                  </div>
                </div>

                {photoSourceMode === 'upload' ? (
                  /* Upload from Computer Dropzone */
                  <div className="space-y-2">
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                      onDragLeave={() => setIsDraggingOver(false)}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                        isDraggingOver 
                          ? 'border-[#a99410] bg-[#faf8ee] scale-[0.99]' 
                          : 'border-slate-300 hover:border-[#101a6d] bg-white'
                      }`}
                    >
                      {isProcessingPhoto ? (
                        <div className="py-4 space-y-2">
                          <Loader2 className="w-8 h-8 text-[#a99410] animate-spin mx-auto" />
                          <p className="text-xs font-bold text-slate-800">Optimizing & preparing photo...</p>
                          <p className="text-[11px] text-slate-500">Resizing and formatting for crisp, instant homepage loading</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 text-[#101a6d] border border-slate-200 flex items-center justify-center mx-auto shadow-xs">
                            <Upload className="w-6 h-6 text-[#a99410]" />
                          </div>

                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Drag & drop a photo here, or browse your files
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Supports JPG, PNG, WebP, HEIC/HEIF up to 25MB (auto-compressed)
                            </p>
                          </div>

                          {uploadedFileName || (formData.url && formData.url.startsWith('data:')) ? (
                            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="truncate max-w-[200px]">{uploadedFileName || 'Photo Uploaded Ready'}</span>
                              <label className="text-[#101a6d] hover:underline cursor-pointer ml-1 font-extrabold">
                                Change
                                <input
                                  type="file"
                                  accept="image/*,.heic,.heif"
                                  onChange={handleFileUpload}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          ) : (
                            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#101a6d] to-[#020024] hover:from-[#182a98] hover:to-[#0b1456] text-white font-bold text-xs cursor-pointer shadow-sm transition-all transform hover:-translate-y-0.5">
                              <Upload className="w-4 h-4 text-[#a99410]" />
                              <span>Select Photo from Computer</span>
                              <input
                                type="file"
                                accept="image/*,.heic,.heif"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Web Image URL and Preset Selector */
                  <div className="space-y-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Web Image Direct URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={formData.url.startsWith('data:') ? '' : formData.url}
                        onChange={e => {
                          setFormData({ ...formData, url: e.target.value });
                          setUploadedFileName('');
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#a99410] font-mono text-[11px] bg-white"
                      />
                    </div>

                    {/* Quick Preset Selector */}
                    <div className="space-y-1.5">
                      <span className="block text-[11px] font-bold text-slate-500">
                        Or pick a curated recruitment preset:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {PHOTO_PRESETS.map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                url: preset.url,
                                badge: preset.badge
                              }));
                              setUploadedFileName('');
                            }}
                            className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                              formData.url === preset.url ? 'border-[#101a6d] bg-[#101a6d]/5 ring-1 ring-[#101a6d]' : 'border-slate-200 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <img 
                              src={preset.url} 
                              alt={preset.name}
                              className="w-8 h-8 rounded-lg object-cover shrink-0" 
                            />
                            <span className="text-[10px] font-bold text-slate-700 truncate block">
                              {preset.badge}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Headline Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Global Talent Acquisition & Screening"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Subtitle / Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Direct employer interviews & skill vetting in Dubai HQ"
                    value={formData.subtitle}
                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>
              </div>

              {/* Badge, Location, Stat, Order */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category Badge</label>
                  <input
                    type="text"
                    required
                    placeholder="Talent Acquisition"
                    value={formData.badge}
                    onChange={e => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location Tag</label>
                  <input
                    type="text"
                    required
                    placeholder="Bur Dubai HQ"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Key Stat / Metric</label>
                  <input
                    type="text"
                    required
                    placeholder="100% Vetted Candidates"
                    value={formData.stat}
                    onChange={e => setFormData({ ...formData, stat: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={e => setFormData({ ...formData, order: Number(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-[#020024] font-bold shadow-md shadow-[#a99410]/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{modalMode === 'add' ? 'Save & Add Slide' : 'Update Slide'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
