import React from 'react';
import { OutfitStyle, OUTFIT_CATEGORIES, Gender } from '../constants';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface OutfitSelectorProps {
  selectedGender: Gender;
  selectedCategory: string;
  selectedStyleId: string | null;
  styles: OutfitStyle[];
  onCategoryChange: (category: string) => void;
  onStyleSelect: (style: OutfitStyle) => void;
}

export const OutfitSelector: React.FC<OutfitSelectorProps> = ({
  selectedGender,
  selectedCategory,
  selectedStyleId,
  styles,
  onCategoryChange,
  onStyleSelect
}) => {
  const filteredStyles = styles.filter(s => s.gender === selectedGender && s.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {OUTFIT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all
              ${selectedCategory === cat 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Styles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filteredStyles.map((style) => (
          <motion.div
            key={style.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStyleSelect(style)}
            className={`
              relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all
              ${selectedStyleId === style.id 
                ? 'border-blue-500 ring-2 ring-blue-500/20' 
                : 'border-transparent bg-gray-50 dark:bg-gray-800'}
            `}
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src={style.thumbnail} 
                alt={style.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-2 bg-white dark:bg-gray-800">
              <p className="text-xs font-semibold truncate dark:text-white">{style.name}</p>
            </div>
            {selectedStyleId === style.id && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-lg">
                <Check size={12} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
