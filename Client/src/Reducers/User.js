import { LOGIN_MODAL, SIGNUP_MODAL, LOGIN, SIGN_UP, RESET_PASS_MODAL, RESET_PASS, FETCH_USERS, USER_UPDATE,SIGN_OUT } from "../actions/action";

const initialState = {
    user:JSON.parse(localStorage.getItem("user")),
    open: false,
    status: '',
    token: localStorage.getItem("token")
}
// console.log("token3636", initialState.token);
const User = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_MODAL:
            return {
                ...state,
                open: !state.open,
                status: action.status
            }
        case SIGNUP_MODAL:

            return {
                ...state,
                open: !state.open,
                status: action.status
            }
        case RESET_PASS_MODAL:
console.log("dsdsd",action.status);
            return {
                ...state,
                open: !state.open,
                status: action.status
            }
        case LOGIN:
         
            return {
                ...state,
                user:action.payload.data,
                token: action.payload.token,
                open: !state.open,

            }
        case SIGN_UP:
       
            return {
                ...state,
                user:action.payload.data,
                token: action.payload.token
            }

        case SIGN_OUT:
          return {
              ...state,
              open: !state.open,
              token:null,
          }
        case RESET_PASS: 

            return {
                ...state,
                user:action.payload.data,
                open: !state.open,
                
            }
          
        case FETCH_USERS:
        return {
                 ...state,
                 open:!state.open,
                 user:action.payload,
                 status: action.status
            }
        case USER_UPDATE:
         
            return {
                ...state,
                user:action.payload.data
            }
         
        default:
            return state
    }
}

export default User;