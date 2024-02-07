import React, { useRef} from "react";
import html2canvas from 'html2canvas'
import jsPDF from "jspdf";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
import { Helmet } from "react-helmet";
import { Input } from "reactstrap";
// import { Link } from "react-router-dom";
import PurchaseReportTable from "../../../components/RevenueDashboardComponents/PurchaseReportTable";
import PharmacyName from "../../../components/PharmacyName";


const SalesReport = () => {

  const pdfRef = useRef();
  //console.log(pdfRef)
   
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width;
      const imgHeight  = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
     
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save("invoice.pdf");
    });
  }
 
  
  return (
    <>
      <Helmet>
        <title>Sales Report</title>
      </Helmet>
     
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep text-uppercase">Sales Report</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadCrumb
                  name="Report Dashboard"
                  breadcrumb="/orders"
                  width="11.5rem"
                />
                <BreadCrumb
                  name="Sales Report"
                  breadcrumb="/orders"
                  hasStyles={true}
                  width="10rem"
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="row mx-2 mt-4 gy-md-0 gy-3">
            <div className="col-md">
              <div className="d-flex">
                <button
                  className="btn text-deep text-nowrap"
                  style={{ backgroundColor: " #F7FAFE" }}
                >
                  Start Date
                </button>
                <Input className="order-number  border-0 rounded-0" type="date">
                  <option value="1">select order status</option>
                </Input>
              </div>
            </div>
            <div className="col-md">
              <div className="d-flex">
                <button
                  className="btn text-deep text-nowrap"
                  style={{ backgroundColor: " #F7FAFE" }}
                >
                  End Date
                </button>
                <Input className="order-number  border-0 rounded-0" type="date">
                  <option value="1">select order status</option>
                </Input>
              </div>
            </div>
            <div className="col-md">
              <button className="btn ms-bg text-white border-0 rounded-0">
                Find
              </button>
            </div>
          </div>
          <div className="mt-3 mx-3">
            <div className="row">
              <div className="col-sm">
                <div className="d-flex">
                  <button
                    className="btn text-deep text-nowrap"
                    style={{ backgroundColor: " #F7FAFE" }}
                  >
                    TOTAL
                  </button>
                  <Input
                    typeof="text"
                    className="order-number border-0 rounded-0"
                    type="text"
                  />
                </div>
              </div>
              <div className="col-sm"></div>
              <div className="col-sm"></div>
            </div>
          </div>
          <div className="mt-4 mx-3">
            <div className="card border-0">
              <div className="d-md-flex justify-content-between align-items-center m-3">
                <div className="d-flex">
                  <div>
                    <h6 className="text-deep">Sales Report</h6>
                    <p className="gray-text small">
                      More than 400+ new reviews
                    </p>
                  </div>
                </div>
                <div className="d-flex">
                  <button className="btn-refresh">Refresh</button>
                  <button 
                     className="btn-export"
                     onClick={downloadPDF}                   
                    >
                    Export as PDF
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-3" ref={pdfRef}>
            <PurchaseReportTable />
          </div>
          {/* End of Table */}
        </div>
    </>
  );
};

export default SalesReport;
