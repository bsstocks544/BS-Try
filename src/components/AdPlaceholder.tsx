import React from 'react';

interface AdPlaceholderProps {
  type: 'horizontal' | 'vertical' | 'square';
  label: string;
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, label, className = '' }) => {
  const dimensions = {
    horizontal: 'h-24 w-full',
    vertical: 'w-full h-96',
    square: 'aspect-square w-full'
  };

  return (
    <div className={`bg-[#0a0f25] rounded-2xl border border-gray-800 flex items-center justify-center overflow-hidden ${dimensions[type]} ${className}`}>
      <div className="text-center">
        <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold block mb-1">
          ADVERTISEMENT
        </span>
        <span className="text-[9px] text-gray-500 font-medium">
          {label}
        </span>
      </div>
    </div>
  );
};
