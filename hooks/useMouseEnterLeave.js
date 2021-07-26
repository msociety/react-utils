import { useEffect } from "react";

const useMouseEnterLeave = (ref, { onMouseEnter = null, onMouseLeave = null, timeAfterLeave = 400 }) => {
  useEffect(() => {
    let leavingTimeout = null;

    const mouseLeaveHandler = event => {
      leavingTimeout = setTimeout(() => {
        if (leavingTimeout) {
          leavingTimeout = null;
          onMouseLeave(event);
        }
      }, timeAfterLeave);
    };

    const mouseEnterHandler = event => {
      leavingTimeout = null;
      if (onMouseEnter) {
        onMouseEnter(event);
      }
    };

    if (ref.current) {
      if (onMouseEnter || onMouseLeave) {
        ref.current.addEventListener("mouseenter", mouseEnterHandler);
      }
      if (onMouseLeave) {
        ref.current.addEventListener("mouseleave", mouseLeaveHandler);
      }
    }

    return () => {
      if (ref.current) {
        if (onMouseEnter || onMouseLeave) {
          ref.current.removeEventListener("mouseenter", mouseEnterHandler);
        }
        if (onMouseLeave) {
          ref.current.removeEventListener("mouseleave", mouseLeaveHandler);
        }
      }
    };
  }, [ref, onMouseEnter, onMouseLeave]);
};

export default useMouseEnterLeave;
