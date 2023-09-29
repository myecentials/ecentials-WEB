import React from 'react'
import { NavLink } from 'react-router-dom'

const Pagination = ({postPerPage, totalPosts, paginate}) => {
    console.log(totalPosts)
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts?.length / postPerPage); i++){
        pageNumbers.push(i)
    }
    console.log(pageNumbers)
  return (
    <ul>
        {
            pageNumbers.map((index) => <li key={index } className="d-inline-block mx-1 mt-3" onClick={() => paginate(index)}>
            {/* <img src={leftchev} alt="" className="mx-3" /> */}
            <span to="#" className="circle rounded-circle mail d-flex" >
              {index}
            </span>
            </li>)
        }
    </ul>
  )
}

export default Pagination