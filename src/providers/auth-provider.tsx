import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesPaths } from "@/routes/paths.config";
import { useTelegram } from "@/hooks/useTelegram.ts";
import { useUserAPI } from "@/hooks/api/useUserAPI.ts";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useTelegram();
  const {
    getUserByTelegramId: { data },
  } = useUserAPI(user?.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.id) {
      navigate(RoutesPaths.MAIN, { replace: true });
    }

    if (!data?.id) {
      navigate(RoutesPaths.WELCOME, { replace: true });
    }
  }, [data?.id, navigate]);

  return children;
};

export default AuthProvider;
