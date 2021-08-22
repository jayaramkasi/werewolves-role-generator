import React from "react";

import "./styles.css";

const Button = ({
  id,
  size,
  children,
  variant,
  className,
  onClick,
  disabled,
}) => {
  const variantClassNames = {
    primary: "btn--primary",
    disabled: "btn--disabled",
    "outlined-primary":
      "btn--outline-primary border-2 focus:outline-none focus:ring-2",
    secondary: "btn--secondary",
    "outlined-secondary":
      "btn--outline-secondary border-2 focus:outline-none focus:ring-2",
    danger: "btn--danger",
    custom: "",
  };

  return (
    <button
      id={id || `button-without-id`}
      className={`${
        variantClassNames[variant] || ""
      } btn rounded transition-colors duration-500  ${size || ""}  ${
        disabled ? "btn--disabled" : ""
      } ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
      role="button"
    >
      {children}
    </button>
  );
};

export default Button;
