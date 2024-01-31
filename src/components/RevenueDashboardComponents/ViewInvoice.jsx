// import React from 'react';
// import { MdClose } from 'react-icons/md';

// const ViewInvoice = ({ viewInvoice, setViewInvoice, selectedInvoice }) => {
//   const closeInvoice = () => {
//     setViewInvoice(false);
//   };

//   return (
//     <>
//       {viewInvoice && (
//         <section className="overlay">
//           <div className="d-flex gap-3 flex-column flex-sm-row-reverse">
//             <div onClick={closeInvoice} className="fw-bold text-white pointer">
//               <MdClose size={25} />
//             </div>
//             <article className="invoice-card p-3">
//                 <div className="fw-bold d-flex gap-3">
//                   <p>INVOICE ID: </p>
//                   <p>{selectedInvoice?.order_code}</p>
//                 </div>
//                 <div className="fw-bold d-flex gap-3">
//                     <p>DELIVERY DATE:</p>
//                     <p>{new Date(selectedInvoice?.delivery_date).toLocaleDateString()}</p>
//                 </div>
//                 <div className="fw-bold d-flex gap-3">
//                     <p>TOTAL AMOUNT: </p>
//                     <p>GH₵ {selectedInvoice?.grand_total}</p>
//                 </div>
//                 <div className="fw-bold d-flex gap-3">
//                     <p>CUSTOMER NAME: </p>
//                     <p>{selectedInvoice?.customer_name || 'N/A'}</p>
//                 </div>
//             </article>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default ViewInvoice;
