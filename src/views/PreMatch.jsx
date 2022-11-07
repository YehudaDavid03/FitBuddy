import React, { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import useAxios from "../components/useAxios"
import LoadingWheel from "../components/LoadingWheel"

const PreMatch = ({ sendActiveContact, receiveUserInfo, sendUserInfo, navigate }) => {
  const [activeDatePressed, setActiveDatePressed] = useState(null)
  const [requestedMatchId, setRequestedMatchId] = useState(null)

  const { fetchData: inquiresApi, loading: inquiresApiLoading, error: inquiresApiError, response: inquiresApiResponse } = useAxios({
    getUrl: `https://fit-buddy-server-main.herokuapp.com/api/schedule${receiveUserInfo.userToken}`,
    getMethod: "GET",
    getHeaders: null
  })

  const { fetchData: friendApi, loading: friendApiLoading, error: friendApiError, response: friendApiResponse } = useAxios({
    getUrl: `https://fit-buddy-server-main.herokuapp.com/api/friend-user${receiveUserInfo.userToken}`,
    getMethod: "POST",
    getHeaders: {
      requestUserId: requestedMatchId
    }
  })

  useEffect(() => {
    if (requestedMatchId !== null) {
      friendApi()
      setRequestedMatchId(null)
    } else {  }
  }, [requestedMatchId])

  useEffect(() => {
    inquiresApi()
  }, [])

  useEffect(() => {
    if (friendApiResponse !== null) {
      sendUserInfo(friendApiResponse)
    } else {  }
    
    if (friendApiError !== null && friendApiResponse == null) {
      alert(friendApiError.response.data)
    } else {  }
  }, [friendApiResponse, friendApiError])

  useEffect(() => {
    if (inquiresApiError !== null && inquiresApiResponse == null) {
      alert(inquiresApiError.response.data)
    } else {  }
  }, [inquiresApiResponse, inquiresApiError])

  const convertTime = (t) => {
    let hours = t.slice(0, 2)
    let AmOrPm = hours >= 12 ? 'PM' : 'AM'
    hours = (hours % 12) || 12

    return hours + ":" + t.slice(3, 5) + " " + AmOrPm
  }

  return (
    inquiresApiLoading || friendApiLoading == true ?

    (<LoadingWheel />)

    :

    (
      <>
        <NavBar navigate={navigate} sendUserInfo={sendUserInfo} />
        <div className="pre-match-main">
          {
            inquiresApiResponse?.length == 0 ?

            (<p>No Scheduled Inquiries...</p>) 

            :

            (
              inquiresApiResponse?.map((inquireItem) => {
                return (
                  <>
                    <div key={inquireItem._id} onClick={() => {setActiveDatePressed(activeDatePressed == inquireItem._id ? null : inquireItem._id)}}>
                      <h1>{new Date(inquireItem.scheduleInfoDate).toUTCString().split(' ').slice(0, 4).join(' ')}<span>{convertTime(inquireItem.scheduleInfoTime)}</span></h1>
                      <p>{inquireItem.scheduleInfoActivity}</p>
                      <p>{inquireItem.scheduleInfoLocation}</p>
                      {activeDatePressed == inquireItem._id ? <span className="material-icons">keyboard_arrow_up</span> : <span className="material-icons">keyboard_arrow_down</span>}
                    </div>
  
                    <main>
                      {
                        activeDatePressed == null

                        ?

                        (<></>)

                        :

                        (
                          inquireItem._id !== activeDatePressed ?

                          (<></>)

                          :

                          (
                            inquireItem.scheduleInfoActivityFinds.length == 0 ?

                            (<p>No Matches Found...</p>)

                            :

                            (
                              inquireItem.scheduleInfoActivityFinds?.map((matchItem) => {
                                return (
                                  <section key={matchItem._id}>
                                    <header> 
                                      <img src={matchItem.userProfilePicture} />
                                    </header>
        
                                    <footer>
                                      <h1 style={{textAlign: "center", fontSize: "14px", fontWeight: "600", color: "#0F9D58"}}>{matchItem.matchTimeDistance}mi . {convertTime(matchItem.matchTime)}</h1>
                                      <h1>{`${matchItem.userFirstName} ${matchItem.userLastName}`} . {matchItem.userAge}yr</h1>
                                      <h1 style={{textAlign: "center", fontSize: "14px", fontWeight: "600"}}>{matchItem.matchLocation}</h1>
                                      <p onClick={() => { setRequestedMatchId(matchItem.userId) }}>{matchItem.userBio}</p>
                                      {
                                        receiveUserInfo.userFriends.find(e => e._id === matchItem.userId) ?

                                        (
                                          <button onClick={() => { sendActiveContact(matchItem.userId); navigate('/message', {replace: true}) }} style={{backgroundColor: "var(--main)"}} >Message</button>
                                        )

                                        :

                                        (
                                          receiveUserInfo.userRequests.find(e => e._id === matchItem.userId) ?

                                          (<button style={{backgroundColor: "#DB4437"}} onClick={() => { setRequestedMatchId(matchItem.userId) }}>Un-Request</button>)

                                          :

                                          (<button style={{backgroundColor: "#0F9D58"}} onClick={() => { setRequestedMatchId(matchItem.userId) }}>Request</button>)  
                                        )
                                      }
                                    </footer>
                                  </section>
                                )
                              })
                            )
                          )
                        )
                      }
                    </main>
                  </>
                )
              })
            )
          }
        </div>
      </>
    )
  )
}

export default PreMatch