"use client";
import { Spinner } from "@heroui/react";
import { useDynamicScript } from "@/shared/hooks/use-dynamic-script";

export interface MfeConfig {
  url: string;
  elementId: string;
  name?: string;
}

/**
 * Universal HOC to wrap any microfrontend implementation.
 * Encapsulates script downloading, error handling, and providing a DOM anchor.
 */
export function withDynamicMfe<P extends object>(
  config: MfeConfig | ((props: P) => MfeConfig)
) {
  return function WithDynamicMfeComponent(props: P) {
    const resolvedConfig = typeof config === "function" ? config(props) : config;
    const { url, elementId, name = "Microfrontend" } = resolvedConfig;

    const { ready, failed } = useDynamicScript({ url });

    if (!url) {
      return (
        <div className="p-4 bg-warning/10 text-warning rounded-lg border border-warning/20">
          <p className="font-semibold">{name} Not Configured</p>
          <p className="text-sm">Please provide a valid MFE URL.</p>
        </div>
      );
    }

    if (failed) {
      return (
        <div className="p-4 bg-danger/10 text-danger rounded-lg border border-danger/20">
          <p className="font-semibold">{name} Error</p>
          <p className="text-sm">Failed to load the application bundle from: {url}</p>
          <p className="text-xs opacity-70 mt-2">Ensure the container is running and the bundle path is correct.</p>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col relative rounded-xl overflow-hidden border border-divider bg-content1 mfe-container">
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-content1/80 z-10 backdrop-blur-sm min-h-[500px]">
            <Spinner size="lg" color="primary" label={`Loading ${name}...`} />
          </div>
        )}
        {/* The microapp will render its React tree inside this div */}
        <div id={elementId} className="w-full h-full min-h-[500px]" />
      </div>
    );
  };
}
