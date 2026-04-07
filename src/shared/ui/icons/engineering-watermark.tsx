import type { SVGProps } from "react";

const EngineeringWatermark = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="100" cy="40" r="8" />
    <path d="M100 32 v-12" />
    <path d="M85 20 h30" />
    <path d="M96 48 h8" />
    
    <path d="M93 46 L50 160" />
    <path d="M45 160 h10" />
    <path d="M50 160 v20" strokeWidth="2" />
    
    <path d="M107 46 L150 160" />
    <path d="M145 160 h10" />
    <path d="M150 160 v20" strokeWidth="2" />

    <path d="M60 120 A 70 70 0 0 0 140 120" strokeDasharray="4 4" />
    <path d="M56 112 L64 128" strokeWidth="1" />
    <path d="M144 112 L136 128" strokeWidth="1" />
    <path d="M100 120 v10" strokeWidth="1" />
    <path d="M70 100 L130 100" />
    <circle cx="100" cy="100" r="4" />

    <circle cx="115" cy="100" r="6" strokeDasharray="2 2" strokeWidth="3" />
  </svg>
);

export { EngineeringWatermark };
