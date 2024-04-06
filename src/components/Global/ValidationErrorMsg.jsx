import './ValidationErrorMsg.css'
/* This code defines a React functional component named `ValidationErrorMsg` that takes an array
`missingObjects` as a parameter. */
import React from 'react';

const ValidationErrorMsg = ({ missingObjects }) => {
  // Function to capitalize the first letter of each word and remove underscores
  const formatKey = (key) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="m-4 text-danger">
      {
        missingObjects?.length === 0 ? "" :
          <div className="error-message">
            {missingObjects?.map((key, index) => (
              <span key={index} className="error-key">
                {formatKey(key)}{(index < missingObjects.length - 1) && ", "}
              </span>
            ))}
            <span className="error-message-text mx-2 bold">should not be empty</span>
          </div>
      }
    </div>
  );
};

export default ValidationErrorMsg;
