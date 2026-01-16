import React from 'react';

interface WorldMapProps {
  lang: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ lang }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950 rounded-lg overflow-hidden">
      <svg 
        viewBox="0 0 1200 600" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Фон */}
        <rect 
          x="0" 
          y="0" 
          width="1200" 
          height="600" 
          fill="rgba(15, 23, 42, 0.3)" 
        />
        
        {/* Континенты */}
        
        {/* Африка */}
        <path
          d="M500,300 L550,280 L600,290 L620,320 L610,350 L590,380 L560,400 L530,420 
               L500,430 L470,440 L440,450 L410,440 L380,420 L360,390 L340,360 L320,330 
               L330,300 L350,280 L380,270 L410,280 L440,290 L470,300 Z"
          fill="rgba(239, 68, 68, 0.3)"
          stroke="rgba(239, 68, 68, 0.7)"
          strokeWidth="1.5"
        />
        
        {/* Азия */}
        <path
          d="M600,150 L700,140 L750,160 L780,190 L800,220 L820,250 L830,280 L840,310 
               L830,340 L810,370 L780,400 L750,420 L720,430 L690,440 L660,450 L630,460 
               L600,470 L570,460 L540,450 L510,440 L480,430 L450,420 L430,390 L410,360 
               L390,330 L370,300 L350,270 L370,240 L390,210 L410,180 L430,150 L450,130 
               L470,110 L490,100 L510,110 L530,120 L550,130 L570,140 Z"
          fill="rgba(239, 68, 68, 0.4)"
          stroke="rgba(239, 68, 68, 0.8)"
          strokeWidth="1.5"
        />
        
        {/* Европа */}
        <path
          d="M450,180 L500,170 L520,190 L530,220 L510,240 L480,250 L450,230 L430,200 Z"
          fill="rgba(245, 158, 11, 0.3)"
          stroke="rgba(245, 158, 11, 0.7)"
          strokeWidth="1.5"
        />
        
        {/* Северная Америка */}
        <path
          d="M100,100 L200,90 L250,130 L280,170 L300,210 L320,250 L340,290 L330,330 
               L310,360 L290,390 L270,420 L240,430 L210,440 L180,450 L150,440 L120,430 
               L90,410 L70,380 L50,350 L30,320 L20,290 L30,260 L40,230 L50,200 L60,170 
               L70,140 L80,110 Z"
          fill="rgba(245, 158, 11, 0.3)"
          stroke="rgba(245, 158, 11, 0.7)"
          strokeWidth="1.5"
        />
        
        {/* Южная Америка */}
        <path
          d="M200,400 L250,380 L300,360 L330,340 L360,320 L380,340 L400,360 L420,380 
               L440,400 L460,420 L480,440 L460,470 L430,490 L400,510 L370,530 L340,550 
               L310,570 L280,590 L250,610 L220,590 L190,570 L160,550 L130,530 L110,510 
               L90,490 L70,470 L50,450 L70,430 L90,410 L110,390 L130,370 L150,350 
               L170,330 L190,310 L210,290 L230,270 L250,250 L270,230 L290,210 L310,190 
               L330,170 L350,150 L370,130 L390,110 L410,90 L430,70 L450,50 L470,30 
               L490,10 L510,20 L530,40 L550,60 L570,80 L590,100 L610,120 L630,140 
               L650,160 L670,180 L690,200 L710,220 L730,240 L750,260 L770,280 L790,300 
               L810,320 L830,340 L850,360 L870,380 L890,400 L910,420 L930,440 L950,460 
               L970,480 L990,500 L1010,520 L1030,540 L1050,560 L1070,580 L1090,600 
               L1110,620 L1130,640 L1150,660 L1170,680 L1190,700 L1210,720 L1230,740 
               L1250,760 L1270,780 L1290,800 L1310,820 L1330,840 L1350,860 L1370,880 
               L1390,900 L1410,920 L1430,940 L1450,960 L1470,980 L1490,1000"
          fill="rgba(245, 158, 11, 0.25)"
          stroke="rgba(245, 158, 11, 0.6)"
          strokeWidth="1.5"
        />
        
        {/* Австралия */}
        <path
          d="M900,400 L950,380 L1000,370 L1050,360 L1080,380 L1100,400 L1080,430 
               L1050,450 L1020,470 L990,490 L960,510 L930,490 L900,470 L870,450 L840,430 
               L820,410 L840,390 Z"
          fill="rgba(245, 158, 11, 0.3)"
          stroke="rgba(245, 158, 11, 0.7)"
          strokeWidth="1.5"
        />
        
        {/* Критические зоны - анимация */}
        {/* Центральная Азия */}
        <ellipse
          cx="650"
          cy="280"
          rx="80"
          ry="40"
          fill="rgba(239, 68, 68, 0.3)"
          stroke="rgba(239, 68, 68, 0.9)"
          strokeWidth="2"
          className="animate-pulse"
        />
        
        {/* Северная Африка */}
        <ellipse
          cx="520"
          cy="320"
          rx="70"
          ry="35"
          fill="rgba(239, 68, 68, 0.3)"
          stroke="rgba(239, 68, 68, 0.9)"
          strokeWidth="2"
          className="animate-pulse"
          style={{animationDelay: '0.3s'}}
        />
        
        {/* Ближний Восток */}
        <ellipse
          cx="580"
          cy="220"
          rx="60"
          ry="30"
          fill="rgba(239, 68, 68, 0.3)"
          stroke="rgba(239, 68, 68, 0.9)"
          strokeWidth="2"
          className="animate-pulse"
          style={{animationDelay: '0.6s'}}
        />
        
        /* Южная Азия */
        <ellipse
          cx="700"
          cy="380"
          rx="65"
          ry="35"
          fill="rgba(239, 68, 68, 0.3)"
          stroke="rgba(239, 68, 68, 0.9)"
          strokeWidth="2"
          className="animate-pulse"
          style={{animationDelay: '0.9s'}}
        />
        
        /* Южная Америка - умеренная */
        <ellipse
          cx="300"
          cy="450"
          rx="50"
          ry="30"
          fill="rgba(245, 158, 11, 0.2)"
          stroke="rgba(245, 158, 11, 0.7)"
          strokeWidth="1.5"
        />
        
        /* Европа - стабильная */
        <ellipse
          cx="480"
          cy="200"
          rx="40"
          ry="25"
          fill="rgba(34, 197, 94, 0.2)"
          stroke="rgba(34, 197, 94, 0.7)"
          strokeWidth="1.5"
        />
        
        /* Северная Америка - умеренная */
        <ellipse
          cx="200"
          cy="250"
          rx="60"
          ry="35"
          fill="rgba(245, 158, 11, 0.2)"
          stroke="rgba(245, 158, 11, 0.7)"
          strokeWidth="1.5"
        />
        
        {/* Экватор */}
        <line
          x1="0"
          y1="300"
          x2="1200"
          y2="300"
          stroke="rgba(96, 165, 250, 0.4)"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        
        {/* Тропики */}
        <line
          x1="0"
          y1="200"
          x2="1200"
          y2="200"
          stroke="rgba(96, 165, 250, 0.2)"
          strokeWidth="0.5"
          strokeDasharray="3,3"
        />
        
        <line
          x1="0"
          y1="400"
          x2="1200"
          y2="400"
          stroke="rgba(96, 165, 250, 0.2)"
          strokeWidth="0.5"
          strokeDasharray="3,3"
        />
        
        {/* Текстовые метки континентов */}
        <g className="continent-labels">
          {/* Азия */}
          <text 
            x="700" 
            y="280" 
            textAnchor="middle" 
            fill="white" 
            fontSize="14"
            fontWeight="bold"
            className="drop-shadow-lg"
          >
            {lang === 'kk' ? 'Азия' : lang === 'ru' ? 'Азия' : 'Asia'}
          </text>
          
          {/* Африка */}
          <text 
            x="520" 
            y="320" 
            textAnchor="middle" 
            fill="white" 
            fontSize="14"
            fontWeight="bold"
            className="drop-shadow-lg"
          >
            {lang === 'kk' ? 'Африка' : lang === 'ru' ? 'Африка' : 'Africa'}
          </text>
          
          {/* Европа */}
          <text 
            x="480" 
            y="200" 
            textAnchor="middle" 
            fill="white" 
            fontSize="12"
            fontWeight="bold"
            className="drop-shadow-lg"
          >
            {lang === 'kk' ? 'Еуропа' : lang === 'ru' ? 'Европа' : 'Europe'}
          </text>
          
          {/* Северная Америка */}
          <text 
            x="200" 
            y="250" 
            textAnchor="middle" 
            fill="white" 
            fontSize="12"
            fontWeight="bold"
            className="drop-shadow-lg"
          >
            {lang === 'kk' ? 'Солт. Америка' : lang === 'ru' ? 'Сев. Америка' : 'North America'}
          </text>
          
          {/* Южная Америка */}
          <text 
            x="300" 
            cy="450" 
            textAnchor="middle" 
            fill="white" 
            fontSize="12"
            fontWeight="bold"
            className="drop-shadow-lg"
          >
            {lang === 'kk' ? 'Оңт. Америка' : lang === 'ru' ? 'Юж. Америка' : 'South America'}
          </text>
          
          {/* Австралия */}
          <text 
            x="1000" 
            y="420" 
            textAnchor="middle" 
            fill="white" 
            fontSize="12"
            fontWeight="bold"
            className="drop-shadow-lg"
          >
            {lang === 'kk' ? 'Австралия' : lang === 'ru' ? 'Австралия' : 'Australia'}
          </text>
        </g>
        
        {/* Легенда */}
        <rect 
          x="20" 
          y="20" 
          width="200" 
          height="140" 
          fill="rgba(15, 23, 42, 0.8)" 
          stroke="rgba(96, 165, 250, 0.5)"
          strokeWidth="1"
          rx="8"
        />
        
        <text 
          x="120" 
          y="45" 
          textAnchor="middle" 
          fill="#60A5FA" 
          fontSize="16"
          fontWeight="bold"
        >
          {lang === 'kk' ? 'Әлемдік су тапшылығы' : lang === 'ru' ? 'Мировой дефицит воды' : 'Global Water Scarcity'}
        </text>
        
        <g className="legend-items">
          {/* Критический */}
          <rect x="35" y="65" width="14" height="14" rx="2" fill="rgba(239, 68, 68, 0.7)" />
          <text x="58" y="77" fill="#CBD5E1" fontSize="12">
            {lang === 'kk' ? 'Критикалық деңгей' : lang === 'ru' ? 'Критический уровень' : 'Critical Level'}
          </text>
          <text x="58" y="92" fill="#94A3B8" fontSize="10">
            {lang === 'kk' ? '(>40% тапшылық)' : lang === 'ru' ? '(>40% дефицит)' : '(>40% scarcity)'}
          </text>
          
          {/* Умеренный */}
          <rect x="35" y="105" width="14" height="14" rx="2" fill="rgba(245, 158, 11, 0.7)" />
          <text x="58" y="117" fill="#CBD5E1" fontSize="12">
            {lang === 'kk' ? 'Орташа деңгей' : lang === 'ru' ? 'Умеренный уровень' : 'Moderate Level'}
          </text>
          <text x="58" y="132" fill="#94A3B8" fontSize="10">
            {lang === 'kk' ? '(20-40% тапшылық)' : lang === 'ru' ? '(20-40% дефицит)' : '(20-40% scarcity)'}
          </text>
        </g>
        
        {/* Статистика */}
        <rect 
          x="980" 
          y="20" 
          width="200" 
          height="80" 
          fill="rgba(15, 23, 42, 0.8)" 
          stroke="rgba(96, 165, 250, 0.5)"
          strokeWidth="1"
          rx="8"
        />
        
        <text 
          x="1080" 
          y="45" 
          textAnchor="middle" 
          fill="#60A5FA" 
          fontSize="14"
          fontWeight="bold"
        >
          {lang === 'kk' ? 'Статистика' : lang === 'ru' ? 'Статистика' : 'Statistics'}
        </text>
        
        <text 
          x="990" 
          y="70" 
          fill="#CBD5E1" 
          fontSize="11"
        >
          • {lang === 'kk' ? '2.2 млрд адам су тапшылығында' : lang === 'ru' ? '2.2 млрд людей с дефицитом воды' : '2.2 billion people with water scarcity'}
        </text>
        
        <text 
          x="990" 
          y="85" 
          fill="#CBD5E1" 
          fontSize="11"
        >
          • {lang === 'kk' ? '47% өсу 15 жылда' : lang === 'ru' ? '47% рост за 15 лет' : '47% increase in 15 years'}
        </text>
        
        {/* Заголовок */}
        <text 
          x="600" 
          y="570" 
          textAnchor="middle" 
          fill="#94A3B8" 
          fontSize="16"
          fontWeight="bold"
        >
          🌍 {lang === 'kk' ? 'Әлемдік су ресурстары картасы' : lang === 'ru' ? 'Карта мировых водных ресурсов' : 'Global Water Resources Map'}
        </text>
        
        {/* Шкала серьезности */}
        <rect 
          x="450" 
          y="520" 
          width="300" 
          height="15" 
          fill="url(#water-scarcity-gradient)"
          rx="2"
        />
        
        <defs>
          <linearGradient id="water-scarcity-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0.7)" />
            <stop offset="30%" stopColor="rgba(245, 158, 11, 0.7)" />
            <stop offset="70%" stopColor="rgba(239, 68, 68, 0.7)" />
            <stop offset="100%" stopColor="rgba(185, 28, 28, 0.7)" />
          </linearGradient>
        </defs>
        
        <text 
          x="350" 
          y="530" 
          fill="#CBD5E1" 
          fontSize="11"
        >
          {lang === 'kk' ? 'Төмен' : lang === 'ru' ? 'Низкая' : 'Low'}
        </text>
        
        <text 
          x="750" 
          y="530" 
          fill="#CBD5E1" 
          fontSize="11"
        >
          {lang === 'kk' ? 'Жоғары' : lang === 'ru' ? 'Высокая' : 'High'}
        </text>
      </svg>
    </div>
  );
};

export default WorldMap;
