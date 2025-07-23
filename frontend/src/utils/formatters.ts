// Format price to currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Convert tags array to comma-separated string
export const tagsToString = (tags: string[]): string => {
  return tags.join(', ');
};

// Convert comma-separated string to tags array
export const stringToTags = (tagsString: string): string[] => {
  if (!tagsString) return [];
  return tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
};