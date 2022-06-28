import { useEffect } from "react";

const useOutsideClickDetector = (ref, action, shouldAct = false) => {
  useEffect(() => {
    if (!shouldAct) return;

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log(`mousedown`);
        action();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [action, ref, shouldAct]);
};

export default useOutsideClickDetector;
