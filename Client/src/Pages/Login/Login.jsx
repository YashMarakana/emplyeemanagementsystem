import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Signin } from "../../actions/authentication"

export const Login = ({ user, onChange }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { token} = useSelector(state => state.User);
  console.log("token2121", token);

  token && localStorage.setItem("token", token)

  // eslint-disable-next-line no-unused-vars
  const LoginUser = async () => {
    const data = dispatch(await Signin(user))
    console.log("dxatasas",data);
    
    if(data?.payload?.token){
      history.push("/dashboard");
    }else{
      history.push("/");
    }
  }

  return <Form>
    <FormGroup>
      <Label >Email</Label>
      <Input type="email" name="email" defaultValue={user?.email} onChange={({ target }) => onChange(target)} placeholder="enter email" required />
    </FormGroup>
    <FormGroup>
      <Label >Password</Label>
      <Input type="password" name="password" defaultValue={user?.password} onChange={({ target }) => onChange(target)} placeholder="enter Password" required />
    </FormGroup>
    <ModalFooter>
      <Button onClick={() => LoginUser()}> Login </Button>
      <Button onClick={() => dispatch({ type: "SIGNUP_MODAL" })}> Close </Button>
    </ModalFooter>
  </Form>
}
