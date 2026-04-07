import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageUploadProps {
  onImageSelect: (base64: string, mimeType: string) => void;
  label: string;
  id: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, label, id }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
      const dataParts = base64.split(',');
      const mimeType = dataParts[0].match(/:(.*?);/)?.[1] || 'image/png';
      const base64Data = dataParts[1];
      onImageSelect(base64Data, mimeType);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setPreview(null);
    onImageSelect('', '');
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 group"
          >
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <X size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`
              relative aspect-square rounded-xl border-2 border-dashed transition-all duration-200
              flex flex-col items-center justify-center cursor-pointer p-4
              ${isDragging 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-800/50'}
            `}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => document.getElementById(id)?.click()}
          >
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3">
              <Upload size={24} />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white text-center">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Clear front-facing photo works best
            </p>
            <input 
              type="file" 
              id={id} 
              className="hidden" 
              accept="image/*" 
              onChange={onChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
