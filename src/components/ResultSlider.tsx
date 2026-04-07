import React, { useState, useRef, useEffect } from 'react';

interface ResultSliderProps {
  before: string;
  after: string;
}

export const ResultSlider: React.FC<ResultSliderProps> = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* Original Image (Base) */}
      <img 
        src={before} 
        alt="Original" 
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        referrerPolicy="no-referrer"
      />
      
      {/* Result Image (Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={after} 
          alt="Result" 
          className="absolute inset-0 h-full object-contain"
          style={{ width: `${100 * (100 / sliderPosition)}%`, maxWidth: 'none' }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute inset-y-0 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Vertical Line */}
        <div className="absolute inset-y-0 -left-[1px] w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
        
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-sm border-2 border-white rounded-full shadow-2xl flex items-center justify-center">
          <div className="flex gap-1.5 items-center">
            {/* Left Arrow */}
            <div className="w-0 h-0 border-y-[5px] border-y-transparent border-r-[7px] border-r-white" />
            {/* Right Arrow */}
            <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-white" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold rounded-md uppercase tracking-wider pointer-events-none">
        Result
      </div>
      <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold rounded-md uppercase tracking-wider pointer-events-none">
        Original
      </div>
    </div>
  );
};
