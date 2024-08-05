import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, className, type, onClick, id }) {
  return (
    <button type={type} className={className} onClick={onClick} id={id}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  id: PropTypes.string,
};
