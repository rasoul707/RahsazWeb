import { useEffect } from "react";
import { useRef } from "react";

export const useUpdateEffect = (callback, depen) => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    return callback();
  }, depen);
};
