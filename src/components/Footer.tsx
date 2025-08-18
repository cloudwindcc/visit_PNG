import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const officialLinks = [
    {
      title: '关于我们',
      url: '/about',
      description: '了解更多关于巴布亚新几内亚旅游指南'
    },
    {
      title: '联系我们',
      url: '/contact',
      description: '获取旅游咨询和支持'
    }
  ];

  return (
    <footer className={`bg-white/80 backdrop-blur-sm border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            网站导航
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