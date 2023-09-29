import React, { useEffect, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Input, Modal } from 'reactstrap'
import {TiTimes} from "react-icons/ti"
import SearchBar from './SearchBar'
import Search from './Search'
import { BsSearch } from 'react-icons/bs'
import bog from '../assets/images/png/bog.png'
import { useSelector } from 'react-redux'
import { facility_id, pharmacyinfo } from '../app/features/authSlice/authSlice'
import { useAddPaymentMethodMutation } from '../app/features/settings/settingsApiSlice'
import toast from 'react-hot-toast'


const Billing = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [check, setCheck] = useState(false)
    const [bank, setBank] = useState('')
    const handleOpen = () => setIsOpen(true)
    const handleClose= () => setIsOpen(false)
    const facilityid = useSelector(facility_id)
    const [addPaymentMethod, isLoading] = useAddPaymentMethodMutation()
    const paymentinfo = useSelector(pharmacyinfo)
    console.log(paymentinfo)
   

    const banks =[
        {
            name: "GCB Bank",
            logo: bog
        },
        {
            name: "Ghana Commercial Bank",
            logo: ""
        },
        {
            name: "United Bank of Africa",
            logo: ""
        },
        {
            name: "United Bank of Africa",
            logo: ""
        },
        {
            name: "Access Bank Ghana",
            logo: ""
        },
        {
            name: "Fidelity Bank Ghana",
            logo: ""
        },
        {
            name: "adb Bank Ghana",
            logo: ""
        },
    ]

    
        const [open, setOpen] = useState('1');
        const toggle = (id) => {
          if (open === id) {
            setOpen();
   
          } else {
            setOpen(id);
          }
        };

        const [accountDetails, setAccountDetails] = useState({
          pharmacyID: facilityid,
          bankName: "",
          accountNumber: "",
          phoneNumber: "",
          accountName: ""
        })

        const handleChange = (e) => {
          const name = e.target.name
          const value = e.target.value
          setAccountDetails({...accountDetails, [name]: value})
          
        }

        const [isAccountNumberValid, setIsAcountNumberValid] = useState(false)

        const account_number_red =  /^\d{1,16}$/

        useEffect(() => {
          const results = account_number_red.test(accountDetails.account_number)
          console.log(results)
          setIsAcountNumberValid(results)
        })

        const handleSave = async (e, name) => {
          console.log({...accountDetails, bankName: name})
          try {
            const results = await addPaymentMethod({...accountDetails, bankName: name}).unwrap()
            console.log(results)
            if(results?.status === "success"){
              setIsOpen(false)
              toast.success(results?.message)
            }
          } catch (error) {
            
          }
        }


   

    const handleCheck = () => {
        setCheck(!check)
    }
  return (
    <div className="bg-white pb-5" style={{ borderRadius: "10px" }}>
    <h6 className="pt-5 px-3">Billing and Payments</h6>
    <hr className="my-0" />
    <p className="mx-3 mt-4">Banks</p>
    {
      paymentinfo?.paymentMethods?.map(({bankName}) => <div className="d-flex border py-3 m-3 rounded justify-content-between align-items-center py-2 px-4">
      <div>
      {/* <input type="radio" name="" id=""/> */}
      <label htmlFor="" className='mx-2'>{bankName}</label>
      </div>
      <div style={{width: "1rem", }}>
        <img src="" alt="" className='img-fluid'/>
        </div>
  </div>)
    }
    <button onClick={handleOpen} name="" id="" className="form-control mt-3 mx-3 w-md-50 w-75 d-flex align-items-center justify-content-start">
      +  Add Your Bank
    </button>
    <Modal isOpen={isOpen} centered>
        <div className="card border-0 p-3 pb-4">
            <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title">Add your bank</h5>
                <TiTimes color='#B5B5C3'  style={{cursor: "pointer"}} onClick={handleClose}/>
            </div>
            <div
      className="bg rounded-pill d-inline-block search_container py-1 mx-auto my-3"
      style={{ padding: "2px" }}
    >
      <input
        type="search"
        placeholder="Search Bank Name"
        value={bank}
        onChange={(e) => setBank(e.target.value)}
        className="rounded-pill border-0 bg search_header"
      />
      <span
        className="bg-primary rounded-pill px-3 py-1 text-white"
        style={{ cursor: "pointer" }}
      >
        <BsSearch style={{ fontSize: "12px" }} />
      </span>
    </div>

    <div>
      <Accordion open={open} toggle={toggle}>
       {bank === "" ? [] : banks ?.filter(({ name }) => {
                          return name.toLowerCase() === ""
                            ? name.toLowerCase()
                            : name
                                .toLowerCase()
                                .includes(bank.toLowerCase());
                        }).map(({name, logo}, index) => ( <AccordionItem>
          <AccordionHeader targetId={index.toString()} className='text-light flush'> <div className="d-flex justify-content-between align-items-center py-2 px-4">
            <div>
            <input type="radio" name="" id=""/>
            <label htmlFor="" className='mx-2'>{name}</label>
            </div>
            <div style={{width: "1rem", }}><img src={logo} alt="" className='img-fluid'/></div>
        </div></AccordionHeader>
          <AccordionBody accordionId={index.toString()}>
          <div className='px-4 py-3 rounded-bottom'>
        <label htmlFor="">Account Number</label>
        <Input type="text" value={accountDetails.accountNumber} name='accountNumber' onChange={handleChange} className='form-control' placeholder='0000 0000 0000 0000'/>
       
    
         
                <label htmlFor="" className='mt-2'>Phone Number</label>
                <input type="text" value={accountDetails.phoneNumber}  name='phoneNumber' onChange={handleChange} className="form-control" />
        
            
                <label htmlFor="" className='mt-2'>Account Name</label>
                <input type="text" min={3} value={accountDetails.accountName} name='accountName' onChange={handleChange} className="form-control" />
          
        
       
      
            
        
        <button className="btn btn-primary rounded-0 my-3 px-4" onClick={(e) => handleSave(e, name)}>Save</button>
        <small className='d-block text-secondary'>This will be saved as your default method</small>
    </div>
          </AccordionBody>
        </AccordionItem>))}
      
      </Accordion>
    </div>
    
      {/* <div  className={"border rounded-top rounded-bottom mb-3"}>
        <div className="d-flex justify-content-between align-items-center py-2 px-4">
            <div>
            <input type="radio" name="" id=""/>
            <label htmlFor="" className='mx-2'>GCB</label>
            </div>
            <div style={{width: "1rem", }}><img src="" alt="" className='img-fluid'/></div>
        </div>
    </div>
    
    <div className='px-4 py-3 rounded-bottom'>
        <label htmlFor="">Account Number</label>
        <input type="text" className='form-control' placeholder='0000 0000 0000 0000'/>
        <div className="row my-3">
            <div className="col">
                <label htmlFor="">Email</label>
                <input type="text" className="form-control" />
            </div>
            <div className="col">
                <label htmlFor="">Security code</label>
                <input type="text" className="form-control" />
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label htmlFor="">First name</label>
                <input type="text" className="form-control" />
            </div>
            <div className="col">
                <label htmlFor="">Last name</label>
                <input type="text" className="form-control" />
            </div>
        </div>
        <div className="btn btn-primary rounded-0 my-3 px-4">Save</div>
        <small className='d-block text-secondary'>This will be saved as your default method</small>
    </div>
     */}
        </div>
    </Modal>
  </div>
  )
}

export default Billing