/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import ComModal from "../../component/index";
import ResetPass from "../../component/UserDetailModal/ResetPassword";
import { Userinfo } from "../../component/UserDetailModal/Userinfo";
import { Updateuser } from "../../actions/authentication";
// import { getUsers } from "../../actions/authentication";



export const UserDetail = ({ Logout }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  // const [userData, _userData] = useState({})

  const { user, open ,status} = useSelector(state => state.User)
  console.log(open);
  console.log("User", user);
  const onChange = (target) => {
    user[`${target.name}`] = target.value;
  }
  const resetPass = (e) => {
    e.preventDefault()
    dispatch({ type: "RESET_PASS_MODAL",status:"resetPassword" })
  }

  const Userdetail = (e) => {
    e.preventDefault()
    dispatch({ type: "FETCH_USERS",status:"FetchUser", payload: user })
  }

  const Update = async (id) => {
    dispatch(await Updateuser(id,user))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch({ type: "SIGN_OUT" })
    history.push("/")
  }
  return (
    <div>

      <ul className="navbar-nav ">

        <img src="avatar-young-bearded-guy-brow-haired-man-vector-32416677.jpeg" width="40" height="40" class="rounded-circle" />

        <li className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" id="navDropDownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {user?.fname}{user?.lname}
          </a>
          <div className="dropdown-menu" aria-labelledby="navDropDownLink">
            <a className="dropdown-item" href="/getuser" onClick={(e) => Userdetail(e)}>User Details</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" onClick={(e) => resetPass(e)}>Reset Password</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/" onClick={() => Logout()}>Logout</a>
          </div>
        </li>
      </ul>

      <ComModal open={open} >
        {console.log("stattys",status)}
    {status ==="resetPassword" &&
     <ResetPass
          user={user}
          onChange={onChange}
        />
  }
  {status ==="FetchUser" &&
    
 <Userinfo
    userData={user}
    onChange={onChange}
    Update={Update}
  />
    
  }
      </ComModal>
    </div>

  )
}
