import React from "react"
import { Link } from "react-router-dom"

const NavBar = ({ sendUserInfo, navigate }) => {
  // Logout functionality
  const logoutFunc = () => {
    sendUserInfo(null)
    navigate('/login', {replace: true})
  }

  return (
    <div className="nav-bar-main">
      <div>
        <Link to="/" style={{textDecoration: "none"}}>
          <p>FitBuddy</p>
        </Link>
      </div>

      <div>
        <Link to="/"><span className="material-icons">home</span></Link>
        <Link to="/schedule"><span className="material-icons">schedule</span></Link>
        <Link to="/pre-match"><span className="material-icons">join_left</span></Link>
        <Link to="/message"><span className="material-icons">send</span></Link>
        <Link to="/account"><span className="material-icons">settings</span></Link>
        {
          sendUserInfo ?

          (<span onClick={() => {logoutFunc()}} className="material-icons">logout</span>)

          :

          (null)
        }
      </div>
    </div>
  )
}

export default NavBar