import React, { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import useAxios from "../components/useAxios"
import LoadingWheel from "../components/LoadingWheel"
import AutocompleteComp from "react-google-autocomplete"

const Schedule = ({ receiveUserInfo, sendUserInfo, navigate }) => {
  const [scheduleInfo, setScheduleInfo] = useState({
    scheduleInfoDate: "",
    scheduleInfoTime: "",
    // scheduleInfoLocation: null,
    scheduleInfoActivity: ""
  })
  const [separate, setSeparate] = useState("")

  const { fetchData: scheduleApi, loading: scheduleApiLoading, error: scheduleApiError, response: scheduleApiResponse } = useAxios({
    getUrl: `https://fit-buddy-server-main.herokuapp.com/api/schedule${receiveUserInfo.userToken}`,
    getMethod: "POST",
    getHeaders: {
      scheduleInfoDate: scheduleInfo.scheduleInfoDate,
      scheduleInfoTime: scheduleInfo.scheduleInfoTime,
      scheduleInfoLocation: separate,
      scheduleInfoActivity: scheduleInfo.scheduleInfoActivity
    }
  })

  useEffect(() => {
    if (scheduleApiResponse !== null) {
      navigate('/pre-match', {replace: true})
    } else {  }

    if (scheduleApiError !== null && scheduleApiResponse == null) {
      alert(scheduleApiError.response.data)
    } else {  }
  }, [scheduleApiResponse, scheduleApiError])

  return (
    scheduleApiLoading == true ?

    (<LoadingWheel />)

    :

    (
      <>
        <NavBar navigate={navigate} sendUserInfo={sendUserInfo} />
        <div className="schedule-main">
          <div>
            <input 
              type="date" 
              name="scheduleInfoDate" 
              placeholder="" 
              value={scheduleInfo.scheduleInfoDate}
              onChange={(e) => { setScheduleInfo({...scheduleInfo, [e.target.name]: e.target.value})  }}
            />
            
            <input 
              type="time"
              name="scheduleInfoTime" 
              placeholder="" 
              value={scheduleInfo.scheduleInfoTime}
              onChange={(e) => { setScheduleInfo({...scheduleInfo, [e.target.name]: e.target.value})  }}
            />
          </div>

          <div>
            <select type="text" name="scheduleInfoActivity" value={scheduleInfo.scheduleInfoActivity} onChange={(e) => { setScheduleInfo({...scheduleInfo, [e.target.name]: e.target.value})  }}>
              <option value="" disabled>Activity</option>
              <option value="running">Running</option>
              <option value="gym">Gym Weight Lifting</option>
              <option value="tennis">Tennis</option>
              <option value="boxing">Boxing</option>
              <option value="yoga">Yoga</option>
            </select>
            
            <AutocompleteComp
              apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
              defaultValue={separate}
              placeholder="Location (Choose An Establishment Near Your Area)"
              onPlaceSelected={(place) => {
                setSeparate(place.formatted_address)
              }}
              options={{
                types: ["establishment"],
                componentRestrictions: { country: "us" }
              }}
            />
          </div>

          <div>
            <button onClick={() => { scheduleApi() }} >Schedule</button>
          </div>
        </div>
      </>
    )
  )
}

export default Schedule