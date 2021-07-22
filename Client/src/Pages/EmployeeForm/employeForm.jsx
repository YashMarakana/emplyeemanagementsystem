/* eslint-disable jsx-a11y/alt-text */
import { Button,  ModalFooter, Form, FormGroup, Label, Input,Row,Col } from "reactstrap";
import {useDispatch} from "react-redux";

export const EmployeeForm = ({onChange,users,FileOnChange,edit,Img,handleAdd,handleUpdate}) => {
  console.log();
  let dispatch = useDispatch()
    return(
        <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label>First Name</Label>   
              <Input type="text" name="fname" defaultValue={users?.fname}  onChange={({target}) => onChange(target)} placeholder="First Name"  required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Last Name</Label>
              <Input type="text" name="lname"  defaultValue={users?.lname} onChange={({target}) => onChange(target)} placeholder="Last name"  required />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label >Email</Label>
          <Input type="email" name="email" defaultValue={users?.email} onChange={({target}) => onChange(target)} placeholder="enter email"  required />
          </FormGroup>  
        <FormGroup>
        <Label for="exampleFile">File</Label>
        { Img?
        <>
          <Input type="file" name="file" onChange={(e) => FileOnChange(e)} id="exampleFile" /> 
        
            <img src={Img} style={{width:"250px",height:"200px"}} target="exampleFile"/> 
          
          </>
            :
            <Input type="file" name="file" onChange={(e) => FileOnChange(e)} id="exampleFile" /> 
        }
          </FormGroup> 

      <ModalFooter> 
         {edit? 
           <Button onClick={(e) => handleUpdate(e)}> Update </Button> :
           <Button onClick ={(e) =>handleAdd(e)} > Add </Button>
         }
        <Button onClick={()=> dispatch({type:"MODAL"})}> Close </Button>   
        </ModalFooter>        
  </Form> 
    )
}
