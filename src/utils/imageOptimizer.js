/**
 * Client-side image optimization utility.
 * Downscales large smartphone/camera photos (e.g. 10MB+) to lightweight (~100KB-250KB)
 * universally supported JPEG data URLs.
 * 
 * Prevents localStorage QuotaExceededError and eliminates broken "?" browser image icons.
 */

export const FALLBACK_GALLERY_IMAGE = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80';

export const PRESET_GALLERY_PHOTOS = [
  {
    title: 'Visa Handover & Stamping',
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    category: 'Visa Handovers'
  },
  {
    title: 'Airport Group Departure',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    category: 'Candidate Deployments'
  },
  {
    title: 'Technical Trade Test Workshop',
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    category: 'Client Delegations'
  },
  {
    title: 'Pre-Departure Briefing',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    category: 'Candidate Orientations'
  },
  {
    title: 'Dubai Corporate HQ Meeting',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    category: 'Dubai Office'
  },
  {
    title: 'Australia Visa Grant Celebration',
    url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
    category: 'Visa Handovers'
  },
  {
    title: 'Bilateral Agreement Signing',
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    category: 'Client Delegations'
  },
  {
    title: 'Hotel & Hospitality Staff Briefing',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    category: 'Candidate Orientations'
  },
  {
    title: 'MEP Electrical Trade Testing',
    url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    category: 'Client Delegations'
  },
  {
    title: 'Departure Boarding Lounge',
    url: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80',
    category: 'Candidate Deployments'
  }
];

export async function optimizeImageFile(file, maxDimension = 1400, quality = 0.85) {
  const isHeic = 
    file.name?.toLowerCase().endsWith('.heic') || 
    file.name?.toLowerCase().endsWith('.heif') || 
    file.type === 'image/heic' || 
    file.type === 'image/heif';

  return new Promise((resolve, reject) => {
    // If HEIC on browser that cannot decode it
    if (isHeic) {
      // In Safari macOS, createObjectURL often works
      // If not, reject with helpful message
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      try {
        let width = img.width;
        let height = img.height;

        // Downscale while preserving aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // White background for transparent PNG/WebP conversions
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight standard JPEG Data URL
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        URL.revokeObjectURL(objectUrl);
        resolve(dataUrl);
      } catch (err) {
        URL.revokeObjectURL(objectUrl);
        fallbackFileReader(file).then(resolve).catch(reject);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      if (isHeic) {
        reject(new Error(
          `Apple HEIC format detected in "${file.name}". Browsers cannot display HEIC. Please export or convert this photo to JPG, PNG, or WebP first.`
        ));
      } else {
        // Try fallback file reader
        fallbackFileReader(file).then(resolve).catch(reject);
      }
    };

    img.src = objectUrl;
  });
}

function fallbackFileReader(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error(`Failed to read file "${file.name}".`));
    reader.readAsDataURL(file);
  });
}
