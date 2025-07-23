/**
 * Ensures tags are properly formatted as an array
 * @param tags The tags from the API which could be in various formats
 * @returns A properly formatted array of tags
 */
export const normalizeTags = (tags: any): string[] => {
  if (!tags) {
    return [];
  }
  
  // If it's already an array, return it
  if (Array.isArray(tags)) {
    return tags;
  }
  
  // If it's a string that looks like JSON, try to parse it
  if (typeof tags === 'string' && (tags.startsWith('[') || tags.startsWith('{'))) {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [tags];
    } catch (e) {
      // If parsing fails, split by comma
      return tags.split(',').map(tag => tag.trim()).filter(Boolean);
    }
  }
  
  // If it's a regular string, split by comma
  if (typeof tags === 'string') {
    return tags.split(',').map(tag => tag.trim()).filter(Boolean);
  }
  
  // If we can't determine the format, return an empty array
  return [];
};