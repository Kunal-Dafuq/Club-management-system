/**
 * Enterprise Client-Side Image Compression & Industry Platform Limit Validator
 * Implements industry benchmarks (Gmail/Outlook 25MB, WhatsApp/Telegram 2GB Document mode,
 * Smartphone Photo 10MB cap with client-side WebP/JPEG canvas compression down to <1MB).
 */

// 1. Industry Standard Tiered Upload Ceilings
export const PLATFORM_LIMITS = {
  PHOTO_MAX_BYTES: 10 * 1024 * 1024,      // 10 MB (Smartphone RAW/HEIC/PNG/JPEG cap)
  DOCUMENT_MAX_BYTES: 25 * 1024 * 1024,   // 25 MB (Universal Email standard - Gmail/Outlook)
  VIDEO_CLIP_MAX_BYTES: 100 * 1024 * 1024,// 100 MB (Direct short clip < 1 min @ 1080p)
  RESUMABLE_MAX_BYTES: 2 * 1024 * 1024 * 1024, // 2 GB (WhatsApp/Telegram Document mode ceiling via Tus 6MB Chunks)
};

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif"
];

export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-matroska",
  "video/ogg"
];

/**
 * Validate a file against industry platform benchmarks
 */
export const validatePlatformLimits = (file, { allowResumableLargeVideo = true } = {}) => {
  if (!file) {
    throw new Error("No file provided for validation.");
  }

  const size = file.size;
  const type = (file.type || "").toLowerCase();

  // 1. Photos & Images check (10 MB Ceiling)
  if (type.startsWith("image/")) {
    if (size > PLATFORM_LIMITS.PHOTO_MAX_BYTES) {
      throw new Error(
        `Photo "${file.name}" exceeds the 10 MB limit (${(size / (1024 * 1024)).toFixed(1)} MB). Please select a photo under 10 MB.`
      );
    }
    return { category: "photo", maxAllowedMB: 10, valid: true };
  }

  // 2. Videos check (100 MB for standard clips, 2 GB for Resumable Document Mode)
  if (type.startsWith("video/")) {
    const limit = allowResumableLargeVideo
      ? PLATFORM_LIMITS.RESUMABLE_MAX_BYTES
      : PLATFORM_LIMITS.VIDEO_CLIP_MAX_BYTES;

    const limitMB = allowResumableLargeVideo ? 2048 : 100;

    if (size > limit) {
      throw new Error(
        `Video "${file.name}" exceeds the ${limitMB} MB capacity limit. For larger videos, please share via Cloud link (Google Drive / YouTube).`
      );
    }
    return {
      category: "video",
      maxAllowedMB: limitMB,
      valid: true,
      requiresResumableTus: size > 25 * 1024 * 1024 // Use Tus if > 25 MB
    };
  }

  // 3. Documents & General Attachments check (25 MB Universal Email Standard)
  if (size > PLATFORM_LIMITS.DOCUMENT_MAX_BYTES && !allowResumableLargeVideo) {
    throw new Error(
      `Document "${file.name}" exceeds the standard 25 MB email limit (${(size / (1024 * 1024)).toFixed(1)} MB). Use Resumable Document Mode for files up to 2 GB.`
    );
  }

  if (size > PLATFORM_LIMITS.RESUMABLE_MAX_BYTES) {
    throw new Error(
      `File "${file.name}" exceeds the platform 2 GB maximum ceiling.`
    );
  }

  return {
    category: size > PLATFORM_LIMITS.DOCUMENT_MAX_BYTES ? "resumable-archive" : "document",
    maxAllowedMB: size > PLATFORM_LIMITS.DOCUMENT_MAX_BYTES ? 2048 : 25,
    valid: true,
    requiresResumableTus: size > 25 * 1024 * 1024
  };
};

/**
 * Automatic Client-Side Image Compression
 * Shrinks smartphone camera photos (3 MB – 8 MB) down to < 1 MB WebP/JPEG on the browser
 * without visible quality degradation before upload.
 */
export const compressImageClientSide = async (
  file,
  {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.82,
    targetType = "image/webp",
    skipThresholdBytes = 600 * 1024 // Don't compress if already < 600 KB
  } = {}
) => {
  // If not an image or already very small, return original unchanged
  if (!file || !file.type.startsWith("image/") || file.size <= skipThresholdBytes) {
    return {
      file,
      compressed: false,
      originalSize: file?.size || 0,
      compressedSize: file?.size || 0,
      savingsPercent: 0
    };
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio while scaling within bounds
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        // Fallback if canvas context is unavailable
        resolve({
          file,
          compressed: false,
          originalSize: file.size,
          compressedSize: file.size,
          savingsPercent: 0
        });
        return;
      }

      // Draw resized image
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to compressed WebP or JPEG blob
      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) {
            // If compression didn't save space, keep original
            resolve({
              file,
              compressed: false,
              originalSize: file.size,
              compressedSize: file.size,
              savingsPercent: 0
            });
            return;
          }

          // Create new compressed File object
          const newName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
          const compressedFile = new File([blob], newName, {
            type: targetType,
            lastModified: Date.now()
          });

          const savingsPercent = Math.round(((file.size - blob.size) / file.size) * 100);

          resolve({
            file: compressedFile,
            compressed: true,
            originalSize: file.size,
            compressedSize: blob.size,
            savingsPercent
          });
        },
        targetType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        file,
        compressed: false,
        originalSize: file.size,
        compressedSize: file.size,
        savingsPercent: 0
      });
    };

    img.src = objectUrl;
  });
};

export default {
  PLATFORM_LIMITS,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  validatePlatformLimits,
  compressImageClientSide
};
