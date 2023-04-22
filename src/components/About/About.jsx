/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./about.css";
import person_img from "../../assets/person.png";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-upper">
        <h2 className="about-upper-text">About Us</h2>
        <p className="about-upper-text">Community Is Stronger Than Cancero.</p>
        <p className="about-upper-text">
          No one can, or should, face cancer alone.
        </p>
        <p style={{ textAlign: "left", lineHeight: "1.6" }}>
          The online community allows you to create a personal profile where you
          can share information about yourself for others to see. You choose who
          you want to invite or allow access to your profile. Online communities
          offer many benefits to people with cancer, such as:
          <li>Making it easier to stay in touch with family and friends</li>
          <li>Connecting you to others in the same situation</li>
          <li>Helping people get support no matter where they live</li>
          <li>
            Giving people who don't like face-to-face groups another option to
            connect with others
          </li>
          In an online community, you can post a photo or video of yourself and
          share updates with people in your network whenever you like. You are
          free to decide how much information you feel comfortable sharing with
          others. Many sites offer privacy settings and tools, which allow you
          to control who can view your profile and what they can see or read.
          When creating a profile, learn about the privacy settings and options
          offered by the site. This will help you learn how your information is
          used and how it can be accessed. Being familiar with these features
          may help you feel more comfortable sharing your profile.
          <br />
          Sharing stories with other people in an online community may be a way
          to learn about treatment options and other concerns, such as side
          effects. While sharing these experiences is helpful, keep in mind that
          only your doctor can give you the best advice for the type of cancer
          you have and your situation. And remember, your experience with side
          effects may be different from others.
        </p>
      </div>
      <div className="about-lower">
        <h1 style={{ margin: "0.6rem" }}>Our Team</h1>
        <div className="persons-container">
          <div className="person-card">
            <div className="person-image">
              <img src={person_img} alt="image of the person" />
            </div>
            <div className="person-name">
              <h3>Donia Almamari</h3>
            </div>
            <div className="person-detail">
              <p>
                "I believe that this society can fight disease and defeat it."
              </p>
              <p>66j1771@shct.edu.om</p>
            </div>
            <button className="person-contact">Contact</button>
          </div>
          <div className="person-card">
            <div className="person-image">
              <img src={person_img} alt="image of the person" />
            </div>
            <div className="person-name">
              <h3>Deena Almamari</h3>
            </div>
            <div className="person-detail">
              <p>
                "One of the things we work on with patients is to let go of that
                feeling of avoidance, so that the patient can talk about their
                full experience with cancer."
              </p>
              <p>66j1771@shct.edu.om</p>
            </div>
            <button className="person-contact">Contact</button>
          </div>
          <div className="person-card">
            <div className="person-image">
              <img src={person_img} alt="image of the person" />
            </div>
            <div className="person-name">
              <h3>Hadil Alhsni</h3>
            </div>
            <div className="person-detail">
              <p>There is a "can" in cancer because we can beat it...</p>
              <p>66S1736@shct.edu.om</p>
            </div>
            <button className="person-contact">Contact</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
