import React, { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

import Home from "./views/Home"
import Login from "./views/Login"
import Signup from "./views/Signup"

import Account from "./views/Account"
import Schedule from "./views/Schedule"
import PreMatch from "./views/PreMatch"
import Message from "./views/Message"

import PrivacyPolicy from "./views/PrivacyPolicy"
import RouteNotFound from "./views/RouteNotFound"

function App() {
  const navigate = useNavigate()
  const localData = localStorage.getItem("userData")
  const [receiveUserInfo, setReceiveUserInfo] = useState(localData !== null ? JSON.parse(localData) : null)
  const [pageTheme, setPageTheme] = useState({
    pageThemeMode: "",
    pageThemeFont: ""
  })

  const [receivedActiveContact, setReceivedActiveContact] = useState(null)
  const sendActiveContact = (sendActiveContact) => {
    setReceivedActiveContact(sendActiveContact)
  }

  const sendUserInfo = (sendUserInfo) => {
    setReceiveUserInfo(sendUserInfo)
  }

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(receiveUserInfo))
  }, [receiveUserInfo])

  useEffect(() => {
    if (receiveUserInfo !== null) {
      // receiveUserInfo.userColorTheme == "Light" ? console.log("Light") : (receiveUserInfo.userColorTheme == "Dark" ? document.documentElement.style.setProperty('--secondary', "#ffffff") && document.documentElement.style.setProperty('--white', "#232425") : document.documentElement.style.setProperty('--grey', "#f2f2f2"))
      receiveUserInfo.userFontSize == "Small" ? setPageTheme({ ...pageTheme, ["pageThemeFont"]:  "16"}) : (receiveUserInfo.userFontSize == "Medium" ? setPageTheme({ ...pageTheme, ["pageThemeFont"]:  "18"}) : setPageTheme({ ...pageTheme, ["pageThemeFont"]:  "20"}))
    } else {  }
  }, [receiveUserInfo])

  return (
    <div style={{fontSize: pageTheme.pageThemeFont + "px"}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<RouteNotFound navigate={navigate}/>} />

        <Route path="/login" element={<Login receiveUserInfo={receiveUserInfo} sendUserInfo={sendUserInfo} navigate={navigate} />} />
        <Route path="/sign-up" element={<Signup receiveUserInfo={receiveUserInfo} navigate={navigate} />} />

        {
          receiveUserInfo == null ?

          (null) 

          :

          (
            <>
              <Route path="/account" element={<Account sendUserInfo={sendUserInfo} receiveUserInfo={receiveUserInfo} navigate={navigate}/> } />
              <Route path="/schedule" element={<Schedule receiveUserInfo={receiveUserInfo} navigate={navigate} sendUserInfo={sendUserInfo} />} />
              <Route path="/pre-match" element={<PreMatch sendActiveContact={sendActiveContact} receiveUserInfo={receiveUserInfo} navigate={navigate} sendUserInfo={sendUserInfo} />} />
              <Route path="/message" element={<Message receivedActiveContact={receivedActiveContact} receiveUserInfo={receiveUserInfo} navigate={navigate} sendUserInfo={sendUserInfo} />} />
            </>
          )
        }
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  )
}

export default App
