import React from 'react';

interface KazakhstanMapProps {
  lang: string;
}

const KazakhstanMap: React.FC<KazakhstanMapProps> = ({ lang }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950 rounded-lg overflow-hidden">
      <svg 
        viewBox="0 0 800 600" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Фон */}
        <rect 
          x="0" 
          y="0" 
          width="800" 
          height="600" 
          fill="rgba(15, 23, 42, 0.3)" 
        />
        
        {/* Толық контур Казахстана (упрощенный) */}
        <path
          d="M350,100 L400,110 L450,90 L500,100 L550,120 L600,130 L620,150 L630,180 L610,200 L590,220 
               L570,240 L550,260 L530,280 L510,300 L490,320 L470,340 L450,360 L430,380 L410,400 
               L390,420 L370,440 L350,460 L330,480 L310,500 L290,520 L270,540 L250,560 L230,540 
               L210,520 L190,500 L170,480 L150,460 L130,440 L110,420 L90,400 L70,380 L50,360 
               L30,340 L40,320 L60,300 L80,280 L100,260 L120,240 L140,220 L160,200 L180,180 
               L200,160 L220,140 L240,120 L260,100 L280,80 L300,70 L320,80 L340,90 Z"
          fill="rgba(30, 58, 138, 0.2)"
          stroke="rgba(96, 165, 250, 0.6)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        
        {/* Регионы */}
        {/* Западный Казахстан - критический */}
        <path
          d="M100,300 L150,280 L200,250 L180,320 L140,350 L100,330 Z"
          fill="rgba(239, 68, 68, 0.4)"
          stroke="rgba(239, 68, 68, 0.8)"
          strokeWidth="1.5"
          className="animate-pulse"
        />
        
        {/* Мойынкум - критический */}
        <ellipse
          cx="400"
          cy="380"
          rx="100"
          ry="50"
          fill="rgba(239, 68, 68, 0.5)"
          stroke="rgba(239, 68, 68, 0.9)"
          strokeWidth="2"
          className="animate-pulse"
        />
        
        {/* Северный Казахстан - умеренный */}
        <path
          d="M300,150 L400,130 L500,140 L480,200 L380,190 L320,170 Z"
          fill="rgba(245, 158, 11, 0.3)"
          stroke="rgba(245, 158, 11, 0.7)"
          strokeWidth="1.5"
        />
        
        {/* Восточный Казахстан - умеренный */}
        <path
          d="M550,180 L620,200 L650,250 L600,280 L530,260 L520,220 Z"
          fill="rgba(245, 158, 11, 0.3)"
          stroke="rgba(245, 158, 11, 0.7)"
          strokeWidth="1.5"
        />
        
        {/* Южный Казахстан - стабильный */}
        <path
          d="M400,450 L450,480 L420,520 L350,500 L320,460 L370,430 Z"
          fill="rgba(34, 197, 94, 0.3)"
          stroke="rgba(34, 197, 94, 0.7)"
          strokeWidth="1.5"
        />
        
        {/* Крупные города */}
        <g className="cities">
          {/* Астана */}
          <circle cx="320" cy="180" r="5" fill="#FFD700" stroke="#F59E0B" strokeWidth="1.5">
            <title>Astana</title>
          </circle>
          
          {/* Алматы */}
          <circle cx="450" cy="420" r="5" fill="#FFD700" stroke="#F59E0B" strokeWidth="1.5">
            <title>Almaty</title>
          </circle>
          
          {/* Шымкент */}
          <circle cx="380" cy="460" r="5" fill="#FFD700" stroke="#F59E0B" strokeWidth="1.5">
            <title>Shymkent</title>
          </circle>
          
          {/* Атырау */}
          <circle cx="120" cy="310" r="4" fill="#FFD700" stroke="#F59E0B" strokeWidth="1.5">
            <title>Atyrau</title>
          </circle>
          
          {/* Актобе */}
          <circle cx="200" cy="270" r="4" fill="#FFD700" stroke="#F59E0B" strokeWidth="1.5">
            <title>Aktobe</title>
          </circle>
          
          {/* Караганда */}
          <circle cx="380" cy="300" r="4" fill="#FFD700" stroke="#F59E0B" strokeWidth="1.5">
            <title>Karaganda</title>
          </circle>
        </g>
        
        {/* Реки */}
        <path
          d="M150,250 L200,280 L250,300 L300,320 L350,330 L400,340 L450,350"
          fill="none"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        <path
          d="M500,200 L480,250 L460,300 L440,350"
          fill="none"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Текстовые метки */}
        <text 
          x="400" 
          y="380" 
          textAnchor="middle" 
          fill="white" 
          fontSize="16"
          fontWeight="bold"
          className="drop-shadow-lg"
        >
          {lang === 'kk' ? 'Мойынқұм шөлі' : lang === 'ru' ? 'Пустыня Мойынкум' : 'Moyynkum Desert'}
        </text>
        
        <text 
          x="320" 
          y="180" 
          textAnchor="middle" 
          fill="white" 
          fontSize="12"
          fontWeight="bold"
          className="drop-shadow-lg"
        >
          {lang === 'kk' ? 'Астана' : lang === 'ru' ? 'Астана' : 'Astana'}
        </text>
        
        <text 
          x="450" 
          y="420" 
          textAnchor="middle" 
          fill="white" 
          fontSize="12"
          fontWeight="bold"
          className="drop-shadow-lg"
        >
          {lang === 'kk' ? 'Алматы' : lang === 'ru' ? 'Алматы' : 'Almaty'}
        </text>
        
        <text 
          x="380" 
          y="460" 
          textAnchor="middle" 
          fill="white" 
          fontSize="12"
          fontWeight="bold"
          className="drop-shadow-lg"
        >
          {lang === 'kk' ? 'Шымкент' : lang === 'ru' ? 'Шымкент' : 'Shymkent'}
        </text>
        
        {/* Легенда */}
        <rect 
          x="20" 
          y="20" 
          width="180" 
          height="120" 
          fill="rgba(15, 23, 42, 0.8)" 
          stroke="rgba(96, 165, 250, 0.5)"
          strokeWidth="1"
          rx="8"
        />
        
        <text 
          x="110" 
          y="45" 
          textAnchor="middle" 
          fill="#60A5FA" 
          fontSize="14"
          fontWeight="bold"
        >
          {lang === 'kk' ? 'Су ресурстары' : lang === 'ru' ? 'Водные ресурсы' : 'Water Resources'}
        </text>
        
        <g className="legend-items">
          {/* Критический */}
          <rect x="35" y="60" width="12" height="12" rx="2" fill="rgba(239, 68, 68, 0.7)" />
          <text x="55" y="70" fill="#CBD5E1" fontSize="12">
            {lang === 'kk' ? 'Критикалық (-40%)' : lang === 'ru' ? 'Критично (-40%)' : 'Critical (-40%)'}
          </text>
          
          {/* Умеренный */}
          <rect x="35" y="85" width="12" height="12" rx="2" fill="rgba(245, 158, 11, 0.7)" />
          <text x="55" y="95" fill="#CBD5E1" fontSize="12">
            {lang === 'kk' ? 'Орташа (-15%)' : lang === 'ru' ? 'Умеренно (-15%)' : 'Moderate (-15%)'}
          </text>
          
          {/* Стабильный */}
          <rect x="35" y="110" width="12" height="12" rx="2" fill="rgba(34, 197, 94, 0.7)" />
          <text x="55" y="120" fill="#CBD5E1" fontSize="12">
            {lang === 'kk' ? 'Тұрақты (+5%)' : lang === 'ru' ? 'Стабильно (+5%)' : 'Stable (+5%)'}
          </text>
        </g>
        
        {/* Реки легенда */}
        <path
          d="M35,130 L45,130"
          stroke="rgba(59, 130, 246, 0.7)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x="55" y="135" fill="#CBD5E1" fontSize="12">
          {lang === 'kk' ? 'Өзендер' : lang === 'ru' ? 'Реки' : 'Rivers'}
        </text>
        
        {/* Заголовок */}
        <text 
          x="400" 
          y="550" 
          textAnchor="middle" 
          fill="#94A3B8" 
          fontSize="14"
          fontWeight="bold"
        >
          {lang === 'kk' ? 'Қазақстан су ресурстары картасы' : lang === 'ru' ? 'Карта водных ресурсов Казахстана' : 'Kazakhstan Water Resources Map'}
        </text>
      </svg>
    </div>
  );
};

export default KazakhstanMap;
