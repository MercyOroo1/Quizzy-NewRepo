import React, { useState, useEffect } from 'react';
import SingleQuiz from './SingleQuiz';
import './Quizzes.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Quizzes({ quizzes }) {
  const [updatedQuizzes, setUpdatedQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (quizzes) {
      setUpdatedQuizzes(quizzes);
    }
  }, [quizzes]);

  const handleUpdateQuiz = (quizId, newTitle, newDescription) => {
    setUpdatedQuizzes(updatedQuizzes => updatedQuizzes.map(quiz =>
      quiz.id === quizId? {...quiz, title: newTitle, description: newDescription } : quiz
    ));
  };

  const handleDeleteQuiz = (quizId) => {
    setUpdatedQuizzes(updatedQuizzes => updatedQuizzes.filter(quiz => quiz.id!== quizId));
  };

  const handleLogout = () => {
    fetch('http://127.0.0.1:5000/logout', {
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

  console.log(updatedQuizzes)

  return (
    <div>
      <div className='top-buttons'>
      <Link to='create/quizzes'>
        <button>Create Quizzes</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>

      </div>
    <div className='quiz-list d-flex flex-wrap justify-content-center'>
      {updatedQuizzes.map(quiz => {
        if (quiz && quiz.id) { 
          return <SingleQuiz key={quiz.id} quiz={quiz} onUpdateQuiz={handleUpdateQuiz} onDeleteQuiz={handleDeleteQuiz}/>;
        } else {
          return null; 
        }
      })}
    </div>
    </div>
  );
}

export default Quizzes;