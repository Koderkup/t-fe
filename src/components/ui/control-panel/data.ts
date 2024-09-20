import AdminIcon from "public/icons/admin-icon.svg";
import AdminActiveIcon from "public/icons/admin-icon-active.svg";
import CreateApp from "public/icons/create-app.svg";
import CreateAppActive from "public/icons/create-app-active.svg";
import AppSettings from "public/icons/settings-3-line.svg";
import AppSettingsActive from "public/icons/app-settings-active.svg";
import { RoutesPaths } from "@/routes/paths.config.ts";

export const CONTROL_PANEL_DATA = [
  {
    name: "control-panel.administrate",
    icon: AdminIcon,
    activeIcon: AdminActiveIcon,
    href: RoutesPaths.ADMINISTRATE,
  },
  {
    name: "control-panel.create-app",
    icon: CreateApp,
    activeIcon: CreateAppActive,
    href: RoutesPaths.MAIN,
  },

  {
    name: "control-panel.app-settings",
    icon: AppSettings,
    activeIcon: AppSettingsActive,
    href: RoutesPaths.APP_SETTINGS,
  },
] as const;
