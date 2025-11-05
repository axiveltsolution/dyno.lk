import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const Location = useLocation();
  const pathname = Location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
