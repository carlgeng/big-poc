import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className = '', ...props }) => {
  const baseStyles = 'bg-white rounded-lg shadow p-6';
  const classes = `${baseStyles} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
