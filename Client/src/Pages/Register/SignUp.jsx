import { Button, ModalFooter, Form, FormGroup, Label, Input,Row,Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Register } from "../../actions/authentication";

export const SignUp = ({user,onChange}) => {
 
const dispatch = useDispatch();
const history = useHistory();
const {token} = useSelector(state=>state.User); 

console.log("itemsdssd",user);
token && localStorage.setItem("token",token);
  

const RegisterUser = async(e) => {

 e.preventDefault();
      dispatch(await Register(user))
      console.log("item",user);
      history.push("/dashboard");
      dispatch({type:"RESET_PASS_MODAL"})
      }
   return (
    <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>First Name</Label>   
                <Input type="text" name="fname"  defaultValue={user && user.fname} onChange = {({target}) => onChange(target)} placeholder="First Name"  required />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup> 
                <Label>Last Name</Label>
                <Input type="text" name="lname" defaultValue={user && user.lname} onChange = {({target}) => onChange(target)} placeholder="Last name"  required />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label >email</Label>
            <Input type="email" name="email" defaultValue={user && user.email} onChange = {({target}) => onChange(target)} placeholder="enter email"  required />
            </FormGroup>
        <FormGroup>
            <Label >Password</Label>
            <Input type="password" name="password"  defaultValue={user && user.password} onChange = {({target}) => onChange(target)} placeholder="enter Password"  required />
          </FormGroup> 
        <ModalFooter> 
             <Button onClick={(e) => RegisterUser(e)}> SignUp </Button>
          <Button onClick = {() => dispatch({type:"SIGNUP_MODAL"})} > Close </Button>
          </ModalFooter>   
      </Form> 
   )
}
export default SignUp;