import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { Main } from ".././Layouts/Main";
import { useSelector } from "react-redux";
import Home from "../Pages/Home/index";
import EmpList from "../Pages/EmpList";
import { ResetModalPass } from "../../component/UserComanModal/ResetModalPass";
import { UserinfoModal } from "../../component/UserComanModal/UserinfoModal";



const Path = () => {
   let { token } = useSelector(state => state.User)
   let history = useHistory();

   useEffect(() => {
      if (token && history.location.pathname === "/") {
         history.push("/dashboard")
      }
   }, [token])

   return (

      <Switch>
         <Route exact path='/' component={Main} />
         <Route exact path='/dashboard' component={Home} />
         <Route eaxct path='/employee-list' component={EmpList} />
         <Route exact path='/resetpass' component={ResetModalPass} />
         <Route exact path='/userdetail' component={UserinfoModal} />
      </Switch>

/*  */)
}
export default Path;