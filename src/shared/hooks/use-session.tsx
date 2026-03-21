"use client";

import React from "react";
import type { Session } from "next-auth";

const SessionContext = React.createContext<{
  session: Session | null;
}>({
  session: null,
});

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return React.useContext(SessionContext);
}
