import React, { useRef, useState} from "react";
// import html2canvas from 'html2canvas'
// import jsPDF from "jspdf";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
import { Helmet } from "react-helmet";
import { Input } from "reactstrap";
// import { Link } from "react-router-dom";
import PharmacyName from "../../../components/PharmacyName";
import {Toaster}from 'react-hot-toast';
import SalesReportTable from './../../../components/Pharmacy/Report/SalesReportTable';



const SalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [total,setTotal] = useState(0)
  const [,setParsedData] = useState([])
  const priceWidth = Math.min(200, 20 + 2 * total); // Calculate dynamic width


  const pdfRef = useRef();
  //console.log(pdfRef)
   
  // const downloadPDF = () => {
  //   const input = pdfRef.current;
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF('p', 'mm', 'a4', true);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight()
  //     const imgWidth = canvas.width;
  //     const imgHeight  = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const imgX = (pdfWidth - imgWidth * ratio) / 2;
  //     const imgY = 30;
     
  //     pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
  //     pdf.save("invoice.pdf");
  //   });
  // }
 


  

//  const  handleTotal = () =>{
//     let totalPrice = 0;
//     for (let i = 0; i < parsedData.length; i++) {
//       totalPrice += parseFloat(parsedData[i]?.grand_total.toFixed(2));
//     }
    
//     if(startDate !== "" || endDate !== ""){
//       setTotal(prev => totalPrice)
//       console.log("Total price:", totalPrice);
    
//     } else{
//       toast(`Please select a date`, {
//         iconTheme: {
//           primary: '#000',
//           secondary: '#fff',
//           },
//         style: {
//           // border: '1px solid grey',
//           backgroundColor: 'white',
//           color: 'black', // Add black text color for better contrast
//           borderRadius: '8px', // Rounded corners
//           padding: '12px 20px', // Padding
//           fontSize: '16px', // Font size
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow
//         },
//       });
//       setTotal(prev => 0)
//     }
//  }
 
  
  return (
    <>
      <Helmet>
        <title>Sales Report</title>
      </Helmet>
          <Toaster/>
     
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep text-uppercase">Sales Report</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadCrumb
                  name="Sales Report"
                  breadcrumb="/pharmacy/reports/sales-report/"
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
                <input
                  className="order-number  border-0 rounded-0"
                  type="date"
                  onChange={(e) =>  setStartDate(e.target.value) }
                  
						 />
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
                <input
                  className="order-number  border-0 rounded-0"
                  type="date"
                  onChange={(e) => setEndDate(e.target.value )}
                 
						   />
              </div>
            </div>
            {/* <div className="col-md">
              <button  onClick={handleTotal} className="btn ms-bg text-white border-0 rounded-0">
                Find
              </button>
            </div> */}
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
                  <div title={`Totals of sales report `}  style={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: "50px",
                      width: `${priceWidth -50}px`,
                      fontWeight: "bold",
                      fontSize:"20px",
                      border:"none",
                      outline: "none",
                      backgroundColor:"transparent",
                      cursor:"pointer"
                      
                    }}>
                  {`GHS ${total?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </div>
                </div>
              </div>
              <div className="col-sm"></div>
              <div className="col-sm"></div>
            </div>
          </div>
         
          <div className="mx-3" ref={pdfRef}>
            <SalesReportTable startDate={startDate} endDate={endDate} setTotal ={setTotal}  setParsedData={setParsedData}  />
          </div>
          {/* End of Table */}
        </div>
    </>
  );
};

export default SalesReport;
