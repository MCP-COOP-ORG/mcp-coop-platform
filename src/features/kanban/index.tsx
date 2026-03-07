"use client";

import { useEffect, useRef } from "react";
import { Spinner } from "@heroui/react";
import { useDynamicScript } from "@/shared/hooks/use-dynamic-script";

interface KanbanMicrofrontendProps {
  // If the MFE exposes a global render function (e.g., window.renderKanbanMicroapp(elementId))
  // we can call it after the script loads.
}

export default function KanbanMicrofrontend({}: KanbanMicrofrontendProps) {
  const mfeUrl = process.env.NEXT_PUBLIC_KANBAN_MFE_URL || "";
  const { ready, failed } = useDynamicScript({ url: mfeUrl });
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ready && rootRef.current) {
      // Assuming the microfrontend exposes a global function to mount itself
      // e.g., window.mountKanbanApp('kanban-mfe-root')
      // For now, we just guarantee the script is loaded and the DOM node exists.
      console.log("Kanban MFE integration point is ready.");
      
      // If the MFE uses standard ReactDOM.render(<App/>, document.getElementById('kanban-mfe-root')),
      // it will automatically attach here once the script executes.
    }
  }, [ready]);

  if (!mfeUrl) {
    return (
      <div className="p-4 bg-warning/10 text-warning rounded-lg border border-warning/20">
        <p className="font-semibold">Microfrontend Not Configured</p>
        <p className="text-sm">Please set NEXT_PUBLIC_KANBAN_MFE_URL in your .env file.</p>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="p-4 bg-danger/10 text-danger rounded-lg border border-danger/20">
        <p className="font-semibold">Microfrontend Error</p>
        <p className="text-sm">Failed to load the Kanban application bundle from: {mfeUrl}</p>
        <p className="text-xs opacity-70 mt-2">Ensure the container is running and the bundle path is correct.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px] flex flex-col relative rounded-xl overflow-hidden border border-divider bg-content1 mfe-container">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-content1/80 z-10 backdrop-blur-sm">
          <Spinner size="lg" color="primary" label="Loading Kanban Board..." />
        </div>
      )}
      {/* The microapp will render its React tree inside this div */}
      <div id="kanban-mfe-root" ref={rootRef} className="w-full h-full" />
    </div>
  );
}
