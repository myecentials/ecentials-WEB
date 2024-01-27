import React from "react";
// import person from "../../assets/images/svgs/hospital/person.svg";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const HospitalCard = ({
  img,
  className,
  width,
  margin,
  count,
  textClass,
  field,
  number,
  text,
  cardClassName,
  hascount,
  ...props
}) => {
  return (
    <Link
      to=""
      className={
        "hospital_dashboard__card py-3 border-0 d-flex justify-content-center align-items-center flex-column " +
        cardClassName
      }
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className={"mx-3 rounded-circle " + className}>
          <img src={img} alt="" className="d-block mx-auto" width={width} />
        </div>
        <div className="d-flex flex-column align-items-start">
          {hascount && (
            <h5 className={"text-deep " + margin}>
              <CountUp
                start={0}
                end={count}
                className="bold_font"
                duration={2}
              />
            </h5>
          )}
          <p className={"small w-75 small " + textClass}>{field}</p>
        </div>
      </div>
      <p className="small my-0 text-lights">
        <span className="text-primary hospital_dashboard__card_para">
          {number}
        </span>{" "}
        {text}
      </p>
    </Link>
  );
};

// HospitalCard.defaultProps = {
//   className: "hospital_card_circle ms-bg",
//   count: "5700",
//   field: "Doctors",
//   number: "3",
//   img: person,
//   margin: "my-0",
//   width: 20,
//   textClass: "text-lights",
//   text: "Doctors joined this week",
// };

export default HospitalCard;
