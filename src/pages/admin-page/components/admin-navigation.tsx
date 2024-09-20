import { FC } from "react";
import { useTranslation } from "react-i18next";
import { navigationData } from "@/pages/admin-page/components/data";
import NavigationItem from "@/pages/admin-page/components/navigation-item";
import { Typography } from "@/components";

const AdminNavigation: FC = () => {
  const { main, settings } = navigationData;
  const { t } = useTranslation("translation");

  return (
    <nav className="mb-6 mt-4">
      <Typography variant="body-base" className="mb-4 ml-4 font-medium">
        {t("home-page.navigation.main")}
      </Typography>

      <div className="mb-4 flex flex-col gap-y-2">
        {main.map(elem => (
          <NavigationItem key={elem.path} {...elem}>
            {t(elem.translateKey)}
          </NavigationItem>
        ))}
      </div>

      <Typography variant="body-base" className="mb-4 ml-4 font-medium">
        {t("home-page.navigation.settings")}
      </Typography>

      <div className="flex flex-col gap-y-2">
        {settings.map(elem => (
          <NavigationItem key={elem.path} {...elem}>
            {t(elem.translateKey)}
          </NavigationItem>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavigation;
