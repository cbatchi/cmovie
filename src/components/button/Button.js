import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

const Button = ({ className, onClick, children }) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick ? () => onClick() : null}
    >
      {children}
    </button>
  );
};

export const OutlineButton = ({ children, className, onClick }) => <Button
  className={`btn-outline ${className}`}
  onClick={onClick ? () => onClick() : null}
>
  {children}
</Button>


Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
