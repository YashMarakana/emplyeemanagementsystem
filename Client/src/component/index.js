import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";


const ComModal = ({ open,children }) => {

   return (
      <div>
         <Modal isOpen={open}>
            <ModalBody>
               {children}   
            </ModalBody>
         </Modal>
      </div> 
   )
}
export default ComModal;