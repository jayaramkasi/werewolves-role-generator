import React, { useEffect, useState } from "react";
import "./styles.css";

const isValidEmail = (value) =>
  value.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

const Input = ({
  type,
  value,
  onChange,
  placeholder = "",
  className = "",
  classNameInput = "",
  label = "",
  isValid,
  runCheck,
  feedbackToShow = null,
  startIcons = [],
  endIcons = [],
}) => {
  // Checking if the new version is getting published
  const [feedback, setFeedback] = useState(feedbackToShow);

  useEffect(() => {
    setFeedback(feedbackToShow);
  }, [value]);

  useEffect(() => {
    if (runCheck && isValid) {
      console.log("Here");
      type === "email"
        ? setFeedback(isValidEmail(value) ? null : "Please enter a valid email")
        : !isValid() && setFeedback("Please enter a valid input");
    }
  }, [runCheck]);

  return (
    <div
      className={`flex flex-col mt-1 rounded justify-center bg-white input-container focus-within:ring focus-within:ring-primary align-middle ${className}`}
    >
      {
        // Labels
        label.length > 0 && (
          <div className="label pl-2 leading-none ">
            <label className="text-tiny">{label}</label>
          </div>
        )
      }
      <div className="flex flex-row justify-start align-middle mt-1">
        <div className="align-middle justify-center p-1">{startIcons}</div>
        <input
          value={value}
          onChange={onChange}
          type={type}
          className={`inp pl-4 pr-2 bg-transparent focus:outline-none rounded ${classNameInput}`}
          placeholder={placeholder}
        />
        <div className="align-middle">{endIcons}</div>
      </div>
      {((isValid && isValid()) || type === "email" || feedbackToShow) && (
        <div
          className={`feedback pl-2 text-red-500 text-tiny ${
            feedback ? `py-1` : `py-0`
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default Input;
