import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useAxios from "../components/useAxios"
import LoadingWheel from "../components/LoadingWheel"
import AutocompleteComp from "react-google-autocomplete"

const Signup = ({ receiveUserInfo, navigate }) => {
  const [register, setRegister] = useState({
    registerEmail: "",
    registerPassword: "",
    registerFirstName: "",
    registerLastName: "",
    registerProfilePicture: "",
    registerPhoneNumber: "",
    registerBio: "",
    registerBirthDate: "",
    registerWeight: "",
    // registerAddress: ""
  })
  const [separate, setSeparate] = useState("")
  const [visiblePassword, setVisiblePassword] = useState(false)

  const { fetchData: registerApi, loading: registerApiLoading, error: registerApiError, response: registerApiResponse } = useAxios({
    getUrl: "https://fit-buddy-server-main.herokuapp.com/api/register-user",
    getMethod: "POST",
    getHeaders: {
      userEmail: register.registerEmail,
      userPassword: register.registerPassword,
      userFirstName: register.registerFirstName,
      userLastName: register.registerLastName,
      userProfilePicture: register.registerProfilePicture,
      userPhoneNumber: register.registerPhoneNumber,
      userBio: register.registerBio,
      userBirthDate: register.registerBirthDate,
      userWeight: register.registerWeight,
      userAddress: separate
    }
  })

  useEffect(() => {
    if (registerApiResponse !== null) {
      alert("You will be redirected to login")
      navigate('/login', {replace: true})
    } else {  }

    if (registerApiError !== null && registerApiResponse == null) {
      alert(registerApiError.response.data)
    } else {  }
  }, [registerApiResponse, registerApiError])

  return (
    registerApiLoading == true ?

    (<LoadingWheel />)

    :

    (
      receiveUserInfo !== null ?

      (navigate('/account', {replace: true}))
  
      :
  
      (
        <div className="login-signup-main">
          <h1><span>REGISTER</span> ACCOUNT</h1>

          <input 
            type="email" 
            name="registerEmail" 
            placeholder="Email" 
            value={register.registerEmail} 
            onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }}
          />
          
          <div className="password-visible">
            <input
              type={visiblePassword == true ? "text" : "password"}
              name="registerPassword" 
              placeholder="Password (Must be 8 characters long or above)" 
              value={register.registerPassword}
              onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }}
            />

            <span onClick={() => { setVisiblePassword(!visiblePassword) }} className="material-icons">{ visiblePassword == true ? "visibility" : "visibility_off" }</span>
          </div>
          
          <input 
            type="text" 
            name="registerFirstName" 
            placeholder="First Name" 
            value={register.registerFirstName}
            onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }}
          />
          
          <input 
            type="text" 
            name="registerLastName" 
            placeholder="Last Name" 
            value={register.registerLastName} 
            onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }}
          />
          
          <input 
            type="url" 
            name="registerProfilePicture" 
            placeholder="Profile Picture Url"
            value={register.registerProfilePicture}
            onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }}
          />
          
          <input 
            type="number" 
            name="registerPhoneNumber" 
            placeholder="Phone Number"
            value={register.registerPhoneNumber}
            onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }}
          />

          <textarea type="text" name="registerBio" placeholder="Bio" value={register.registerBio} onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }}></textarea>
          
          <label>*Must be above the legal age</label>

          <input 
            type="date" 
            name="registerBirthDate" 
            placeholder=""
            value={register.registerBirthDate}
            onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }}
          />
          
          <input 
            type="number" 
            name="registerWeight" 
            placeholder="Weight" 
            value={register.registerWeight} 
            onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }}
          />
          
          <AutocompleteComp
            defaultValue={separate}
            placeholder="Location"
            onPlaceSelected={(place) => {
              setSeparate(place.formatted_address)
            }}
            options={{
              types: ["geocode"],
              componentRestrictions: { country: "us" }
            }}
          />
          
          <p>By submitting you are agreeing to the terms of our <Link to="/privacy-policy"><span>Privacy Policy</span></Link></p>
          <button onClick={() => {registerApi()}} >SIGNUP</button>
          <p>Already have an account? <Link to="/login"><span>Login</span></Link></p>
        </div>
      )
    )
  )
}

export default Signup