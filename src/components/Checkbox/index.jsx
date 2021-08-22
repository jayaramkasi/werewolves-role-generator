import React from "react";

import "./styles.css";

const Checkbox = ({
  value,
  onChange,
  className,
  label,
  variant,
  id,
  customPath,
  classNameBox,
  classNameTickedBox,
  classNameLabel,
  tickColor,
  tickWidth,
}) => {
  const handleChange = () => {
    onChange(!value);
  };

  const variantMap = {
    primary: "checkbox-primary",
    "primary-dark": "checkbox-primary-dark",
    secondary: "checkbox-secondary",
    "secondary-dark": "checkbox-secondary-dark",
    default: "",
  };

  const valueColor = value ? tickColor || "white" : "transparent";
  return (
    <div className={`flex flex-row items-center ${className || ""}`}>
      <svg
        className={`rounded-lg border-2 w-6 h-6 transition-colors duration-250 ${
          value ? variantMap[variant] || variantMap["default"] : `bg-white`
        } ${value ? classNameTickedBox : ``} ${classNameBox || ""}`}
        onClick={handleChange}
      >
        <path
          d={
            value
              ? customPath || `M17,8,15.58,6.58,9,13.17,6.41,10.6,5,12l3,3Z`
              : ``
          }
          stroke={valueColor}
          fill={valueColor}
        />
      </svg>

      <div className={`px-2 ${classNameLabel || ""}`}>{label}</div>
    </div>
  );
};

export default Checkbox;
