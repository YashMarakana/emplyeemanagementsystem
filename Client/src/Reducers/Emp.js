import { MODAL,ADD_ITEM,EDIT_ITEM,DELETE_ITEM,FETCH_ITEMS } from "../actions/action";

const initialState = {
    
    Empitem:[],
    open:false,
   
}

const Empdata = (state = initialState,action) => {
    switch (action.type) {
        case MODAL:
            return { ...state, open:!state.open }

        case ADD_ITEM:
            return{ ...state, Empitem:[...state.Empitem,action.payload]}
        
        case EDIT_ITEM:
            debugger
            return { ...state, Empitem:state.Empitem.map((item) => item._id === action.payload._id ? action.payload : item) }

        case DELETE_ITEM:
        return { ...state, Empitem:state.Empitem.filter((item) =>item._id !== action.payload) }

        case FETCH_ITEMS:{
          return { ...state, Empitem: action.payload }
        }    
        default:
            return state
    }
}

export default Empdata;