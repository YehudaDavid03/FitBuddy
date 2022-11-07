import React, { useState, useEffect, useRef } from "react"
import NavBar from "../components/NavBar"
import useAxios from "../components/useAxios"
import LoadingWheel from "../components/LoadingWheel"

const Message = ({ receivedActiveContact,  receiveUserInfo, sendUserInfo, navigate }) => {  
  // Ref to scroll down to load latest messages
  const bottomRef = useRef(null)

  // Variable for all the messages between 2 users thats clicked on
  const [messagesForChosen, setMessagesForChosen] = useState(null)

  // Variable to hold the current message input 
  const [messageInput, setMessageInput] = useState("")

  // Variable to hold the current active contact that clicked on
  const [activeContact, setActiveContact] = useState(null)

  // Variable to hold id of user that he wants to un-friend
  const [requestedUnMatchId, setRequestedUnMatchId] = useState(null)

  // Friend axios call to make an action done between to users EX [request user, un-request user, friend user, un-friend user]
  const { fetchData: friendApi, loading: friendApiLoading, error: friendApiError, response: friendApiResponse } = useAxios({
    getUrl: `https://fit-buddy-server-main.herokuapp.com/api/friend-user${receiveUserInfo.userToken}`,
    getMethod: "POST",
    getHeaders: {
      requestUserId: requestedUnMatchId
    }
  })

  // Send a message to a user axios call 
  const { fetchData: sendMessageApi, loading: sendMessageApiLoading, error: sendMessageApiError, response: sendMessageApiResponse } = useAxios({
    getUrl: `https://fit-buddy-server-main.herokuapp.com/api/send-message${receiveUserInfo.userToken}`,
    getMethod: "POST",
    getHeaders: {
      messageToUid: activeContact,
      messageText: messageInput
    }
  })

  // Get all messages between 2 users axios call with id in header 
  const { fetchData: getMessageApi, loading: getMessageApiLoading, error: getMessageApiError, response: getMessageApiResponse } = useAxios({
    getUrl: `https://fit-buddy-server-main.herokuapp.com/api/get-message${receiveUserInfo.userToken}`,
    getMethod: "POST",
    getHeaders: {
      messageToUid: activeContact
    }
  })

  // Calling getMessageApi() axios only when user is chosen
  useEffect(() => {
    activeContact !== null ? getMessageApi() : <></>
  }, [activeContact])

  // If requestedUnMatchId is set call friendApi() axios 
  useEffect(() => {
    if (requestedUnMatchId !== null) {
      friendApi()
      setActiveContact(null)
      setRequestedUnMatchId(null)
    } else {  }
  }, [requestedUnMatchId])

  // Set setActiveContact() to {example} when receivedActiveContact is changed from a diff page 
  useEffect(() => {
    receivedActiveContact !== null ? setActiveContact(receivedActiveContact) : <></>
  }, [receivedActiveContact])

  // Scroll down to latest message with dependencies
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [activeContact, messagesForChosen])

  // Get messages functionality after request is sent
  useEffect(() => {
    if (getMessageApiResponse !== null) {
      setMessagesForChosen(getMessageApiResponse)
    } else {  }
    
    if (getMessageApiError !== null && getMessageApiResponse == null) {
      alert(getMessageApiError.response.data)
    } else {  }
  }, [getMessageApiResponse, getMessageApiError])

  // Send message to user functionality after request is sent
  useEffect(() => {
    if (sendMessageApiResponse !== null) {
      setMessagesForChosen(sendMessageApiResponse)
      setMessageInput("")
    } else {  }
    
    if (sendMessageApiError !== null && sendMessageApiResponse == null) {
      alert(sendMessageApiError.response.data)
    } else {  }
  }, [sendMessageApiResponse, sendMessageApiError])

  // Friend action functionality after request is sent
  useEffect(() => {
    if (friendApiResponse !== null) {
      sendUserInfo(friendApiResponse)
    } else {  }
    
    if (friendApiError !== null && friendApiResponse == null) {
      alert(friendApiError.response.data)
    } else {  }
  }, [friendApiResponse, friendApiError])

  return (
    friendApiLoading || sendMessageApiLoading || getMessageApiLoading == true ?

    (<LoadingWheel />)

    :

    (
      <>
        <NavBar navigate={navigate} sendUserInfo={sendUserInfo} />
        <div className="message-main">
          {
            receiveUserInfo.userFriends.length > 0 ?

            (
              <section>
                <div>
                  <h1>Friends</h1>
                </div>
                
                <div>
                  {
                    receiveUserInfo.userFriends.map((item) => {
                      return (
                        <card key={item._id} onClick={() => {setActiveContact(item._id); setMessageInput("")}} style={{backgroundColor: activeContact == item._id ? "var(--secondary)" : "var(--grey)" }}>
                          <img src={item.userProfilePicture} />
        
                          <span>
                          <h2 style={{color: activeContact == item._id ? "var(--white)" : "var(--secondary)" }}>{`${item.userFirstName} ${item.userLastName}`}</h2>
                          </span>
                        </card>
                      )
                    })
                  }
                </div>
              </section>
            )

            :

            (
              <section>
                <div>
                  <p>No Friends Yet...</p>
                </div>
              </section>
            ) 
          }
          
          {
            receiveUserInfo.userFriends.length > 0 && activeContact !== null ?

            (
              <main>
                <div>
                  <h1>{(receiveUserInfo.userFriends.filter((item) => item._id == activeContact))[0].userFirstName + " " + (receiveUserInfo.userFriends.filter((item) => item._id == activeContact))[0].userLastName}</h1>
                  <span onClick={() => { setRequestedUnMatchId(activeContact) }} className="material-icons">delete</span>
                </div>
      
                <div>
                  {
                    messagesForChosen?.map((item) => (
                      <span key={item._id} ref={bottomRef} className={item.messageFromUid == receiveUserInfo._id ? "message-view-main-sent" : "message-view-main-received"} >
                        <p>{item.messageText}</p>
                        <p>{new Date(item.messageDateTime).toLocaleDateString() + " - " + new Date(item.messageDateTime).toLocaleTimeString()}</p>
                      </span>
                    ))
                  }
                </div>
      
                <div>
                  <textarea type="text" name="" placeholder="Message..." value={messageInput} onChange={(e) => { setMessageInput(e.target.value) }}></textarea>
                  <span onClick={() => { sendMessageApi() }} className="material-icons">send</span>
                </div>
              </main>
            )

            :

            (
              <></>
            )
          }
        </div>
      </>
    )
  )
}

export default Message