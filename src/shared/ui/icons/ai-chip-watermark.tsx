import type { SVGProps } from "react";

const AiChipWatermark = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="70" y="70" width="60" height="60" rx="6" />
    <rect x="75" y="75" width="50" height="50" rx="4" strokeDasharray="4 4" />
    <circle cx="100" cy="100" r="12" />
    <circle cx="100" cy="100" r="3" fill="currentColor" />
    
    <path d="M85 70 v-20 m0 -10 v-20" />
    <path d="M100 70 v-30 m0 -10 v-10" />
    <path d="M115 70 v-20 m0 -10 v-20" />
    <circle cx="85" cy="45" r="4" />
    <circle cx="100" cy="35" r="4" />
    <circle cx="115" cy="45" r="4" />
    <path d="M85 20 h-15 v10" strokeWidth="1" />
    <path d="M115 20 h15 v10" strokeWidth="1" />

    <path d="M85 130 v20 m0 10 v20" />
    <path d="M100 130 v30 m0 10 v10" />
    <path d="M115 130 v20 m0 10 v20" />
    <circle cx="85" cy="155" r="4" />
    <circle cx="100" cy="165" r="4" />
    <circle cx="115" cy="155" r="4" />
    <path d="M85 180 h-15 v-10" strokeWidth="1" />
    <path d="M115 180 h15 v-10" strokeWidth="1" />

    <path d="M70 85 h-20 m-10 0 h-20" />
    <path d="M70 100 h-30 m-10 0 h-10" />
    <path d="M70 115 h-20 m-10 0 h-20" />
    <circle cx="45" cy="85" r="4" />
    <circle cx="35" cy="100" r="4" />
    <circle cx="45" cy="115" r="4" />
    <path d="M20 85 v-15 h10" strokeWidth="1" />
    <path d="M20 115 v15 h10" strokeWidth="1" />

    <path d="M130 85 h20 m10 0 h20" />
    <path d="M130 100 h30 m10 0 h10" />
    <path d="M130 115 h20 m10 0 h20" />
    <circle cx="155" cy="85" r="4" />
    <circle cx="165" cy="100" r="4" />
    <circle cx="155" cy="115" r="4" />
    <path d="M180 85 v-15 h-10" strokeWidth="1" />
    <path d="M180 115 v15 h-10" strokeWidth="1" />
  </svg>
);

export { AiChipWatermark };
