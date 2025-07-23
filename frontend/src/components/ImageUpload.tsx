import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { getFullImageUrl } from '../utils/imageUtils';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  currentImageUrl?: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, currentImageUrl }) => {
  const [preview, setPreview] = useState<string | null>(null);
  
  useEffect(() => {
    if (currentImageUrl) {
      setPreview(getFullImageUrl(currentImageUrl));
    }
  }, [currentImageUrl]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Validate file type
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Invalid file type. Only JPG, PNG and WebP are allowed.');
      return;
    }
    
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Maximum size is 5MB.');
      return;
    }
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    // Pass file to parent component
    onImageChange(file);
    
    // Clean up preview URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [onImageChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
      'image/webp': []
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  const removeImage = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className="mb-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto object-contain"
            />
          </div>
        ) : (
          <div className="py-8">
            <p className="text-gray-500">
              {isDragActive
                ? 'Drop the image here...'
                : 'Drag & drop an image here, or click to select one'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              (JPG, PNG, WebP, max 5MB)
            </p>
          </div>
        )}
      </div>
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      
      {preview && (
        <button
          type="button"
          onClick={removeImage}
          className="mt-2 text-red-500 text-sm"
        >
          Remove image
        </button>
      )}
    </div>
  );
};

export default ImageUpload;