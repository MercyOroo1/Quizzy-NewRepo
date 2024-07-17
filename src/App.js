import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useFetch from './useFetch';
import Login from './pages/Login/Login';
import Quizzes from './quizzes/Quizzes';
import Questions from './questions/Questions';
import QuizPage from './quizzes/QuizPage';
import AddQuestions from './questions/AddQuestions';
import About from './quizzes/components/about/About';
import Navbar from './quizzes/components/navbar/Navbar';
import Home from './quizzes/Quizzes';


function App() {
  const [userId, setUserId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { data, errors } = useFetch('http://127.0.0.1:5555/participant/quizzes', null, refresh);

  useEffect(() => {
    // Simulate user login or fetch user ID from backend
    axios.get('/api/user')
      .then(response => {
        setUserId(response.data.id);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleRefresh = () => {
    setRefresh(prevRefresh => !prevRefresh);
  };

  return (
    <div className="App">
      <Router>
        <Navbar /> {/* Navbar rendered globally */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/quizzes" element={<Home quizzes={data} userId={userId} />} />
          <Route path="/quizzes" element={<Quizzes quizzes={data} userId={userId} />} />
          <Route path="/quizzes/questions/:quizId" element={<Questions quizzes={data} userId={userId} />} />
          <Route path="/quizzes/create/quizzes" element={<QuizPage quizzes={data} onRefresh={handleRefresh} />} />
          <Route path="/add-questions/:quizId" element={<AddQuestions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
