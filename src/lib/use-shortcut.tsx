import { useEffect } from "react";

type ShortcutOptions = {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean; // cmd on macOS
  preventDefault?: boolean;
};

export function useShortcut(
  key: string,
  callback: () => void,
  { ctrl, alt, shift, meta, preventDefault = true }: ShortcutOptions = {},
) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        (ctrl === undefined || e.ctrlKey === ctrl) &&
        (alt === undefined || e.altKey === alt) &&
        (shift === undefined || e.shiftKey === shift) &&
        (meta === undefined || e.metaKey === meta)
      ) {
        if (preventDefault) e.preventDefault();
        callback();
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback, ctrl, alt, shift, meta, preventDefault]);
}
