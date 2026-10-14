import React, { useState, useMemo, useEffect } from 'react';
import { 
  Camera, 
  Calendar, 
  MapPin, 
  Filter, 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Tag, 
  Sparkles,
  Clock,
  Layers,
  Images,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function GallerySection() {
  const { gallery, galleryCategories } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState('All Timeframes');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Lightbox State (Event Album + Photo Index within that Album)
  const [lightboxEventIndex, setLightboxEventIndex] = useState(null);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(0);

  // Extract unique timeframes for the filter dropdown
  const availableTimeframes = useMemo(() => {
    const set = new Set();
    gallery.forEach(item => {
      if (item.timeframe) set.add(item.timeframe);
    });
    return ['All Timeframes', ...Array.from(set)];
  }, [gallery]);

  // Filter gallery items
  const filteredGallery = useMemo(() => {
    return gallery.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesTimeframe = selectedTimeframe === 'All Timeframes' || item.timeframe === selectedTimeframe;
      const matchesSearch = searchQuery.trim() === '' || 
        (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesTimeframe && matchesSearch;
    });
  }, [gallery, selectedCategory, selectedTimeframe, searchQuery]);

  const openLightbox = (eventIdx, photoIdx = 0) => {
    setLightboxEventIndex(eventIdx);
    setLightboxPhotoIndex(photoIdx);
  };

  const closeLightbox = () => {
    setLightboxEventIndex(null);
    setLightboxPhotoIndex(0);
  };

  const activeEvent = lightboxEventIndex !== null ? filteredGallery[lightboxEventIndex] : null;
  const activePhotos = useMemo(() => {
    if (!activeEvent) return [];
    if (Array.isArray(activeEvent.images) && activeEvent.images.length > 0) {
      return activeEvent.images;
    }
    return activeEvent.image ? [activeEvent.image] : [];
  }, [activeEvent]);

  const prevPhoto = (e) => {
    e?.stopPropagation();
    if (activePhotos.length > 0) {
      setLightboxPhotoIndex(prev => (prev - 1 + activePhotos.length) % activePhotos.length);
    }
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    if (activePhotos.length > 0) {
      setLightboxPhotoIndex(prev => (prev + 1) % activePhotos.length);
    }
  };

  // Switch to previous or next event album
  const prevEvent = (e) => {
    e?.stopPropagation();
    if (lightboxEventIndex !== null && filteredGallery.length > 0) {
      const newIdx = (lightboxEventIndex - 1 + filteredGallery.length) % filteredGallery.length;
      setLightboxEventIndex(newIdx);
      setLightboxPhotoIndex(0);
    }
  };

  const nextEvent = (e) => {
    e?.stopPropagation();
    if (lightboxEventIndex !== null && filteredGallery.length > 0) {
      const newIdx = (lightboxEventIndex + 1) % filteredGallery.length;
      setLightboxEventIndex(newIdx);
      setLightboxPhotoIndex(0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeEvent) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEvent, activePhotos.length]);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf8ee] border border-[#a99410]/40 text-[#020024] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Camera className="w-3.5 h-3.5 text-[#a99410]" />
            <span>SkyGlobal Photographic Archive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
            Milestones, Deployments & <span className="text-[#101a6d]">Life at SkyGlobal</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Browse multiple photo records documenting each recruitment time frame. Explore candidate visa handovers, departure orientations, and international employer trade testing delegations.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event albums by title, country, batch, or location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410] transition-all bg-slate-50/50"
              />
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5 whitespace-nowrap">
                <Clock className="w-4 h-4 text-[#a99410]" />
                Time Frame:
              </span>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#a99410] cursor-pointer"
              >
                {availableTimeframes.map(tf => (
                  <option key={tf} value={tf}>{tf}</option>
                ))}
              </select>
            </div>

            {/* Reset Filters button */}
            {(selectedCategory !== 'All' || selectedTimeframe !== 'All Timeframes' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedTimeframe('All Timeframes');
                  setSearchQuery('');
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 no-scrollbar">
            {galleryCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#a99410] to-[#8e7c0c] text-[#020024] shadow-sm font-extrabold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGallery.map((item, idx) => {
              const photoCount = Array.isArray(item.images) && item.images.length > 0
                ? item.images.length
                : item.image ? 1 : 0;
              const coverPhoto = (item.images && item.images[0]) || item.image;

              return (
                <div 
                  key={item.id}
                  onClick={() => openLightbox(idx, 0)}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#a99410] transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                    <img 
                      src={coverPhoto} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 opacity-70 group-hover:opacity-50 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#020024] bg-[#faf8ee] px-2.5 py-1 rounded-lg border border-[#a99410]/50 shadow-md">
                        <Calendar className="w-3 h-3 text-[#a99410]" />
                        <span>{item.timeframe}</span>
                      </span>

                      {/* Photo Count Pill */}
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-white bg-black/65 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-md">
                        <Images className="w-3 h-3 text-[#a99410]" />
                        <span>{photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}</span>
                      </span>
                    </div>

                    {/* Quick Category Tag on bottom left of image */}
                    <div className="absolute bottom-3 left-3 pointer-events-none">
                      <span className="text-[10px] font-bold text-white bg-[#101a6d]/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
                        {item.category}
                      </span>
                    </div>

                    {/* Quick Zoom Icon */}
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <Maximize2 className="w-4 h-4 text-[#101a6d]" />
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#101a6d] transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 font-medium truncate max-w-[70%]">
                        <MapPin className="w-3 h-3 text-[#a99410] shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </span>

                      <span className="text-[#a99410] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        View Album
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto shadow-sm">
            <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">No event photos found</h4>
            <p className="text-xs text-slate-500 mt-1">
              No gallery images match the selected category or time frame filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTimeframe('All Timeframes');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] transition-all cursor-pointer"
            >
              Show All Photos
            </button>
          </div>
        )}

      </div>

      {/* Multi-Photo Event Lightbox Modal */}
      {activeEvent && (
        <div 
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Top Bar Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="text-xs font-bold text-[#020024] bg-[#a99410] px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {activeEvent.timeframe}
              </span>
              <span className="text-xs font-medium text-white/80 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                Photo {lightboxPhotoIndex + 1} of {activePhotos.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="pointer-events-auto text-slate-300 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Left Arrow (Previous Photo in Album) */}
          {activePhotos.length > 1 && (
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3.5 rounded-full bg-white/10 hover:bg-[#a99410] hover:text-[#020024] transition-all z-20 cursor-pointer hidden sm:flex items-center justify-center"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow (Next Photo in Album) */}
          {activePhotos.length > 1 && (
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3.5 rounded-full bg-white/10 hover:bg-[#a99410] hover:text-[#020024] transition-all z-20 cursor-pointer hidden sm:flex items-center justify-center"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Modal Container */}
          <div 
            className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Active Photo */}
            <div className="relative bg-black flex items-center justify-center max-h-[55vh] overflow-hidden">
              <img 
                src={activePhotos[lightboxPhotoIndex] || activeEvent.image} 
                alt={`${activeEvent.title} - Photo ${lightboxPhotoIndex + 1}`} 
                className="w-full h-full max-h-[55vh] object-contain"
              />

              {/* Mobile Prev / Next Overlays */}
              {activePhotos.length > 1 && (
                <div className="sm:hidden absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={prevPhoto}
                    className="p-2 rounded-full bg-black/60 text-white pointer-events-auto"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="p-2 rounded-full bg-black/60 text-white pointer-events-auto"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Strip (Interactive Thumbnail Bar) */}
            {activePhotos.length > 1 && (
              <div className="p-3 bg-slate-950 flex items-center gap-2 overflow-x-auto border-t border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 ml-1">
                  Album Photos:
                </span>
                {activePhotos.map((imgSrc, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => setLightboxPhotoIndex(pIdx)}
                    className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      pIdx === lightboxPhotoIndex 
                        ? 'border-[#a99410] scale-105 shadow-md' 
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={imgSrc} 
                      alt={`Thumb ${pIdx + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Image Details Bottom Bar */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white space-y-3 overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#101a6d] text-[#b6eafb] font-bold border border-[#25c0f3]/30">
                    {activeEvent.category}
                  </span>
                  <span className="text-slate-400 text-xs">
                    Event Date: {activeEvent.date}
                  </span>
                </div>

                {/* Event switcher */}
                {filteredGallery.length > 1 && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <button 
                      onClick={prevEvent}
                      className="hover:text-white flex items-center gap-0.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Previous Event
                    </button>
                    <span>•</span>
                    <button 
                      onClick={nextEvent}
                      className="hover:text-white flex items-center gap-0.5 cursor-pointer"
                    >
                      Next Event <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                {activeEvent.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeEvent.description}
              </p>

              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400 gap-2">
                <span className="flex items-center gap-1.5 font-medium text-slate-200">
                  <MapPin className="w-4 h-4 text-[#a99410]" />
                  <span>{activeEvent.location}</span>
                </span>

                {/* Tags */}
                {activeEvent.tags && activeEvent.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {activeEvent.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-slate-300 border border-white/10">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
