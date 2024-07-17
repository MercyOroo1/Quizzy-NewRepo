import React from 'react';
import Navbar from '../navbar/Navbar'; 
import Main from '../main/Main';

const About = () => {
  return (
    <div>
      <Navbar /> 
      <Main />
      <div className="about-container">
        <h2>About Quizzy</h2>
        <p>
          Welcome to Quizzy, your ultimate destination for interactive quizzes. We're dedicated to making learning fun and accessible for everyone. Explore our diverse range of quizzes and challenge yourself today!
        </p>
        <p>
          Quizzy is designed to provide an engaging learning experience across various subjects. Whether you're a student, educator, or just curious, there's something here for you. Join us in exploring the world of knowledge through quizzes!
        </p>
      </div>
    </div>
  );
};

export default About;
