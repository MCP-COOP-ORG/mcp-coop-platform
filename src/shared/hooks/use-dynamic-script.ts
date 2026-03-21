"use client";

import { useState, useEffect } from "react";

export interface DefaultDynamicScriptOptions {
  url: string;
}

export function useDynamicScript({ url }: DefaultDynamicScriptOptions) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);

  if (url !== currentUrl) {
    setCurrentUrl(url);
    setReady(false);
    setFailed(false);
  }

  useEffect(() => {
    if (!url) {
      return;
    }

    const cacheBuster = `t=${Date.now()}`;
    const scriptUrl = url.includes("?") ? `${url}&${cacheBuster}` : `${url}?${cacheBuster}`;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.type = "module";
    script.async = true;

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
      // Clean up the script tag on unmount to prevent polluting the document head
      // during SPA navigation
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [url]);

  return {
    ready,
    failed,
  };
}
