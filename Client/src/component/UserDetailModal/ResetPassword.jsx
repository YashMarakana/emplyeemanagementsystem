import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { useDispatch , useSelector} from "react-redux";
import { ResetPassword } from "../../actions/authentication";
import { useHistory } from "react-router-dom";

const ResetPass = ({user,onChange}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {token} = useSelector(state=>state.User)

  
  console.log("ewe");
  const Resetpassword = async () => {
    dispatch(await ResetPassword(user,token))
    dispatch({type:"SIGN_OUT"})
    history.push("/")
    dispatch({type:"RESET_PASS_MODAL"})
    localStorage.removeItem("token")
}
  return <Form>
    <FormGroup>
      <Label >Cuurent Password</Label>
      <Input type="password" name="oldPassword"  defaultValue={user?.oldPassword} onChange={({target}) => onChange(target)} placeholder="enter Current Password" required />
    </FormGroup>
    <FormGroup>
      <Label >New Password</Label>
      <Input type="password" name="newPassword" defaultValue={user?.newPassword}  onChange={({target}) => onChange(target)} placeholder="New Password" required />
    </FormGroup>
    <FormGroup>
      <Label >Confirm Password</Label>
      <Input type="password" name="confPassword" defaultValue={user?.confPassword}  onChange={({target}) => onChange(target)} placeholder="Confirm Password" required />
    </FormGroup>
    <ModalFooter>
      <Button onClick = {() => Resetpassword()}>Reset</Button>
      <Button onClick={() => dispatch({ type: "SIGNUP_MODAL" })}> Close </Button>
    </ModalFooter>
  </Form>
}
export default ResetPass;