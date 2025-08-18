import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAttractionsData } from './hooks/useAttractionsData';
import { AttractionPage } from './components/AttractionPage';
import { Navigation } from './components/Navigation';
import { DataVisualization } from './components/DataVisualization';
import Footer from './components/Footer';
import { LoaderIcon, Globe } from 'lucide-react';

function App() {
  const { attractions, loading, error } = useAttractionsData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVisualization, setShowVisualization] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === ' ') {
        event.preventDefault();
        setShowVisualization(!showVisualization);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, showVisualization, attractions.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : attractions.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < attractions.length - 1 ? prev + 1 : 0));
  };

  const handleGoTo = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <LoaderIcon className="w-12 h-12 text-[#5751D5] mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-bold text-[#161615] mb-2">
            正在加载巴布亚新几内亚景点信息
          </h2>
          <p className="text-gray-600">Loading Papua New Guinea Attractions</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">加载错误</h2>
          <p className="text-gray-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (attractions.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#161615] mb-2">暂无景点数据</h2>
          <p className="text-gray-600">No attractions data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-[#5751D5]" />
              <div>
                <h1 className="text-xl font-black text-[#161615]">
                  巴布亚新几内亚 <span className="text-sm font-normal text-gray-600">Papua New Guinea</span>
                </h1>
                <p className="text-xs text-gray-500">探索太平洋的隐秘瑰宝</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
              {/* Investment Links */}
              <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm order-2 md:order-1">
                <a 
                  href="https://investsouthpacific.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#161615] hover:text-[#5751D5] transition-colors px-2 py-1 rounded hover:bg-white/20"
                >
                  投资南太平洋
                </a>
                <a 
                  href="https://pnginvestor.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#161615] hover:text-[#5751D5] transition-colors font-medium px-2 py-1 rounded hover:bg-white/20"
                >
                  投资新几内亚
                </a>
              </div>
              
              {/* Language Switcher */}
              <div className="flex items-center gap-1 md:gap-2 order-1 md:order-2">
                <a 
                  href="/" 
                  className="px-2 md:px-3 py-1 text-xs md:text-sm rounded-full bg-white/20 text-[#161615] hover:bg-white/30 transition-all"
                >
                  中文
                </a>
                <a 
                  href="/en.html" 
                  className="px-2 md:px-3 py-1 text-xs md:text-sm rounded-full bg-[#5751D5] text-white hover:bg-[#5751D5]/90 transition-all"
                >
                  English
                </a>
              </div>
              
              {/* Data Button */}
              <button
                onClick={() => setShowVisualization(!showVisualization)}
                className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 order-3 ${
                  showVisualization
                    ? 'bg-[#5751D5] text-white'
                    : 'bg-white/20 text-[#161615] hover:bg-white/30'
                }`}
              >
                {showVisualization ? '返回景点' : '数据概览'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {showVisualization ? (
            <motion.div
              key="visualization"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen bg-[#FDFDFD] p-8"
            >
              <div className="container mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-5xl md:text-7xl font-black text-[#161615] mb-4">
                    数据概览
                  </h2>
                  <p className="text-xl text-gray-600">Data Overview</p>
                </div>
                <DataVisualization attractions={attractions} currentIndex={currentIndex} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`attraction-${currentIndex}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-[#FDFDFD]"
            >
              <AttractionPage
                attraction={attractions[currentIndex]}
                index={currentIndex}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      {!showVisualization && (
        <Navigation
          currentIndex={currentIndex}
          total={attractions.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onGoTo={handleGoTo}
        />
      )}

      {/* Scroll Indicator */}
      {!showVisualization && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
          <div className="bg-white/20 backdrop-blur-lg rounded-full p-3 border border-white/30">
            <div className="flex flex-col gap-2">
              {attractions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleGoTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-[#5751D5] scale-125'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="fixed bottom-4 right-4 z-30">
        <div className="bg-white/20 backdrop-blur-lg rounded-lg p-3 border border-white/30 text-xs text-gray-600">
          <div>← → 键切换景点</div>
          <div>空格键查看数据</div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
