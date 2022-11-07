import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useAxios from "../components/useAxios"
import LoadingWheel from "../components/LoadingWheel"

import runningImage from "../assets/running_image.png"
import profileOne from "../assets/profile-one.png"
import profileTwo from "../assets/profile-two.png"
import profileThree from "../assets/profile-three.png"

const Home = () => {
  // Message to Fitbudy variables for suggestions
  const [contact, setContact] = useState({
    fullName: "",
    emailAddress: "",
    subject: "",
    message: ""
  })

  // Contact Fitbuddy axios call 
  const { fetchData: contactApi, loading: contactApiLoading, error: contactApiError, response: contactApiResponse } = useAxios({
    getUrl: `https://fit-buddy-server-main.herokuapp.com/api/send-message-us`,
    getMethod: "POST",
    getHeaders: { 
      fullName: contact.fullName, 
      emailAddress: contact.emailAddress, 
      subject: contact.subject, 
      message: contact.message
    }
  })

  // Contact Fitbuddy functionality after request is sent
  useEffect(() => {
    if (contactApiResponse !== null) {
      alert(contactApiResponse)
      setContact({
        fullName: "",
        emailAddress: "",
        subject: "",
        message: ""
      })
    } else {  }

    if (contactApiError !== null && contactApiResponse == null) {
      alert(contactApiError.response.data)
    } else {  }
  }, [contactApiResponse, contactApiError])

  // Testimonials to be renderd out 
  const testimonials = [
    {
      testimonialId: "780erhIOA",
      testimonialImage: profileOne,
      testimonialFullName: "John Smith",
      testimonialStars: 4,
      testimonialDescription: "When I moved to Granada Hills I wanted to give up smoking and get fitter. I always enjoyed running and wanted to take it up again, but I knew it would be tough at the start. So running with someone would be a good help. Not knowing anyone in the area I turned to the web and found FitBuddy and discovered there were lots of runners near me.",
    },
    {
      testimonialId: "129gjoSHX",
      testimonialImage: profileTwo,
      testimonialFullName: "Oliver Anderson",
      testimonialStars: 5,
      testimonialDescription: "The most difficult stage of exercise is to start doing it. I'm so glad to find FitBuddy, which helped me find new buddies and achieve goals. This is a great combination of activity and communication. I'm so happy!",
    },
    {
      testimonialId: "890aseIOM",
      testimonialImage: profileThree,
      testimonialFullName: "Michael David",
      testimonialStars: 5,
      testimonialDescription: "As an avid runner and someone who prefers to run solo, I wasn't sure if FitBuddy was going to be for me, but I was keen to see if anyone could benefit from running with me, or learning from my personal experiences. As an experienced runner I like helping others achieve their goals, regardless of their ability or the distance.",
    }
  ]
  
  return (
    contactApiLoading ? 

    (<LoadingWheel />) 

    :

    (
      <div className="home-main">
        <nav>
        <div>
            <Link style={{textDecoration: "none"}} to="/"><h1>FitBuddy</h1></Link>
          </div>

          <div>
            <Link style={{textDecoration: "none"}} to="/login"><button>Login</button></Link>
            <Link style={{textDecoration: "none"}} to="/sign-up"><button>Register</button></Link>
          </div>
        </nav>

        {/* About */}
        <header>
          <img style={{width: "100%"}} src={runningImage} alt="" />
          
          <div>
            <span>Find a sports partner</span>
            <p>
              On those days when you aren't particularly in the mood for exercise,
              you will be less likely to forgo it if you have a partner. 
              Inherent in the buddy system is the obligation and commitment 
              to be present at the designated times. 
              Such consistency is needed for a fitness routine to be successful.
            </p>
          </div>
        </header>

        {/* Reasons */}
        <section className="reasons">
          <div>
            <h1><span>5 REASONS</span> TO USE FitBuddy.com</h1>
          </div>

          <div>
            <footer>
              <span className="material-icons">military_tech</span>
              <p>Achieve your goals quicker with a training partner</p>
            </footer>

            <footer>
              <span className="material-icons">leaderboard</span>
              <p>Get more from your exercise with a partner</p>
            </footer>

            <footer>
              <span className="material-icons">connect_without_contact</span>
              <p>Go the distance with a running partner</p>
            </footer>

            <footer>
              <span className="material-icons">place</span>
              <p>Find a training partner at your destination when you travel</p>
            </footer>

            <footer>
              <span className="material-icons">filter_center_focus</span>
              <p>Get focused! - Find a training partner to get you motivated</p>
            </footer>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <h1>testimonials</h1>

          <main>
            {
              testimonials.map((item) => {
                return (
                  <footer key= {item.testimonialId}>
                    <div>
                      <img src={item.testimonialImage} />
                      <h1>{item.testimonialFullName}</h1>
                      {
                        (() => {
                          const starCount = []

                          for (let i = 0; i < item.testimonialStars; i++) {
                            starCount.push(<span className="material-icons">star</span>)
                          }

                          return starCount
                        })()
                      }
                    </div>
          
                    <div>
                      <p>{item.testimonialDescription}</p>
                    </div>
                  </footer>
                )
              })
            }
          </main>
        </section>

        {/* Contact */}
        <section className="contact">
          <h1>Send us a message</h1>

          <input 
            type="text"
            name="fullName" 
            placeholder="Full Name" 
            value={contact.fullName}
            onChange={(e) => { setContact({ ...contact, [e.target.name]: e.target.value }) }}
          />
          
          <input 
            type="text"
            name="emailAddress" 
            placeholder="Email" 
            value={contact.emailAddress}
            onChange={(e) => { setContact({ ...contact, [e.target.name]: e.target.value }) }}
          />
          
          <input 
            type="text"
            name="subject" 
            placeholder="Subject" 
            value={contact.subject}
            onChange={(e) => { setContact({ ...contact, [e.target.name]: e.target.value }) }}
          />

          <textarea type="text" name="message" placeholder="Message" value={contact.message} onChange={(e) => { setContact({ ...contact, [e.target.name]: e.target.value }) }}></textarea>

          <button onClick={() => { contactApi() }} >send</button>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p><Link style={{textDecoration: "none", fontWeight: "600"}} to="/login">Login -</Link><Link style={{textDecoration: "none", fontWeight: "600"}} to="/sign-up"> Register</Link></p>
          <h1>{"Copyright"} <span className="material-icons">copyright</span>{`FitBuddy ${new Date().getFullYear() - 4} - ${new Date().getFullYear()}`} All Rights Reserved</h1>
        </footer>
      </div>
    )
  )
}

export default Home