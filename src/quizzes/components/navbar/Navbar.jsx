import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css'

const Navbar = () =>{
    const navigate = useNavigate();

  const [sticky, setSticky] = useState(false);

  useEffect(()=>{
      window.addEventListener("scroll", ()=>{
         window.scrollY > 50 ? setSticky(true) : setSticky(false);
      })
  },[])

  const handleLogout = () => {
    fetch('http://127.0.0.1:5555/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
     .then(response => {
        if (response.ok) {
          localStorage.removeItem('token');
          navigate('/', { replace: true });
        } else {
          throw new Error('Failed to log out');
        }
      })
     .catch(error => {
        console.error(`Error logging out: ${error}`);
        alert('Error logging out. Please try again.');
      });
  };

  return( 
    <div className="container">
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <h1>Quizzy</h1>
      <ul>
        <li>Home</li>
        {/* <li><Link to="/">Home</Link></li> */}
        <li onClick={handleLogout}>Logout</li>
        <li><Link to="create/quizzes">Create Quizzes</Link></li>
        <li><Link to="/about">About</Link></li>
        <li>Contact Us</li>
      </ul>
    </nav>
    </div>
  )
}

export default Navbar;