import React from 'react';
import Navbar from '../navbar/Navbar';
import './About.css'; // Importing CSS file for About component

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="mainn-container">
        <h2>About Us</h2>
        <div className="about-content">
          <p>Welcome to our interactive quiz platform, where learning meets fun! We are dedicated to providing a rich learning experience through engaging quizzes on various topics. You'll find something for you here!</p>
        </div>

        <div className="mission-container">
          <h3>Our Mission</h3>
          <p>Our mission is to make learning enjoyable and accessible for everyone. We believe in the power of quizzes to reinforce learning and inspire curiosity. Through our platform, we aim to foster a community of learners who are eager to explore new subjects and deepen their understanding.</p>
        </div>

        <div className="offer-container">
          <h3>What We Offer</h3>
          <ul>
            <li><strong>Diverse Quizzes:</strong> Explore a wide range of quizzes covering subjects from history and science to pop culture and current events.</li>
            <li><strong>Interactive Experience:</strong> Engage with interactive features that enhance your learning experience.</li>
            <li><strong>User-Friendly Interface:</strong> Enjoy a seamless navigation experience with our user-friendly interface designed for all levels of users.</li>
          </ul>
        </div>

        <div className="join-container">
          <h3>Join Us Today</h3>
          <p>Join our growing community of learners and educators today! Dive into our quizzes, challenge yourself, and discover new knowledge. We're excited to have you with us on this learning journey!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
