import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useAxios from "../components/useAxios"
import LoadingWheel from "../components/LoadingWheel"

import profileOne from "../assets/profile-one.png"
import profileTwo from "../assets/profile-two.png"
import profileThree from "../assets/profile-three.png"
import display from "../assets/display.png"

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

  // Testimonials to be rendered out 
  const testimonialsArr = [
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

  const reasonsArr = [
    {
      reasonId: "890sdkJKM",
      reasonIcon: "groups",
      reasonHeader: "Meet New People",
      reasonText: "Meet like minded people who have a passion for exercise. We use your geolocation to match you with other users in your area, so you'll always be able to meet with your exercise buddies. Become friends with your partners and easily stay in touch with our built in messaging system."
    },
    {
      reasonId: "812hkqYIO",
      reasonIcon: "show_chart",
      reasonHeader: "Stay Motivated",
      reasonText: "Stay motivated with your exercise buddy. Having a shared goal and working towards it together is a lot more motivational than trying to exercise on a solo mission. Working out together also has the benefit that you can pace each other and push harder than you would if you didn't have a partner at your side."
    },
    {
      reasonId: "944hsdKMK",
      reasonIcon: "explore",
      reasonHeader: "Explore New Trails",
      reasonText: "Have your partner show you their favorite trails and do something different to the ordinary. If you are traveling, have a local guide you and be blown away by the breath taking views that you would have otherwise missed."
    },
    {
      reasonId: "245hjsAZX",
      reasonIcon: "military_tech",
      reasonHeader: "Reach Your Goals",
      reasonText: "Reach your goals with a exercise partner. Having a partner will increase your consistency. Recent research shows that committing to an accountability partner increases the likelihood by 80% that you will follow through with your commitment. Exercising more often will ultimately boost your condition."
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
            <Link className="home-main-btn" style={{textDecoration: "none"}} to="/login">Login</Link>
            <Link className="home-main-btn" style={{textDecoration: "none"}} to="/sign-up">Register</Link>
          </div>
        </nav>

        {/* Page Start */}
        <header className="home-main-header">
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

        {/* Chart Statistics */}
        <div className="home-main-chart">
          <span>100's of people near you are looking for a workout buddy...</span>
          <p>
            FitBuddy is an web application that helps you find a workout buddy near you. 
            The app will suggest people that have similar preferences and routines as you, 
            thus increasing the probability that you'll be an excellent match. 
            You will be able to effortlessly arrange your workout's and set a meeting point, 
            allowing you to focus on what is most important: exercising more.
          </p>
          <div>
            <img src={display} />
          </div>
        </div>

        {/* Reasons To Use */}
        <div className="home-main-reasons">
          <h1><span>5 REASONS</span> TO USE FitBuddy.com</h1>

          <main>
            {
              reasonsArr.map((item) => {
                return (
                  <div key={item.reasonId}>
                    <span className="material-icons">{item.reasonIcon}</span>
                    <h1>{item.reasonHeader}</h1>
                    <p>{item.reasonText}</p>
                  </div>
                )
              })
            }
          </main>
        </div>

        {/* Testimonials */}
        <div className="home-main-testimonials">
          <h1><span>FITBUDDY </span> ALREADY HAS RAVING FANS!</h1>

          <main>
            {
              testimonialsArr.map((item) => {
                return (
                  <div key={item.testimonialId}>
                    <span style={{color: "var(--main)", fontSize: "62px"}} className="material-icons">format_quote</span>
                    <p>{item.testimonialDescription}</p>
                    <p>{item.testimonialFullName}</p>
                    <section>
                      {
                        (() => {
                          const starCount = []

                          for (let i = 0; i < item.testimonialStars; i++) {
                            starCount.push(<span style={{color: "#ffcd3c", fontSize: "24px"}} className="material-icons">star</span>)
                          }

                          return starCount
                        })()
                      }
                    </section>
                  </div>
                )
              })
            }
          </main>
        </div>

        {/* Contact Section */}
        <div className="home-main-contact">
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
        </div>

        {/* Bottom Nav */}
        <footer className="home-main-footer">
          <h1>{"Copyright"} <span className="material-icons">copyright</span>{`FitBuddy ${new Date().getFullYear() - 4} - ${new Date().getFullYear()}`} All Rights Reserved</h1>
        </footer>
      </div>
    )
  )
}

export default Home