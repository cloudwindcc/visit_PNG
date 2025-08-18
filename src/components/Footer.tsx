import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const officialLinks = [
    {
      title: '投资南太平洋',
      url: 'https://investsouthpacific.com',
      description: '南太平洋地区投资机会 - 探索斐济、萨摩亚等岛国的投资潜力'
    },
    {
      title: '投资新几内亚门户',
      url: 'https://pnginvestor.com',
      description: '巴布亚新几内亚投资权威指南 - 石油天然气、矿业、农业、旅游业的完整投资机会与政策解读'
    }
  ];

  return (
    <footer className={`bg-white/80 backdrop-blur-sm border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            官方友情链接
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {officialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#5751D5] hover:text-[#161615] transition-colors group"
              >
                <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span>{link.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;