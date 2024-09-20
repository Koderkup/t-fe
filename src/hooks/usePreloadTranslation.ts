import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const usePreloadTranslation = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const preloadFn = useCallback(
    async (namespace: string, path: string) => {
      await i18n.loadNamespaces(namespace);
      navigate(path);
    },
    [i18n, navigate]
  );

  return { preloadFn };
};

export default usePreloadTranslation;
