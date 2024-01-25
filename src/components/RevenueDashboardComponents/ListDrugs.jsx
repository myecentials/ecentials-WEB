import React from 'react'
import { MdClose } from 'react-icons/md';


const ListDrugs = ({listDrugs, setListDrugs, selectedInvoice}) => {

    const closeInvoice = () => {
        setListDrugs(false);
      };

      return (
        <>
          {listDrugs && (
            <section className="overlay">
              <div className="d-flex gap-3 flex-column flex-sm-row-reverse">
                <div onClick={closeInvoice} className="fw-bold text-white pointer">
                  <MdClose size={25} />
                </div>
                
                <article className="invoice-card" style={{height: '400px'}}>
                   {selectedInvoice?.products_summary?.length === 0 ? (
                     <div className='fw-bold p-3 text-center' style={{height: '200px'}}>
                        No Drug in this Invoice
                     </div>
                   ) : (
                      <div className='px-5 py-2'>
                         <h5 className='fw-bold'>{selectedInvoice?.products_summary?.length} Drugs in this Invoice</h5>
                         {
                            selectedInvoice?.products_summary?.map((res) => (
                                <div key={res.drug_id} className='border-bottom mt-3'>
                                  <p><span className='fw-bold'>Name:</span> {res.drug_name}</p>
                                  <p><span className='fw-bold'>Quantity:</span> {res.quantity}</p>
                                  <img src={res.drug_image} width="100px"/>
                                </div>
                            ))
                         }
                      </div>
                   )}
                </article>
              </div>
            </section>
          )}
        </>
      );
}

export default ListDrugs