/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React,{useEffect} from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {UserDetail} from "./UserInfo/Profile";
import{useDispatch} from "react-redux";

const Header = () => {
  let dispatch = useDispatch();
    let history = useHistory()
  const Logout = () => {    
    dispatch({type:"SIGN_OUT"})
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/")
 }
  return (
 <div>
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/dashboard">ScaleTeam</Navbar.Brand>
      <Nav className="mr-auto">
      <Nav.Link href="/"></Nav.Link>
        <Nav.Link href="/dashboard">Home</Nav.Link>
        <Nav.Link href="/employee-list">Employee</Nav.Link> 
       
 </Nav>

 <UserDetail 
    Logout = {Logout}
 />
</Navbar>
</div>

  )

}
export default Header;