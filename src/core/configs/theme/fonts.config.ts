import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

export const ibmPlexSans = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-ibm-sans",
  display: "swap",
});

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-ibm-mono",
  display: "swap",
});
