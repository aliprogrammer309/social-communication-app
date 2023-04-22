import React from "react";
import "./contact.css";
import patient_img from "../../assets/patient.png";


const Contact = () => {
  return (
    <section>
      <div className="contact-upper">
        <h2>Contact Us</h2>
        <p>Leave us a message:</p>
      </div>
      <div className="contact-lower">
        <div className="contact-lower-left">
          <img src={patient_img} alt="patient_image"/>
        </div>
        <div className="contact-lower-right">
          {/* <img src={patient_img} alt="patient_image"/> */}
          <label htmlFor="name">Name:</label>
          <input type="text" placeholder="Your name..." className="contact-input"/>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="Your email..." className="contact-input"/>
          <label htmlFor="Governorat">Governorat:</label>
              <select id="Governorat" name="Governorat">
                <option value="male">Muscat</option>
                <option value="other">Other</option>
              </select>
          <label htmlFor="subject">Subject:</label>
          <textarea name="subject" id="subject" cols="30" rows="10" placeholder="Write something..."/>
          <button>Submit</button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
