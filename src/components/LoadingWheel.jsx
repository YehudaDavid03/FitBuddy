import React from "react"

const LoadingWheel = () => {
  return (
    <div className="loading-wheel-main">
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Please wait one moment.</p>
    </div>
  )
}

export default LoadingWheel