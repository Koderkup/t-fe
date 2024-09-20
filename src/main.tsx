import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import WebApp from "@twa-dev/sdk";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/assets/styles/styles.scss";
import "swiper/css";
import "./i18n";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import routes from "@/routes";
import { getPhoneNumber } from "./utils/get-phone-number";

WebApp.expand();
WebApp.ready();
if (!getPhoneNumber()) {
  WebApp.requestContact();
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const manifest = import.meta.env.VITE_TON_MANIFEST_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifest}>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <RouterProvider router={routes} />
        </Suspense>
      </QueryClientProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);
