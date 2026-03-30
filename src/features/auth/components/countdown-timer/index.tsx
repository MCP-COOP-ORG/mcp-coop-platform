"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/shared/ui/components/hero-ui";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  expiresAt: number;
  isDisabled?: boolean;
  onExpired: () => void;
  onBack: () => void;
}

function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function CountdownTimer({ expiresAt, isDisabled = false, onExpired, onBack }: CountdownTimerProps) {
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
      color="danger"
      variant="flat"
      onPress={onBack}
      isDisabled={isExpired || isDisabled}
      aria-label="Back to email input"
      className="!p-0 !min-w-[44px] !w-[44px] !h-[44px] !min-h-[44px] rounded-xl shrink-0"
    >
      <div className="flex flex-col items-center justify-center gap-[1px]">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-[9px] font-mono leading-none tracking-tight">
          {isExpired ? "00:00" : formatRemaining(remaining)}
        </span>
      </div>
    </Button>
  );
}
