const API_URL = 'http://localhost:3000';

/**
 * Ensures image URLs are properly formatted with the API base URL
 * @param imageUrl The image URL from the API
 * @param bustCache Whether to add a cache-busting parameter
 * @returns A properly formatted image URL
 */
export const getFullImageUrl = (imageUrl: string | null, bustCache = false): string => {
  if (!imageUrl) {
    return 'https://via.placeholder.com/150?text=No+Image';
  }
  
  // If the URL already starts with http, it's already a full URL
  let fullUrl = imageUrl;
  if (!imageUrl.startsWith('http')) {
    // If the URL starts with a slash, append it to the API base URL
    if (imageUrl.startsWith('/')) {
      fullUrl = `${API_URL}${imageUrl}`;
    } else {
      // Otherwise, assume it's a relative path and add the API base URL with a slash
      fullUrl = `${API_URL}/${imageUrl}`;
    }
  }
  
  // Add cache-busting parameter if requested
  if (bustCache) {
    const cacheBuster = `_cb=${Date.now()}`;
    fullUrl += fullUrl.includes('?') ? `&${cacheBuster}` : `?${cacheBuster}`;
  }
  
  return fullUrl;
};