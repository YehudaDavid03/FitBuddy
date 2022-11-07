import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useAxios from "../components/useAxios"
import LoadingWheel from "../components/LoadingWheel"

const  Login = ({ receiveUserInfo, sendUserInfo, navigate }) => {
  // Variable to turn password visible and vise versa
  const [visiblePassword, setVisiblePassword] = useState(false)

  // Login variables
  const [login, setLogin] = useState({
    loginUsername: "",
    loginPassword: ""
  })
  
  // Login user axios call 
  const { fetchData: loginApi, loading: loginApiLoading, error: loginApiError, response: loginApiResponse } = useAxios({
    getUrl: `https://fit-buddy-server-main.herokuapp.com/api/login-user`,
    getMethod: "POST",
    getHeaders: {
      userEmail: login.loginUsername,
      userPassword: login.loginPassword
    }
  })

  // Login user functionality after request is sent
  useEffect(() => {
    if (loginApiResponse !== null) {
      sendUserInfo(loginApiResponse)
      navigate('/pre-match', {replace: true})
    } else {  }

    if (loginApiError !== null && loginApiResponse == null) {
      alert(loginApiError.response.data)
    } else {  }
  }, [loginApiResponse, loginApiError])
  
  return (
    loginApiLoading == true ?

    (<LoadingWheel />)

    :

    (
      receiveUserInfo !== null ?
      
      (navigate('/account', {replace: true}))

      :

      (
        <div className="login-signup-main">
          <h1><span>MEMBER</span> LOGIN</h1>

          <input 
            type="text" 
            name="loginUsername" 
            placeholder="Email" 
            value={login.loginUsername} 
            onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }}
          />
          
          <div className="password-visible">
            <input 
              type={visiblePassword == true ? "text" : "password"}
              name="loginPassword" 
              placeholder="Password" 
              value={login.loginPassword}
              onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }}
            />

            <span onClick={() => { setVisiblePassword(!visiblePassword) }} className="material-icons">{ visiblePassword == true ? "visibility" : "visibility_off" }</span>
          </div>
          
          <p>By submitting you are agreeing to the terms of our <Link to="/privacy-policy"><span>Privacy Policy</span></Link></p>
          <button onClick={() => {loginApi()}} >LOGIN</button>
          <p>Don't have an account? <Link to="/sign-up"><span>Register</span></Link></p>
          
          {/* Must make onclick for forget password */}
          <p style={{cursor: "pointer"}}><span>Forgot password?</span></p>
        </div>
      )
    )
  )
}

export default Login