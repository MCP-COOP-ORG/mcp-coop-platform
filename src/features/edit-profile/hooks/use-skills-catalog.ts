import { useState, useEffect } from "react";
import { getSkillsCatalogAction } from "../api";
import type { SkillCatalogItem } from "../types";

export function useSkillsCatalog() {
  const [catalog, setCatalog] = useState<SkillCatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCatalog() {
      const result = await getSkillsCatalogAction();
      if (result.error) {
        setError(result.error);
      } else {
        setCatalog(result.data);
      }
      setIsLoading(false);
    }
    
    loadCatalog();
  }, []);

  return { catalog, isLoading, error };
}
