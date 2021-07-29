import React from 'react';
import PropTypes from 'prop-types';
import { cx, css } from 'emotion';

// Dependency: https://github.com/ghosh/microtip

const wrapChild = props => {
  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    ...props,
    ...child.props,
    className: cx(props.className, child.props.className)
  });
};

const vars = css`
  --microtip-transition-duration: 0.18s; /* Specifies the duration of the tootltip transition */
  --microtip-transition-delay: 100ms; /* The delay on hover before showing the tooltip */
  --microtip-transition-easing: ease-in-out; /* The easing applied while transitioning the tooltip */
  --microtip-font-size: 13px; /* Sets the font size of the text in tooltip */
  --microtip-font-weight: normal; /* The font weight of the text in tooltip */
  --microtip-text-transform: none; /* Controls the casing of the text */
`;

const Tooltip = ({ label, position, size, wrap, className, ...rest }) => {
  const tootipProps = {
    role: 'tooltip',
    'aria-label': label,
    'data-microtip-position': position,
    'data-microtip-size': size,
    className: cx(vars, className)
  };
  return wrap ? wrapChild({ ...tootipProps, ...rest }) : <span {...tootipProps} {...rest} />;
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  position: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'right'
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'fit']),
  wrap: PropTypes.bool,
  className: PropTypes.string
};

Tooltip.defaultProps = {
  position: 'top',
  size: undefined,
  wrap: false,
  className: undefined
};

export default Tooltip;
