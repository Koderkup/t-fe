import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function YandexMetrika() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(98276873, "hit", location.pathname);
    }
  }, [location.pathname]);

  return null;
}
