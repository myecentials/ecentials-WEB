import React, { useEffect } from "react";
import { Table } from "reactstrap";
import { useFetchAllReviewsMutation } from '../../app/features/report/reportApiSlice';

const PurchaseReportTable = () => {

  const [allReviews, { data: response, isLoading, isError }] = useFetchAllReviewsMutation();

  useEffect(() => {
    allReviews();

  }, []);

  console.log(response?.data);

 
 
  return (
    <Table borderless responsive bgcolor="white" >
      <thead style={{ backgroundColor: "#F3F6F9" }}>
        <tr>
          <th className="text-nowrap">INVOICE ID</th>
          <th className="text-nowrap">DATE</th>
          <th className="text-nowrap">TOTAL AMOUNT (GHC)</th>
          <th className="text-nowrap">CUSTOMER NAME</th>
          <th className="text-nowrap">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan="5" className="text-lg fw-bold">Loading...</td>
          </tr>
        ) : isError || !response?.data ? (
          <tr>
            <td colSpan="5">Error fetching data</td>
          </tr>
        ) : (
          response?.data?.map((res) => (
            <tr key={res.order_code}>
              <td className="text-nowrap">{res.order_code}</td>
              <td>{new Date(res.delivery_date).toLocaleDateString()}</td>
              <td className="text-center">{res.grand_total}</td>
              <td>{`${res.customer_name ? res.customer_name : "John Doe" } `}</td>
              <td>
                <div className="btn text-deep btn-bg">
                  <span className="text-nowrap">View Invoice</span>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>

   
    
  );
};

export default PurchaseReportTable;
