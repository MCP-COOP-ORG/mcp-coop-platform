import type { ReactNode } from "react";

export interface HighlightedTextProps {
  text: string;
  words?: readonly string[];
  highlightClassName?: string;
}

export function HighlightedText({ 
  text, 
  words = [], 
  highlightClassName = "text-primary" 
}: HighlightedTextProps): ReactNode {
  if (!text) return null;
  if (!words || words.length === 0) return <>{text}</>;
  
  const pattern = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const parts = text.split(new RegExp(`(${pattern})`, "gi"));
  
  return (
    <>
      {parts.map((part, i) => {
        const isMatch = words.some(w => w.toLowerCase() === part.toLowerCase());
        
        return isMatch ? (
          <span key={i} className={highlightClassName}>
            {part}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}
