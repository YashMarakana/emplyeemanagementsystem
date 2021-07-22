/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

export const Userinfo = ({ userData,onChange ,Update}) => {
   
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.User)
  console.log("user2121",user);
  return( 

  <Form>
    <FormGroup>
      <Label >First Name</Label>
      <Input type="text" name="fname" defaultValue={userData?.fname} onChange={({ target }) => onChange(target)} placeholder="enter Current Password" required />
    </FormGroup>
    <FormGroup>
      <Label >Last Name</Label>
      <Input type="text" name="lname" defaultValue={userData?.lname} onChange={({ target }) => onChange(target)} placeholder="New Password" required />
    </FormGroup>
    <FormGroup>
      <Label >Email</Label>
      <Input type="email" name="email" defaultValue={userData?.email} onChange={({ target }) => onChange(target)} placeholder="New Password" required />
    </FormGroup>
    <ModalFooter>
      <Button onClick={() => Update(user._id)} >Reset</Button>
      <Button onClick={() => dispatch({ type: "SIGNUP_MODAL" })}> Close </Button>
    </ModalFooter>
  </Form>
  )
}