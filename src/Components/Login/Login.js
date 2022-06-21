import React, { useState } from "react";

import { Link } from "react-router-dom";

import {useHistory} from "react-router-dom";

import { Firebase } from "../../firebase/config";

import Logo from "../../iitg logo.png";

import RoundLoading from "../Loading/RoundLoading";

import "./Login.css";

function Login() {
  
  let [email, setEmail] = useState("");
  
  let [password, setPassword] = useState("");
  
  let [loading,setLoading]=useState(false)
  
  const history = useHistory()
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    Firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push("/")
    }).catch((error)=>{
      alert(error.message)
    })

  };
  return (<>
    {loading && <RoundLoading/> }
    <div>
      <div className="loginParentDiv">
        
        <img width="200px" height="200px" src={Logo} alt=""></img>
        
        <form onSubmit={handleSubmit}>
        
          <label>Email</label>
          <br />
          <input
            className="input"
            type="email"
            placeholder="YOUR_EMAIL_ADDRESS"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         
          <br />
         
          <br />
         
          <button>Login</button>
        </form>
        <div className="signupButton"><Link to="/signup">Signup</Link></div>
      </div> 
    </div>
    </>
  );
}

export default Login;
