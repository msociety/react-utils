import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useIsMounted } from '../hooks';

const Portal = ({ children, container, nodeAttrs, position }) => {
  const nodeRef = useRef(document.createElement('div'));
  const node = nodeRef.current;

  const isMounted = useIsMounted();

  useEffect(() => {
    Object.keys(nodeAttrs).map(key => node.setAttribute(key, nodeAttrs[key]));
    if (container) {
      container.insertAdjacentElement(position, node);
      return () => container.removeChild(node);
    }
    if (isMounted) {
      throw new Error(`Portal: container element not found.`);
    }
    return () => null;
  }, [container, nodeAttrs, position, node]);

  return createPortal(children, node);
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  container: PropTypes.instanceOf(Element),
  nodeAttrs: PropTypes.shape({
    id: PropTypes.string
  }),
  position: PropTypes.oneOf([
    'beforebegin', // Before container element.
    'afterbegin', // Inside container element, before its first child.
    'beforeend', // Inside container element, after its last child.
    'afterend' // After container element.
  ])
};

Portal.defaultProps = {
  container: document.querySelector('#root'),
  nodeAttrs: {},
  position: 'beforeend' // Same as appendChild
};

export default Portal;
