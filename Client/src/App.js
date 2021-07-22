import React from "react";
import Header from "./Layouts/Header";
import Path from "./routes/index";
import { useSelector } from "react-redux";
import { BrowserRouter as Router,useHistory } from "react-router-dom";
import './App.css';
function App() {
  let {token} = useSelector(state=>state.User) 
console.log("token",token);
  const history = useHistory()

  return (
 <Router history={history}>
    <div className="App">  
    {token && <Header/>}
       <Path/>    
    </div>
  </Router> 
  );
}

export default App;
