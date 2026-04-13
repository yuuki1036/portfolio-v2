import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 24;

export function useNavStuck() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const handler = () => setStuck(window.scrollY > SCROLL_THRESHOLD);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return stuck;
}
