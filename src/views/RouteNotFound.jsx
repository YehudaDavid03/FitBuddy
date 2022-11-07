import React, { useState, useEffect } from "react"

const RouteNotFound = ({ navigate }) => {
  return (
    <div style={{fontSize: "26px", textAlign: "center", marginTop: "2.5%"}}><span style={{color: "red"}}>404! </span>Route not found </div>
  )
}

export default RouteNotFound