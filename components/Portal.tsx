import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "@/hooks";

const Portal = ({ children, container, nodeAttrs, position }: Props) => {
  const nodeRef = useRef(document.createElement("div"));
  const node = nodeRef.current;

  const isMounted = useIsMounted();

  useEffect(() => {
    Object.keys(nodeAttrs).map(key => node.setAttribute(key, nodeAttrs[key]));
    if (container) {
      container.insertAdjacentElement(position, node);
      return () => {
        container.removeChild(node);
      };
    }
    if (isMounted) {
      throw new Error(`Portal: container element not found.`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container, nodeAttrs, position, node]);

  return isMounted ? createPortal(children, node) : null;
};

interface Props {
  children: ReactNode;
  container: HTMLElement; // React.RefObject<HTMLElement>;
  nodeAttrs: {
    id: string;
    [key: string]: string;
  };

  // <!-- beforebegin -->
  // <container>
  //   <!-- afterbegin -->
  //   content
  //   <!-- beforeend -->
  // </container>
  // <!-- afterend -->
  position: "beforebegin" | "afterbegin" | "beforeend" | "afterend";
}

Portal.defaultProps = {
  container: document.querySelector("body"),
  nodeAttrs: {},
  position: "beforeend", // Same as appendChild
};

export default Portal;
