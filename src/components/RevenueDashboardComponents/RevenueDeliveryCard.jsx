import React, { useState } from "react";
import RevenueCardHeader from "./RevenueCardHeader";
import { Table } from "reactstrap";
import RevenueCardBottom from "./RevenueCardBottom";
import MoreMenu from "./MoreMenu";

const RevenueDeliveryCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="card shadow bg-white border-0 report_container__height">
      <RevenueCardHeader
        header="Delivery"
        subheader="Report Center"
        handleClick={handleClick}
      />
      <MoreMenu isOpen={isOpen} />
      <div className="report_revenue__card_overflow">
        <Table responsive className="small" style={{ fontSize: "13px" }}>
          <tbody>
            <tr className="text-purple ">
              <td className="text-nowrap">Date</td>
              <td className="text-nowrap">Invoice ID</td>
              <td className="text-nowrap">Status</td>
            </tr>
            <tr>
              <td className="">2020/12/22 09:59</td>
              <td className="text-nowrap">INV-8907</td>
              <td className="text-nowrap">Open</td>
            </tr>
            <tr>
              <td className="">2020/12/22 09:59</td>
              <td className="text-nowrap">INV-8907</td>
              <td className="text-nowrap">Open</td>
            </tr>
            <tr>
              <td className="">2020/12/22 09:59</td>
              <td className="text-nowrap">INV-8907</td>
              <td className="text-nowrap">Open</td>
            </tr>
            <tr>
              <td className="">2020/12/22 09:59</td>
              <td className="text-nowrap">INV-8907</td>
              <td className="text-nowrap">Open</td>
            </tr>
            <tr>
              <td className="">2020/12/22 09:59</td>
              <td className="text-nowrap">INV-8907</td>
              <td className="text-nowrap">Open</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <RevenueCardBottom
        content="SEE ALL TICKETS"
        link="/reports/delivery-reports"
      />
    </div>
  );
};

export default RevenueDeliveryCard;
