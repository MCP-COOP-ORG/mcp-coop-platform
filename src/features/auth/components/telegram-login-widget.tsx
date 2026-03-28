"use client";

import React, { useRef } from "react";
import { useTelegramWidget } from "@/features/auth/hooks/use-telegram";
import { TelegramLoginWidgetProps } from "@/features/auth/types";

export function TelegramLoginWidget({ onAuth, isLoading }: TelegramLoginWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [authError, setAuthError] = React.useState<string | null>(null);

  const wrapperOnAuth = async (data: string) => {
    setAuthError(null);
    try {
      const result = await onAuth(data);
      if (result && result.success === false) {
        setAuthError(result.error || "Authentication rejected by server");
      }
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : "Authentication error occurred");
    }
  };

  const { botName, error: configError } = useTelegramWidget({ containerRef, onAuth: wrapperOnAuth });
  const displayError = authError || configError;

  return (
    <div className="flex flex-col items-center w-full">
      {(displayError || !botName) && (
        <div className="text-danger bg-danger/5 w-full text-sm text-center font-medium p-3 border border-danger/20 rounded-lg mb-4">
          {displayError || "Configuration error: Telegram Bot Name is missing."}
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full relative min-h-[40px] mb-2">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 rounded-[8px] backdrop-blur-sm">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <div 
          ref={containerRef} 
          className={`flex justify-center w-full transition-opacity duration-200 ${isLoading ? "opacity-50 pointer-events-none" : ""}`} 
        />
      </div>
    </div>
  );
}
