import React, { useState } from "react";

const TruncatedTitle = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <span style={{ margin: "0.2px" }}>
      {isExpanded ? (
        title
      ) : (
        <>
          {title.length > 20 ? (
            <>
              {title.slice(0, 20)}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={toggleExpansion}
              >
                ...Show More
              </span>
            </>
          ) : (
            title
          )}
        </>
      )}
      {isExpanded && (
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={toggleExpansion}
        >
          {" "}
          Show Less
        </span>
      )}
    </span>
  );
};

export default TruncatedTitle;
