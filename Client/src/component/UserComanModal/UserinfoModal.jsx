// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ComModal from "../index";
// import { useHistory } from "react-router-dom";
// import { Userinfo } from "../UserDetailModal/Userinfo";
// import { Updateuser } from "../../actions/authentication";

// export const UserinfoModal = () => {

//   const { user ,open} = useSelector(state => state.User)
//   const [userData, _userData] = useState({})

//   const dispatch = useDispatch()
//   let history = useHistory()
//   console.log(open);

//   const onChange = (target) => {
//     userData[`${target.name}`] = target.value;
//   }
//   console.log("userdatat", userData);

//   useEffect(() => {
//     _userData(user)
//   }, [userData])

//   console.log("user", user);

//   const Update = async (id) => {
//     dispatch(await Updateuser(id,userData))
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     dispatch({ type: "SIGN_OUT" })
//     history.push("/")
//   }

//   return (

//     <ComModal open={open}>
//       <Userinfo
//         userData={userData}
//         onChange={onChange}
//         Update={Update}
//       />
//     </ComModal>
//   )
// }