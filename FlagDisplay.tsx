import React from 'react';
import { FLAG_PRESETS } from '../constants';
import { FlagOrientation } from '../types';

interface FlagDisplayProps {
  colors: string[];
  identityName: string;
  orientation?: FlagOrientation;
}

const FlagDisplay: React.FC<FlagDisplayProps> = ({ colors, identityName, orientation = 'horizontal' }) => {
  const displayColors = FLAG_PRESETS[identityName] || colors;

  // Generate gradient based on striping preference
  // For 'circular' and 'heart', we default to horizontal stripes (180deg) unless we want to get fancy.
  // We can treat orientation as 'shape' primarily, but 'vertical'/'diagonal' imply 'rectangle + specific stripes'.
  // Let's keep stripe direction logic for the rectangular ones, and standard stripes for shapes.
  const generateGradient = (cols: string[]) => {
    if (cols.length === 0) return '#eee';
    
    const segment = 100 / cols.length;
    
    let angle = '180deg'; // Default top-to-bottom
    
    if (orientation === 'vertical') angle = '90deg';
    if (orientation === 'diagonal') angle = '45deg';
    // circular and heart use standard horizontal stripes (180deg)
    
    let gradientStr = `linear-gradient(${angle}`;
    
    cols.forEach((color, index) => {
      gradientStr += `, ${color} ${index * segment}%`;
      gradientStr += `, ${color} ${(index + 1) * segment}%`;
    });
    
    gradientStr += ')';
    return gradientStr;
  };

  const backgroundStyle: React.CSSProperties = {
    background: generateGradient(displayColors),
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  // Shape specific classes
  let shapeClass = 'w-64 h-40 md:w-80 md:h-52 rounded-lg'; // Default rectangle
  let maskStyle: React.CSSProperties = {};

  if (orientation === 'circular') {
    shapeClass = 'w-56 h-56 md:w-64 md:h-64 rounded-full';
  } else if (orientation === 'heart') {
    shapeClass = 'w-56 h-56 md:w-64 md:h-64'; // Square ratio for heart mask
    // Using SVG mask for heart shape
    const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
    // Encode SVG for mask
    const svgMask = `data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="${heartPath}" fill="black"/></svg>`;
    
    maskStyle = {
      WebkitMaskImage: `url('${svgMask}')`,
      maskImage: `url('${svgMask}')`,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
    };
    // Remove shadow from box since mask clips it (shadow on container or filter drop-shadow needed)
    // We'll use filter: drop-shadow on the parent or handle it differently.
    // CSS box-shadow doesn't follow clip-path/mask perfectly without drop-shadow filter.
    backgroundStyle.boxShadow = 'none';
    backgroundStyle.filter = 'drop-shadow(0 10px 8px rgba(0,0,0,0.1))';
  }

  return (
    <div className="relative group perspective-1000 flex justify-center items-center">
      {/* Flag Container */}
      <div 
        className={`${shapeClass} transition-all duration-500 transform hover:scale-105`}
        style={{ ...backgroundStyle, ...maskStyle }}
      >
        {/* Fabric texture overlay with animation - use absolute positioning to cover shape */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] pointer-events-none mix-blend-multiply animate-fabric"
             style={{ backgroundSize: '200px 200px' }} // Ensure pattern scales well
        ></div>
        
        {/* Shine/Highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/20 pointer-events-none"></div>
      </div>

      {/* Flag Pole (Decorative) - Only show for horizontal/vertical rectangle */}
      {(orientation === 'horizontal' || orientation === 'vertical' || orientation === 'diagonal') && (
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-300 rounded-l-lg opacity-50 border-r border-gray-400 h-full"></div>
      )}
    </div>
  );
};

export default FlagDisplay;