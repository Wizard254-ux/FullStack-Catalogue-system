const API_URL = 'http://localhost:3000';

/**
 * Ensures image URLs are properly formatted with the API base URL
 * @param imageUrl The image URL from the API
 * @returns A properly formatted image URL
 */
export const getFullImageUrl = (imageUrl: string | null): string => {
  if (!imageUrl) {
    return 'https://via.placeholder.com/150?text=No+Image';
  }
  
  // If the URL already starts with http, it's already a full URL
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If the URL starts with a slash, append it to the API base URL
  if (imageUrl.startsWith('/')) {
    return `${API_URL}${imageUrl}`;
  }
  
  // Otherwise, assume it's a relative path and add the API base URL with a slash
  return `${API_URL}/${imageUrl}`;
};