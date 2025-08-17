import React from 'react';
import { motion } from 'framer-motion';
import { Attraction } from '../types/attraction';
import { AudioPlayer } from './AudioPlayer';
import { GoogleMapComponent } from './GoogleMap';
import { Breadcrumb } from './Breadcrumb';
import { MapPin, Calendar, Lightbulb } from 'lucide-react';

interface AttractionPageProps {
  attraction: Attraction;
  index: number;
}

export const AttractionPage: React.FC<AttractionPageProps> = ({ attraction, index }) => {
  // Generate audio filename based on index and English name
  const getAudioFilename = (index: number, englishName: string) => {
    const paddedIndex = String(index + 1).padStart(2, '0');
    const sanitizedName = englishName.replace(/\s+/g, '_').replace(/[^\w]/g, '_');
    return `${paddedIndex}_${sanitizedName}.mp3`;
  };

  const audioSrc = `/audio/${getAudioFilename(index, attraction.english_name)}`;
  
  // Generate image filename based on English name
  const getImageFilename = (englishName: string, format: 'webp' | 'jpg' = 'webp') => {
    return englishName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/--+/g, '-')
      + `.${format}`;
  };

  const imageSrcWebP = `/images/${getImageFilename(attraction.english_name, 'webp')}`;
  const imageSrcJpg = `/images/${getImageFilename(attraction.english_name, 'jpg')}`;

  // Generate SEO-optimized alt text
  const getAltText = (attraction: Attraction) => {
    const activityMap: { [key: string]: string } = {
      'Kokoda Track': '徒步',
      'Port Moresby Nature Park': '野生动物',
      'Mount Tavurvur': '火山',
      'Sepik River': '部落文化',
      'Mount Wilhelm': '攀登',
      'Goroka': '泥人文化',
      'Kimbe Bay': '潜水',
      'Kuk Early Agricultural Site': '历史遗迹',
      'Tari Valley': '部落文化',
      'Alotau': '海湾风光'
    };
    
    const activity = activityMap[attraction.english_name] || '旅游';
    return `${attraction.chinese_name}${activity}景点 - 巴布亚新几内亚旅游官方图片`;
  };

  // Generate activity type for H1
  const getActivityType = (englishName: string) => {
    const typeMap: { [key: string]: string } = {
      'Kokoda Track': '徒步旅行',
      'Port Moresby Nature Park': '野生动物探险',
      'Mount Tavurvur': '火山探险',
      'Sepik River': '部落文化体验',
      'Mount Wilhelm': '登山探险',
      'Goroka': '文化体验',
      'Kimbe Bay': '海洋潜水',
      'Kuk Early Agricultural Site': '历史文化',
      'Tari Valley': '部落文化',
      'Alotau': '海湾旅游'
    };
    
    return typeMap[englishName] || '旅游景点';
  };

  const altText = getAltText(attraction);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet={imageSrcWebP} type="image/webp" />
          <source srcSet={imageSrcJpg} type="image/jpeg" />
          <img
            src={imageSrcJpg}
            alt={altText}
            title={`${attraction.chinese_name} - ${attraction.english_name}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.setAttribute('alt', `${attraction.chinese_name}图片加载失败`);
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumb Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Breadcrumb 
              items={[
                { label: '首页', href: '/' },
                { label: '景点', href: '/#attractions' },
                { label: attraction.chinese_name }
              ]}
            />
          </motion.div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="text-6xl md:text-8xl font-black text-[#161615] mb-4 leading-none">
              {attraction.chinese_name}
            </div>
            <h1 className="sr-only">
              {attraction.chinese_name}旅游指南 - 巴布亚新几内亚{getActivityType(attraction.english_name)}官方推荐
            </h1>
            <div className="text-xl md:text-2xl text-gray-600 font-light tracking-wide">
              {attraction.english_name} - Papua New Guinea Travel Guide
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Description */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-[#161615] mb-4">
                  {attraction.chinese_name}详细介绍
                  <span className="text-lg font-normal text-gray-600 block mt-1">{attraction.english_name} Complete Guide</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {attraction.description}
                </p>
              </div>

              {/* Audio Guide Highlights */}
              <div className="bg-gradient-to-br from-[#5751D5]/10 to-[#5751D5]/5 backdrop-blur-lg rounded-2xl p-8 border border-[#5751D5]/20">
                <h2 className="text-2xl font-bold text-[#161615] mb-4">
                  {attraction.chinese_name}语音亮点
                  <span className="text-lg font-normal text-gray-600 block mt-1">{attraction.english_name} Audio Highlights</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg italic">
                  "{attraction.audio_guide_highlights}"
                </p>
              </div>

              {/* Audio Player */}
              <AudioPlayer audioSrc={audioSrc} title={attraction.chinese_name} />
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-[#161615] mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-[#5751D5]" />
                  {attraction.chinese_name}地理位置
                  <span className="text-lg font-normal text-gray-600 block mt-1">{attraction.english_name} Location</span>
                </h2>
                <GoogleMapComponent
                  latitude={attraction.coordinates.latitude}
                  longitude={attraction.coordinates.longitude}
                  title={attraction.chinese_name}
                />
                <div className="mt-4 text-sm text-gray-600">
                  精确坐标: {attraction.coordinates.latitude.toFixed(6)}, {attraction.coordinates.longitude.toFixed(6)}
                </div>
              </div>

              {/* Best Time to Visit */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-[#161615] mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#5751D5]" />
                  {attraction.chinese_name}最佳游览时间
                  <span className="text-lg font-normal text-gray-600 block mt-1">{attraction.english_name} Best Time</span>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {attraction.best_time_to_visit}
                </p>
              </div>

              {/* Travel Tips */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-[#161615] mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-[#5751D5]" />
                  {attraction.chinese_name}旅游贴士
                  <span className="text-lg font-normal text-gray-600 block mt-1">{attraction.english_name} Travel Tips</span>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {attraction.travel_tips}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
