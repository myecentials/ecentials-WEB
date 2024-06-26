import React, { useRef,useCallback,useState,useEffect } from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";

import { Helmet } from "react-helmet";
// import { Input } from "reactstrap";
import { Link } from "react-router-dom";

import InvoiceReturnListTable from "../../../components/Pharmacy/Returns/InvoiceRetrunListTable";
import PharmacyName from "../../../components/PharmacyName";
// import ReactToPrint from "react-to-print";
import {
	// setToken,
	facility_id,
	// userInfo,
} from "../../../app/features/authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { allReturns } from "../../../app/features/returns/returnsSlice";
// import axios from "../../../config/api/axios";
import { useFetchAllReturnsMutation } from "../../../app/features/returns/returnsApiSlice";
import Pdf from "../../../components/Views/Pdf";



const InvoiceListReturn = () => {
  const pdfRef = useRef();

  const componentRef = useRef();
  const [filteredData,setFilteredData] = useState([])
  const [searchText, setSearchText] = useState("");


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [total,setTotal] = useState(1)
  const priceWidth = Math.min(200, 20 + 2 * total); // Calculate dynamic width
  const [data, setData] = useState([]);


  const [isLoading, setIsLoading] = useState(false);
  const [returns] = useFetchAllReturnsMutation();

	const facilityId = useSelector(facility_id);
	// const token = useSelector(setToken);
	const dispatch = useDispatch();


  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const results = await returns(facilityId).unwrap();
      dispatch(allReturns({ ...results?.data }));
      setData(results?.data);
      setFilteredData(results?.data);
      console.log(results?.data);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  },[dispatch, facilityId, returns]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
 

// Define the mapping between keys and display names
const columnMapping = {
  invoice_number: "Invoice Number",
  order_code: "Order Code",
  createdAt: "Created Date",
  grand_total: "Total",
  customer_name: "Customer Name",
};

const handleTotal = useCallback(
  (parsedData) => {
    let totalPrice = 0;
    for (let i = 0; i < parsedData?.length; i++) {
      totalPrice += parseFloat(parsedData[i]?.grand_total.toFixed(2));
    }

    
      setTotal((prev) => totalPrice);
      console.log("Total price:", totalPrice);
  
  },
  [setTotal]
);

  const startPdf =() =>{
    // exportToPDF(filteredData, columnMapping, "Invoice Returns")
    pdfRef.current.generatePDF();

  }

  useEffect(() => {
    const filteredDataByDate = data.filter((item) => {
        const created = new Date(item.createdAt);
        const start = startDate !== "" ? new Date(startDate) : null;
        const end = endDate !== "" ? new Date(endDate) : null;
        
        if (start && end) {
            return created >= start && created <= end;
        } else if (start) {
            return created >= start;
        } else if (end) {
            return created <= end;
        }
        
        return true; // If both start and end dates are empty, include all data
    });
  
    const filteredDataBySearchText = filteredDataByDate.filter(item => item.invoice_number.includes(searchText));
  
    setFilteredData(filteredDataBySearchText);
    handleTotal(filteredDataBySearchText);
  }, [data, startDate, endDate, searchText, handleTotal]);
  

  return (
    <>
      <Helmet>
        <title>Invoice Return List | Ecentials</title>
      </Helmet>
 
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">RETURN</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadCrumb
                  name="Invoice Return List"
                  breadcrumb="/pharmacy/orders"
                  hasStyles={true}
                  width="11rem"
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
                  onChange={(e) =>  setEndDate(e.target.value) }
                  
						 />
              </div>
            </div>
            <div className="col-md">
              <span className="d-lg-flex my-sm-0  justify-content-end align-items-end">
              <div className="shadow-sm d-flex">
                  {/* <svg
                    style={{ cursor: "pointer" }}
                    className="mx-2"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.4492 16.5195L23.7773 9.84766C23.4492 9.41016 22.9023 9.19141 22.3555 9.19141H13.6055C12.4023 9.19141 11.418 10.1758 11.418 11.3789V31.0664C11.418 32.2695 12.4023 33.2539 13.6055 33.2539H28.918C30.1211 33.2539 31.1055 32.2695 31.1055 31.0664V18.0508C31.1055 17.5039 30.8867 16.957 30.4492 16.5195ZM22.3555 11.3789L28.8086 17.9414H22.3555V11.3789ZM13.6055 31.0664V11.3789H20.168V17.9414C20.168 19.1445 21.1523 20.1289 22.3555 20.1289H28.918V31.0664H13.6055Z"
                      fill="#699BF7"
                    />
                    <path
                      d="M7.04297 20.1289H4.85547V4.81641C4.85547 3.61328 5.83984 2.62891 7.04297 2.62891H22.3555V4.81641H7.04297V20.1289Z"
                      fill="#699BF7"
                    />
                  </svg> */}

                    <svg
                      style={{ cursor: "pointer" }}
                      className="mx-2"
                      width="21"
                      height="28"
                      viewBox="0 0 21 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.5176 7.39648L14.2129 1.0918C14.0371 0.916016 13.7998 0.816406 13.5508 0.816406H1.10547C0.586914 0.816406 0.167969 1.23535 0.167969 1.75391V26.1289C0.167969 26.6475 0.586914 27.0664 1.10547 27.0664H19.8555C20.374 27.0664 20.793 26.6475 20.793 26.1289V8.06152C20.793 7.8125 20.6934 7.57227 20.5176 7.39648ZM18.6309 8.49219H13.1172V2.97852L18.6309 8.49219ZM18.6836 24.957H2.27734V2.92578H11.125V9.25391C11.125 9.58025 11.2546 9.89322 11.4854 10.124C11.7162 10.3547 12.0291 10.4844 12.3555 10.4844H18.6836V24.957ZM10.542 15.9365L8.73145 12.9365C8.66699 12.8311 8.55273 12.7666 8.42969 12.7666H7.30469C7.2373 12.7666 7.17285 12.7842 7.11719 12.8223C6.95313 12.9248 6.90332 13.1416 7.00879 13.3086L9.41992 17.1289L6.97656 21.0195C6.94336 21.0729 6.92503 21.1342 6.92344 21.197C6.92186 21.2598 6.93709 21.3219 6.96756 21.3769C6.99803 21.4318 7.04263 21.4777 7.09675 21.5096C7.15087 21.5416 7.21255 21.5585 7.27539 21.5586H8.28613C8.40918 21.5586 8.52051 21.4941 8.58496 21.3916L10.4219 18.418L12.2471 21.3887C12.3115 21.4941 12.4258 21.5557 12.5459 21.5557H13.6445C13.7119 21.5557 13.7764 21.5352 13.835 21.5C13.999 21.3945 14.0459 21.1777 13.9404 21.0137L11.4795 17.1934L13.9785 13.3115C14.0123 13.2583 14.0313 13.197 14.0334 13.134C14.0355 13.071 14.0207 13.0086 13.9905 12.9532C13.9602 12.8979 13.9158 12.8517 13.8616 12.8194C13.8075 12.7871 13.7457 12.7698 13.6826 12.7695H12.6367C12.5137 12.7695 12.3994 12.834 12.335 12.9395L10.542 15.9365Z"
                        fill="#699BF7"
                      />
                    </svg>


                  {/* <svg
                    style={{ cursor: "pointer" }}
                    className="mx-2"
                    width="24"
                    height="27"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23.2305 8.25391V23.6914C23.2305 24.5534 22.8881 25.38 22.2786 25.9895C21.6691 26.599 20.8424 26.9414 19.9805 26.9414H18.3555V25.3164H19.9805C20.4114 25.3164 20.8248 25.1452 21.1295 24.8405C21.4343 24.5357 21.6055 24.1224 21.6055 23.6914V8.25391H18.3555C17.709 8.25391 17.089 7.9971 16.6319 7.53998C16.1748 7.08286 15.918 6.46287 15.918 5.81641V2.56641H6.98047C6.54949 2.56641 6.13617 2.73761 5.83142 3.04236C5.52667 3.3471 5.35547 3.76043 5.35547 4.19141V18.8164H3.73047V4.19141C3.73047 3.32945 4.07288 2.5028 4.68237 1.89331C5.29186 1.28382 6.11852 0.941406 6.98047 0.941406L15.918 0.941406L23.2305 8.25391ZM6.19559 25.058C6.2049 25.3141 6.26768 25.5653 6.3799 25.7957C6.49213 26.026 6.65131 26.2303 6.84722 26.3954C7.05847 26.5709 7.31684 26.7074 7.62397 26.8049C7.93272 26.904 8.29184 26.9528 8.70459 26.9528C9.25384 26.9528 9.71859 26.8667 10.1005 26.696C10.484 26.5254 10.7765 26.2865 10.9763 25.981C11.1795 25.6739 11.2802 25.318 11.2802 24.915C11.2802 24.551 11.2071 24.2488 11.0625 24.005C10.9137 23.7616 10.7036 23.5615 10.4531 23.4249C10.1653 23.2659 9.85524 23.1509 9.53334 23.0837L8.52422 22.8497C8.28634 22.806 8.06171 22.7081 7.86772 22.5637C7.79358 22.5065 7.73381 22.4328 7.69319 22.3484C7.65256 22.2641 7.6322 22.1714 7.63372 22.0778C7.63372 21.8243 7.73447 21.6163 7.93434 21.4538C8.13747 21.2897 8.41534 21.2068 8.76634 21.2068C8.99872 21.2068 9.19859 21.2442 9.36759 21.3173C9.52315 21.3807 9.66051 21.4818 9.76734 21.6114C9.86736 21.732 9.93452 21.8764 9.96234 22.0307H11.1811C11.1608 21.6997 11.0482 21.3811 10.8561 21.1109C10.6507 20.8192 10.3699 20.5889 10.0436 20.4447C9.64456 20.2696 9.21166 20.1852 8.77609 20.1977C8.29997 20.1977 7.88072 20.2789 7.51509 20.4414C7.14947 20.6023 6.86509 20.8314 6.65872 21.1255C6.45234 21.4213 6.34997 21.7674 6.34997 22.1639C6.34997 22.4905 6.41497 22.7749 6.54822 23.0154C6.68147 23.2575 6.87322 23.4542 7.12022 23.6118C7.36722 23.7662 7.65972 23.8832 7.99609 23.9579L9.00034 24.1919C9.33672 24.2715 9.58697 24.3755 9.75272 24.5055C9.8337 24.5672 9.89848 24.6477 9.9415 24.74C9.98453 24.8322 10.0045 24.9336 9.99972 25.0353C10.0029 25.2028 9.95466 25.3672 9.86159 25.5065C9.75696 25.6492 9.61294 25.7582 9.44722 25.8202C9.26684 25.8965 9.04259 25.9339 8.77609 25.9339C8.58597 25.9339 8.41372 25.9128 8.25609 25.8689C8.11244 25.8291 7.97629 25.766 7.85309 25.682C7.74491 25.612 7.6523 25.5205 7.58101 25.4131C7.50972 25.3058 7.46129 25.1849 7.43872 25.058H6.19559ZM1.79022 23.1925C1.79022 22.7895 1.84547 22.445 1.95597 22.1639C2.05236 21.9043 2.22303 21.6788 2.44672 21.5155C2.67471 21.3631 2.94444 21.2853 3.21859 21.2929C3.46234 21.2929 3.67847 21.3449 3.86534 21.4505C4.04848 21.5484 4.20133 21.6945 4.30734 21.873C4.4206 22.061 4.48745 22.2732 4.50234 22.4922H5.74547V22.3752C5.73469 22.0758 5.6618 21.782 5.53145 21.5123C5.40109 21.2427 5.2161 21.003 4.98822 20.8087C4.75477 20.6108 4.48481 20.4607 4.19359 20.3667C3.8765 20.2593 3.54361 20.206 3.20884 20.209C2.63034 20.209 2.13634 20.3293 1.72847 20.5714C1.32222 20.8119 1.01347 21.1548 0.798969 21.5984C0.587719 22.0437 0.480469 22.5734 0.480469 23.1893V23.9985C0.480469 24.6144 0.584469 25.1425 0.794094 25.5845C1.00697 26.0249 1.31734 26.3645 1.72359 26.6018C2.12984 26.8374 2.62384 26.9544 3.20884 26.9544C3.68497 26.9544 4.10909 26.865 4.48447 26.6879C4.85822 26.5092 5.15722 26.2654 5.37822 25.9502C5.6024 25.6275 5.72981 25.2475 5.74547 24.8549V24.7314H4.50397C4.48865 24.9406 4.42285 25.143 4.31222 25.3213C4.20392 25.4938 4.05127 25.6341 3.87022 25.7275C3.66731 25.8257 3.44394 25.8742 3.21859 25.8689C2.94405 25.8767 2.67348 25.802 2.44184 25.6544C2.21932 25.496 2.04994 25.2739 1.95597 25.0174C1.83715 24.6912 1.78092 24.3456 1.79022 23.9985V23.1942V23.1925ZM15.1786 26.8293H13.63L11.4557 20.3309H12.9458L14.4018 25.4302H14.4636L15.9066 20.3309H17.335L15.1786 26.8309V26.8293Z"
                      fill="#699BF7"
                    />
                  </svg> */}
                  <div title="Export to pdf"  onClick={ () => startPdf()}>
                      <svg
                        style={{ cursor: "pointer" }}
                        className="mx-2"
                        width="21"
                        height="28"
                        viewBox="0 0 21 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.0459 15.7695L11.0547 15.7285C11.2246 15.0283 11.4385 14.1553 11.2715 13.3643C11.1602 12.7402 10.7002 12.4971 10.3076 12.4795C9.84473 12.459 9.43164 12.7227 9.3291 13.1064C9.13574 13.8096 9.30859 14.7705 9.625 15.9951C9.22656 16.9443 8.59082 18.3242 8.125 19.1445C7.25781 19.5928 6.09473 20.2842 5.92188 21.1572C5.88672 21.3184 5.92773 21.5234 6.02441 21.708C6.13281 21.9131 6.30566 22.0713 6.50781 22.1475C6.5957 22.1797 6.70117 22.2061 6.82422 22.2061C7.33984 22.2061 8.1748 21.79 9.28809 19.8799C9.45801 19.8242 9.63379 19.7656 9.80371 19.707C10.6006 19.4375 11.4268 19.1562 12.1738 19.0303C13 19.4727 13.9404 19.7568 14.5791 19.7568C15.2119 19.7568 15.4609 19.3818 15.5547 19.1562C15.7188 18.7607 15.6396 18.2627 15.373 17.9961C14.9863 17.6152 14.0459 17.5156 12.5811 17.6973C11.8604 17.2578 11.3887 16.6602 11.0459 15.7695ZM7.83203 20.2197C7.4248 20.8115 7.11719 21.1074 6.9502 21.2363C7.14648 20.876 7.53027 20.4951 7.83203 20.2197ZM10.3984 13.3203C10.5508 13.5811 10.5303 14.3691 10.4131 14.7676C10.2695 14.1846 10.249 13.3584 10.334 13.2617C10.3574 13.2646 10.3779 13.2822 10.3984 13.3203ZM10.3516 16.8506C10.665 17.3926 11.0605 17.8584 11.4971 18.2041C10.8643 18.3477 10.2871 18.585 9.77148 18.7959C9.64844 18.8457 9.52832 18.8955 9.41113 18.9424C9.80078 18.2363 10.126 17.4365 10.3516 16.8506ZM14.9102 18.7695C14.9131 18.7754 14.916 18.7842 14.8984 18.7959H14.8926L14.8867 18.8047C14.8633 18.8193 14.623 18.96 13.5889 18.5527C14.7783 18.4971 14.9072 18.7666 14.9102 18.7695ZM20.5176 7.39648L14.2129 1.0918C14.0371 0.916016 13.7998 0.816406 13.5508 0.816406H1.10547C0.586914 0.816406 0.167969 1.23535 0.167969 1.75391V26.1289C0.167969 26.6475 0.586914 27.0664 1.10547 27.0664H19.8555C20.374 27.0664 20.793 26.6475 20.793 26.1289V8.06152C20.793 7.8125 20.6934 7.57227 20.5176 7.39648ZM18.6309 8.49219H13.1172V2.97852L18.6309 8.49219ZM18.6836 24.957H2.27734V2.92578H11.125V9.25391C11.125 9.58025 11.2546 9.89322 11.4854 10.124C11.7162 10.3547 12.0291 10.4844 12.3555 10.4844H18.6836V24.957Z"
                          fill="#699BF7"
                        />
                      </svg>
                  </div>
                </div>
              </span>
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
                  <div title={`Totals of incoices `}  style={{
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

          <div className="mt-4" ref={componentRef}>
            <InvoiceReturnListTable isLoading={isLoading} filteredData={filteredData} fetchData={fetchData} setSearchText={setSearchText} />
          </div>
          {/* End of Table */}
          <Pdf ref={pdfRef}  body={filteredData} title="InvoiceReturns" columnMapping={columnMapping} />
        </div>
    </>
  );
};

export default InvoiceListReturn;
