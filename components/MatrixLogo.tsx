export default function MatrixLogo() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="grad4" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00FF41', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00B830', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Scanline effect */}
        <pattern id="scanlines" patternUnits="userSpaceOnUse" width="100" height="2">
          <line x1="0" y1="0" x2="100" y2="0" stroke="#000" strokeWidth="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      
      {/* Background squares */}
      <rect x="25" y="25" width="150" height="150" rx="10" fill="#0D1117" />
      <rect x="25" y="25" width="150" height="150" rx="10" fill="url(#scanlines)" />
      
      {/* Binary code background */}
      <text x="35" y="45" fontFamily="'Courier New', monospace" fontSize="10" fill="url(#grad4)" opacity="0.2">
        01001100
      </text>
      <text x="35" y="165" fontFamily="'Courier New', monospace" fontSize="10" fill="url(#grad4)" opacity="0.2">
        01010010
      </text>
      
      {/* Main LR */}
      <text
        x="100"
        y="125"
        fontFamily="'Courier New', monospace"
        fontSize="72"
        fontWeight="bold"
        fill="url(#grad4)"
        textAnchor="middle"
      >
        LR
      </text>
      
      {/* Cursor underscore */}
      <rect x="130" y="125" width="25" height="6" fill="url(#grad4)">
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </rect>
      
      {/* Corner brackets */}
      <path d="M 30 30 L 30 50 M 30 30 L 50 30" stroke="url(#grad4)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 170 30 L 170 50 M 170 30 L 150 30" stroke="url(#grad4)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 30 170 L 30 150 M 30 170 L 50 170" stroke="url(#grad4)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 170 170 L 170 150 M 170 170 L 150 170" stroke="url(#grad4)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

