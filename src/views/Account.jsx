import React, { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import useAxios from "../components/useAxios"
import LoadingWheel from "../components/LoadingWheel"
import AutocompleteComp from "react-google-autocomplete"

const Account = ({ sendUserInfo, receiveUserInfo, navigate }) => {
  // Update variables to latter be set 
  const [updateUserInfo, setUpdateUserInfo] = useState({})

  // var for google autocomplete
  const [separate, setSeparate] = useState(null)

  // Delete user account axios call 
  const { fetchData: deleteApi, loading: deleteApiLoading, error: deleteApiError, response: deleteApiResponse } = useAxios({
    getUrl: `https://fit-buddy-server-main.herokuapp.com/api/delete-account${receiveUserInfo.userToken}`,
    getMethod: "DELETE",
    getHeaders: null
  })

  // Update user account axios call 
  const { fetchData: updateApi, loading: updateApiLoading, error: updateApiError, response: updateApiResponse } = useAxios({
    getUrl: `https://fit-buddy-server-main.herokuapp.com/api/update-account${receiveUserInfo.userToken}`,
    getMethod: "PUT",
    getHeaders: {
      userFirstName: updateUserInfo?.userFirstName?.toLowerCase(),
      userLastName: updateUserInfo?.userLastName?.toLowerCase(),
      userProfilePicture: updateUserInfo?.userProfilePicture,
      userPhoneNumber: updateUserInfo?.userPhoneNumber,
      userBio: updateUserInfo?.userBio,
      userBirthDate: updateUserInfo?.userBirthDate,
      userWeight: updateUserInfo?.userWeight,
      userAddress: separate == null ? updateUserInfo?.userAddress : separate,
      userColorTheme: updateUserInfo?.userColorTheme,
      userFontSize: updateUserInfo?.userFontSize,
      userLanguage: updateUserInfo?.userLanguage
    }
  })

  // Setting updatable user info variables to original data from axios call when logged in
  useEffect(() => {
    setUpdateUserInfo({
      userFirstName: receiveUserInfo.userFirstName,
      userLastName: receiveUserInfo.userLastName,
      userProfilePicture: receiveUserInfo.userProfilePicture,
      userPhoneNumber: receiveUserInfo.userPhoneNumber,
      userBio: receiveUserInfo.userBio,
      userBirthDate: new Date(receiveUserInfo.userBirthDate).toISOString().substring(0, 10),
      userWeight: receiveUserInfo.userWeight,
      userAddress: receiveUserInfo.userAddress,
      userColorTheme: receiveUserInfo.userColorTheme,
      userFontSize: receiveUserInfo.userFontSize,
      userLanguage: receiveUserInfo.userLanguage
    })
  }, [])

  // Delete user account functionality after request is sent
  useEffect(() => {
    if (deleteApiResponse !== null) {
      sendUserInfo(null)
      navigate('/sign-up', {replace: true})
    } else {  }

    if (deleteApiError !== null && deleteApiResponse == null) {
      alert(deleteApiError.response.data)
    } else {  }
  }, [deleteApiResponse, deleteApiError])

  // Update user account functionality after request is sent
  useEffect(() => {
    if (updateApiResponse !== null) {
      sendUserInfo(null)
      navigate('/login', {replace: true})
    } else {  }
    
    if (updateApiError !== null && updateApiResponse == null) {
      alert(updateApiError.response.data)
    } else {  }
  }, [updateApiResponse, updateApiError])

  // Window confirm functionality for making big changes to user account
  const confirmFunc = (passedFunc) => {
    if (window.confirm("Are you sure you want to continue?") == true) {
      passedFunc()
    } else {  }
  }

  return (
    deleteApiLoading || updateApiLoading == true ?

    (<LoadingWheel />) 

    :

    (
      <>
        <NavBar navigate={navigate} sendUserInfo={sendUserInfo} />
        <div className="account-main">
          <label>User Settings</label>
          <div>
            <input 
              disabled
              style={{opacity: "0.6", cursor: "not-allowed"}}
              readOnly
              type="email" 
              value={receiveUserInfo?.userEmail} 
            />
            
            <input 
              disabled
              style={{opacity: "0.6", cursor: "not-allowed"}}
              readOnly
              type="text" 
              value={receiveUserInfo?.userUsername} 
            />
          </div>

          <div>
            <input
              style={{textTransform: "capitalize"}}
              type="text" 
              name="userFirstName" 
              placeholder="First Name" 
              value={updateUserInfo?.userFirstName}
              onChange={(e) => { setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value }) }}
              />
            
            <input 
              style={{textTransform: "capitalize"}}
              type="text" 
              name="userLastName" 
              placeholder="Last Name" 
              value={updateUserInfo?.userLastName} 
              onChange={(e) => { setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value }) }}
            />
          </div>

          <div>
            <input 
                type="url" 
                name="userProfilePicture" 
                placeholder="Profile Picture Url" 
                value={updateUserInfo?.userProfilePicture} 
                onChange={(e) => { setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value }) }}
              />
            
            <input 
              type="number" 
              name="userPhoneNumber" 
              placeholder="Phone Number" 
              value={updateUserInfo?.userPhoneNumber} 
              onChange={(e) => { setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value }) }}
            />
          </div>

          <div>
            <textarea type="text" name="userBio" placeholder="Bio" onChange={(e) => { setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value }) }} value={updateUserInfo?.userBio} ></textarea>

            <input 
              type="date" 
              name="userBirthDate" 
              placeholder="" 
              value={updateUserInfo?.userBirthDate}
              onChange={(e) => { setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value }) }}
            />
          </div>

          <div>
            <input 
                type="number" 
                name="userWeight" 
                placeholder="Weight" 
                value={updateUserInfo?.userWeight} 
                onChange={(e) => { setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value }) }}
              />

            <AutocompleteComp
              apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
              placeholder="Home Address"
              defaultValue={receiveUserInfo?.userAddress}
              onPlaceSelected={(place) => {
                setSeparate(place.formatted_address)
              }}
              options={{
                types: ["geocode"],
                componentRestrictions: { country: "us" }
              }}
            />
          </div>

          <label>Application Settings</label>

          <div>
            <select disabled style={{opacity: "0.6", cursor: "not-allowed"}} type="text" name="userColorTheme" onChange={(e) => { setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value }) }} value={updateUserInfo?.userColorTheme}>
              <option value="Auto">Auto Theme</option>
              <option value="Light">Light Theme</option>
              <option value="Dark">Dark Theme</option>
            </select>

            <select disabled style={{opacity: "0.6", cursor: "not-allowed"}} type="text" name="userFontSize" onChange={(e) => { setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value }) }} value={updateUserInfo?.userFontSize}>
              <option value="Small">Small Font</option>
              <option value="Medium">Medium Font</option>
              <option value="Large">Large Font</option>
            </select>

            <select disabled style={{opacity: "0.6", cursor: "not-allowed"}} type="text" name="userLanguage" onChange={(e) => { setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value }) }} value={updateUserInfo?.userLanguage}>
              <option value="English">English Speaker</option>
              <option value="Spanish">Spanish Speaker</option>
            </select>
          </div>

          <div>
            <button style={{backgroundColor: "#0F9D58"}} onClick={() => {confirmFunc(updateApi)}}>Update Info</button>
            <button style={{backgroundColor: "#DB4437"}} onClick={() => {confirmFunc(deleteApi)}}>Delete Account</button>
          </div>
        </div>
      </>
    )
  )
}

export default Account