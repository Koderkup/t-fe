import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "@twa-dev/sdk/react";
import UserInfo from "./components/user-info.tsx";
import AdminNavigation from "./components/admin-navigation.tsx";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { useMainStore } from "@/store/main-store.ts";

const AdminPage: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [setActiveShopId] = useMainStore(state => [state.setActiveShopId]);

  useEffect(() => {
    if (params.storeId) {
      setActiveShopId(params.storeId);
    }
  }, [params.shopId, params.storeId, setActiveShopId]);

  return (
    <div className="px-2 py-1">
      <BackButton onClick={() => navigate(RoutesPaths.ADMINISTRATE)} />
      <UserInfo />
      <AdminNavigation />
    </div>
  );
};

export default AdminPage;
