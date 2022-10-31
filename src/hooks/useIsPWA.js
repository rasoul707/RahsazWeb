import { useEffect, useState } from "react";

export default function useIsPWA() {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // For iOS
    if (window.navigator.standalone) return setIsPWA(true);

    // For Android
    if (window.matchMedia("(display-mode: standalone)").matches)
      return setIsPWA(true);

    // If neither is true, it's not installed
    setIsPWA(false);
  }, []);

  return isPWA;
}
