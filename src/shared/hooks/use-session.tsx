"use client";

import React from "react";
import type { AppSession } from "@/shared/types/auth";

const SessionContext = React.createContext<AppSession>({
  myProfile: null,
});

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: AppSession;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return React.useContext(SessionContext);
}
