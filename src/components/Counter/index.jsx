import React, { useState, useEffect, useRef } from "react";

import "./styles.css";

import Button from "../Button";
import Input from "../Input";

const Counter = ({
  minValue = -1111111111111,
  label = " ",
  maxValue = 1111111111111,
  defaultValue = 0,
  onChange,
  variant = "primary",
  incrementValue = 1,
  decrementValue = 1,
  inputClassNames = "",
  decrementContent = "-",
  incrementContent = "+",
  reachedMinErrorText = `Value must be >= ${minValue}`,
  reachedMaxErrorText = `Value must be <= ${maxValue}`,
  className = "",
  labelClassNames = "",
  buttonClassNames = "",
  buttonContainerClassNames = "",
}) => {
  const [value, setValue] = useState(defaultValue || 0);
  const [feedback, setFeedback] = useState("");

  const handleDecrement = () => setValue(value - decrementValue);
  const handleIncrement = () => setValue(value + incrementValue);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    onChange(value);
    setFeedback("");
  }, [value]);

  return (
    <div className={`container mx-auto flex flex-col ${className}`}>
      <div className={`flex flex-row ${buttonContainerClassNames}`}>
        <Button
          onClick={handleDecrement}
          className={buttonClassNames}
          variant={variant}
          disabled={value <= minValue}
          size="sm"
        >
          {decrementContent}
        </Button>
        <Input
          className={`w-16 text-center ${inputClassNames} pr-4 `}
          value={value}
          onChange={(e) => {
            e.target.value >= minValue && e.target.value <= maxValue
              ? setValue(e.target.value)
              : setFeedback(
                  e.target.value < minValue
                    ? reachedMinErrorText
                    : reachedMaxErrorText
                );
          }}
        />
        <Button
          onClick={handleIncrement}
          className={buttonClassNames}
          variant={variant}
          disabled={value >= maxValue}
          size="sm"
        >
          {incrementContent}
        </Button>
      </div>
      <div className="flex">
        <p className={`text-xs text-red-500`}>{feedback}</p>
      </div>
    </div>
  );
};

export default Counter;
