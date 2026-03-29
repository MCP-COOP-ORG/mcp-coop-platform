"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/shared/ui/components/hero-ui";

interface CountdownTimerProps {
  expiresAt: number;
  onExpired: () => void;
  onBack: () => void;
}

function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function CountdownTimer({ expiresAt, onExpired, onBack }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<number>(() => Math.max(0, expiresAt - Date.now()));
  const hasExpiredRef = useRef(false);
  const onExpiredRef = useRef(onExpired);

  // Update callback ref inside effect — avoids stale closure without breaking render purity
  useEffect(() => {
    onExpiredRef.current = onExpired;
  }, [onExpired]);

  useEffect(() => {
    hasExpiredRef.current = false;

    const tick = (intervalRef: { id: ReturnType<typeof setInterval> | null }) => {
      const next = Math.max(0, expiresAt - Date.now());
      setRemaining(next);
      if (next === 0 && !hasExpiredRef.current) {
        hasExpiredRef.current = true;
        if (intervalRef.id !== null) clearInterval(intervalRef.id);
        onExpiredRef.current();
      }
    };

    const intervalRef = { id: null as ReturnType<typeof setInterval> | null };
    tick(intervalRef); // immediate first sync
    intervalRef.id = setInterval(() => tick(intervalRef), 500);

    return () => { if (intervalRef.id !== null) clearInterval(intervalRef.id); };
  }, [expiresAt]);

  const isExpired = remaining === 0;

  return (
    <Button
      type="button"
      variant="flat"
      size="sm"
      onPress={onBack}
      isDisabled={isExpired}
      aria-label="Back to email input"
      className={[
        "min-w-[72px] font-mono font-semibold text-sm transition-all duration-200 shrink-0",
        isExpired
          ? "text-danger bg-danger/10 cursor-not-allowed"
          : "text-primary bg-primary/10 hover:bg-primary/20",
      ].join(" ")}
    >
      ⏱ {isExpired ? "00:00" : formatRemaining(remaining)}
    </Button>
  );
}
