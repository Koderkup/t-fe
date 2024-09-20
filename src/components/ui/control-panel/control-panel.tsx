import { FC, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CONTROL_PANEL_DATA } from "./data";
import Typography from "../typography/typography";
import { cn } from "@/utils/twMerge";
import { useUserAPI } from "@/hooks/api/useUserAPI";
import { useTelegram } from "@/hooks/useTelegram";
import { useShopsAPI } from "@/hooks/api/useShopsAPI";

const ControlPanel: FC = () => {
  const { user } = useTelegram();
  const {
    getUserByTelegramId: { data },
  } = useUserAPI(user?.id);
  const { shops } = useShopsAPI("", data?.id);
  const { t } = useTranslation("translation");

  const shopsCheck = useMemo(
    () => shops.data?.some(el => !el.inDraft),
    [shops.data]
  );

  return (
    <div className="fixed bottom-0 left-0 z-[20] w-full rounded-t-[20px] bg-white px-4 pb-2 pt-4 shadow-control-panel">
      <div className="flex items-center gap-1">
        {CONTROL_PANEL_DATA.map(el => {
          const Icon = el.icon;
          const ActiveIcon = el.activeIcon;
          if (el.name === "control-panel.administrate") {
            return (
              <NavLink
                onClick={e => {
                  if (!shopsCheck) e.preventDefault();
                }}
                className={({ isActive }) =>
                  cn(
                    "flex w-full flex-col items-center gap-y-1 text-center",
                    isActive ? "control-panel-active" : "control-panel-default"
                  )
                }
                to={el.href}
                key={el.name}
              >
                <span className="icon hidden">
                  <Icon />
                </span>
                <span className="active-icon hidden">
                  <ActiveIcon />
                </span>
                <Typography tag="p" variant="body-md">
                  {t(el.name)}
                </Typography>
              </NavLink>
            );
          }
          return (
            <NavLink
              className={({ isActive }) =>
                cn(
                  "flex w-full flex-col items-center gap-y-1 text-center",
                  isActive ? "control-panel-active" : "control-panel-default"
                )
              }
              to={el.href}
              key={el.name}
            >
              <span className="icon hidden">
                <Icon />
              </span>
              <span className="active-icon hidden">
                <ActiveIcon />
              </span>
              <Typography tag="p" variant="body-md">
                {t(el.name)}
              </Typography>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default ControlPanel;
