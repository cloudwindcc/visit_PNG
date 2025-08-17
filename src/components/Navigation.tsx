import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentIndex,
  total,
  onPrevious,
  onNext,
  onGoTo
}) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/20 backdrop-blur-lg rounded-full p-4 border border-white/30 shadow-xl">
        <div className="flex items-center gap-4">
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-[#161615]" />
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: total }, (_, index) => (
              <button
                key={index}
                onClick={() => onGoTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-[#5751D5] scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Current Page */}
          <div className="px-3 py-1 bg-[#5751D5] text-white rounded-full text-sm font-medium">
            {currentIndex + 1}/{total}
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={currentIndex === total - 1}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 text-[#161615]" />
          </button>
        </div>
      </div>
    </div>
  );
};
