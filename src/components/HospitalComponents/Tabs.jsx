import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Card, CardText, CardTitle, Col, Nav, NavItem, Row, TabContent, TabPane } from 'reactstrap'

const Tabs = () => {
  return (
    <>
    <Nav tabs>
        <NavItem>
        <NavLink
            className="active"
            onClick={function noRefCheck(){}}
        >
            Tab1
        </NavLink>
        </NavItem>
        <NavItem>
        <NavLink
            className=""
            onClick={function noRefCheck(){}}
        >
            More Tabs
        </NavLink>
        </NavItem>
    </Nav>
    
</>
  )
}

export default Tabs