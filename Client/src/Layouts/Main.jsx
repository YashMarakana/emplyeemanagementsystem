import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComModal from "../component/index";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Login } from '../Pages/Login/Login';
import { SignUp } from '../Pages/Register/SignUp';

export const Main = () => {
  const dispatch = useDispatch();

  const { user, open, status } = useSelector(state => state.User);
  const [userData, _userData] = useState({})

  const onChange = (target) => {
    let Data = userData
    Data[`${target.name}`] = target.value;
    _userData(Data)
  }

  // useEffect(() => {
  //   if (user)
  //     _userData(user)
  // }, [userData])

  return (
    <div>
      <Button color="primary" onClick={() => dispatch({ type: "LOGIN_MODAL", status: "Login" })} style={{ marginTop: "200px", marginRight: "20px", paddingRight: "100px", fontSize: "20px" }} size="sm">Login</Button>
      <Button color="secondary" onClick={() => dispatch({ type: "SIGNUP_MODAL", status: "signup" })} style={{ marginTop: "200px", marginRight: "20px", paddingRight: "100px", fontSize: "20px" }} size="sm" >SignUp</Button>

      <ComModal open={open} >
        {status === "Login" ?
          <Login
            user={userData}
            onChange={onChange}
          /> :

          <SignUp
            user={userData}
            onChange={onChange}
          />
        }
      </ComModal>

    </div>
  )
}

