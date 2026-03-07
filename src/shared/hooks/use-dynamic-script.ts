"use client";

import { useState, useEffect } from "react";

export interface DefaultDynamicScriptOptions {
  url: string;
}

export function useDynamicScript({ url }: DefaultDynamicScriptOptions) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }

    // Check if the script is already loaded
    if (document.querySelector(`script[src="${url}"]`)) {
      setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.type = "module";
    script.async = true;

    setReady(false);
    setFailed(false);

    script.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      setReady(true);
    };

    script.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.body.appendChild(script);

    return () => {
      // In a real MFE, you might want to clean up the script tag or the mounted React instance
      // But for a single page app, leaving the script tag is usually fine for caching.
      // document.body.removeChild(script);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
}
