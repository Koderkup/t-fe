import { FC, Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Banners } from "@/components";
import useContactRequestListener from "@/hooks/useContactRequestListener";
import { AuthProvider } from "@/providers";
import YandexMetrika from "@/components/ui/yandex-metrica/yandex-metrica";

const PageLayout: FC = () => {
  useContactRequestListener();

  return (
    <AuthProvider>
      <Suspense>
        <YandexMetrika />
      </Suspense>
      <main className="max-h-full">
        <Outlet />
      </main>
      <Banners />
      <ScrollRestoration />
    </AuthProvider>
  );
};

export default PageLayout;
