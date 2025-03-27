import React from 'react';
import './GetInTouch.css';
import Header from '../Header/Header';
import Footer2 from '../Footer/Footer2';
import Footer from '../Footer/Footer';
import Nav from '../Header/Nav';
import '@fortawesome/fontawesome-free/css/all.min.css';
const GetInTouch = () => {
  return (
    <>
      <Header />
      <Nav />
      <div className="contact-page">
        <div className="contact-form">
          <h2 className='text-3xl font-bold text-center'>Get In Touch</h2>
          <p>
            We’d love to hear from you! Whether you’re a passionate reader,<br /> a curious author, or simply have a question, our team is here to help.
          </p>
          
        </div>

        <div className="contact-section">
          <div className="contact-card">
            <div className="icon">
              <i className="fas fa-globe"></i>
            </div>
            <h3 className='address'>Our Address</h3>
            <p className='para'>Lig Square, Anurag Nagar ,Indore (MP)</p>
            <p className='para'>Industrial area, In front of krishna garden, Guna (MP)</p>
          </div>

          <div className="contact-card">
            <div className="icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3 className='address'>Contact Us</h3>
            <p className='para'>Feel free to reach out to us at:</p>
            <p className='para'>7987789150, 7909648684</p>
          </div>

          <div className="contact-card">
            <div className="icon">
              {/* <i className="fas fa-calendar-alt"></i> */}
              <i className="fas fa-envelope"></i>
            </div>
            <h3 className='address'>Email Us</h3>
            <p className='para' >Drop us an email for any queries:</p>
            <p className='para'>bechobook214@gmail.com</p>
            <p>
              {/* Fri: <span className="off-day">Off - Day</span> */}
            </p>
          </div>
        </div>
      </div>
     
      {/* desktop footer */}
      <div className="md:inline">
        <Footer />
      </div>
    </>
  );
};

export default GetInTouch;
