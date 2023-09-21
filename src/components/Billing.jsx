import React, { useState } from 'react'
import { Modal } from 'reactstrap'
import {TiTimes} from "react-icons/ti"
import SearchBar from './SearchBar'
import Search from './Search'
import { BsSearch } from 'react-icons/bs'
import bog from '../assets/images/png/bog.png'

const Billing = () => {
    const [open, setOpen] = useState(false)
    const [check, setCheck] = useState(false)
    const [bank, setBank] = useState('')
    const handleOpen = () => setOpen(true)
    const handleClose= () => setOpen(false)

    const banks =[
        {
            name: "Bank of Ghana",
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

  
   

    const handleCheck = () => {
        setCheck(!check)
    }
  return (
    <div className="bg-white pb-5" style={{ borderRadius: "10px" }}>
    <h6 className="pt-5 px-3">Billing and Payments</h6>
    <hr className="my-0" />
    <p className="mx-3 mt-4">Banks</p>
    <button onClick={handleOpen} name="" id="" className="form-control mt-3 mx-3 w-md-50 w-75 d-flex align-items-center justify-content-start">
      +  Add Your Bank
    </button>
    <Modal isOpen={open} centered>
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
    {
       bank === "" ? [] : banks.filter(({name}) => name?.toLowerCase().includes(bank?.toLowerCase()))?.map(({name, logo}, i) => (<div key={i} className={!check ?  "border rounded-top rounded-bottom mb-3" : "border rounded-top"} onClick={handleCheck}>
        <div className="d-flex justify-content-between align-items-center py-2 px-4">
            <div>
            <input type="radio" name="" id="" checked={check}/>
            <label htmlFor="" className='mx-2'>{name}</label>
            </div>
            <div style={{width: "1rem", }}><img src={logo} alt="" className='img-fluid'/></div>
        </div>
    </div>))
    }
    {
        check ?  <div className='px-4 py-3 rounded-bottom' style={{borderLeft: "1px solid #B5B5C3", borderRight: "1px solid #B5B5C3", borderBottom: "1px solid #B5B5C3"}}>
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
    </div> : <></>
    }
        </div>
    </Modal>
  </div>
  )
}

export default Billing