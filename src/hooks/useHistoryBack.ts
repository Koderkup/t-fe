import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useHistoryBack = (route?: string) => {
  const navigate = useNavigate();
  const location = useLocation();

  const backRoute =
    route || location.pathname.split("/").slice(0, -1).join("/");

  const goBack = useCallback(() => {
    navigate(backRoute);
  }, [backRoute, navigate]);

  return { goBack };
};

export default useHistoryBack;
