import React from "react";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiAdjust, BiLoader } from "react-icons/bi";
import { DiCodeigniter } from "react-icons/di";
import {
  BsCheckCircleFill,
  BsFillExclamationSquareFill,
} from "react-icons/bs";
import "./DashBoard.css";
import Card from "../Card/Card";

const DashBoard = () => {
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";
  const { selectedData, user } = useSelector((state) => state.SelectDataReducer);

  return (
    selectedData && (
      <div className="dashContainer">
        {selectedData.map((element, index) => (
          <div key={index} className="dashCardContainer">
            <div className="dashCardHeading">
              <div className="leftView">
                {renderIcon(user, isStatus, isPriority, element, index)}
                <span>
                  {element[index]?.title} {element[index].value?.length}
                </span>
              </div>
              <div className="rightView">
                <AiOutlinePlus />
                <span style={{ letterSpacing: "2px" }}>...</span>
              </div>
            </div>
            <div className="dashList">
              {element[index]?.value?.map((item, ind) => (
                <Card
                  key={ind}
                  id={item.id}
                  title={item.title}
                  tag={item.tag}
                  status={item.status}
                  priority={item.priority}
                />
              ))}
            </div>
          </div>
        ))}
        {renderExtraColumns(isStatus)}
      </div>
    )
  );
};

const renderIcon = (user, isStatus, isPriority, element, index) => {
  if (user) {
    return <div className="imageContainer"></div>;
  } else if (isStatus) {
    return renderStatusIcon(element[index].title);
  } else if (isPriority) {
    return renderPriorityIcon(element[index].title);
  } else {
    return <DiCodeigniter />;
  }
};

const renderStatusIcon = (title) => {
  switch (title) {
    case "Backlog": return <BiLoader style={{ fontSize: "13px" }} />;
    case "Todo": return <FaRegCircle style={{ fontSize: "13px", color: "#ddeded" }} />;
    case "In progress": return <BiAdjust style={{ fontSize: "13px", color: "#f2d750" }} />;
    case "Done": return <BsCheckCircleFill />;
    default: return <IoMdCloseCircleOutline />;
  }
};

const renderPriorityIcon = (title) => {
  if (["Low", "Medium", "High"].includes(title)) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-signal" viewBox="0 0 16 16">
        <rect x="1" y="10" width="3" height="2" />
        <rect x="5" y="7" width="3" height="5" opacity={title === "Low" ? 0.25 : 1} />
        <rect x="9" y="4" width="3" height="8" opacity={title === "High" ? 1 : 0.25} />
      </svg>
    );
  } else if (title === "Urgent") {
    return <BsFillExclamationSquareFill />;
  }
  return null;
};

const renderExtraColumns = (isStatus) => {
  if (!isStatus) return null;
  return (
    <>
      <div className="dashCardContainer">
        <div className="dashCardHeading">
          <div className="leftView">
            <BsCheckCircleFill style={{ color: "blue" }} />
            <span>Done</span> <span>0</span>
          </div>
          <div className="rightView">
            <AiOutlinePlus />
            <span style={{ letterSpacing: "2px" }}>...</span>
          </div>
        </div>
      </div>
      <div className="dashCardContainer">
        <div className="dashCardHeading">
          <div className="leftView">
            <MdCancel style={{ color: "grey" }} />
            <span>Canceled</span> <span>0</span>
          </div>
          <div className="rightView">
            <AiOutlinePlus />
            <span style={{ letterSpacing: "2px" }}>...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
