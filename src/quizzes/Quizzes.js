import React, { useState, useEffect } from 'react';
import SingleQuiz from './SingleQuiz';
import './Quizzes.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Main from './components/main/main';
import Navbar from './components/navbar/navbar';
import Reviews from './components/reviews/reviews';

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


  console.log(updatedQuizzes)

  return (
    <div>
      <Navbar/>
      <Main/>
    <div className='quiz-list d-flex flex-wrap justify-content-center'>
      {updatedQuizzes.map(quiz => {
        if (quiz && quiz.id) { 
          return <SingleQuiz key={quiz.id} quiz={quiz} onUpdateQuiz={handleUpdateQuiz} onDeleteQuiz={handleDeleteQuiz}/>;
        } else {
          return null; 
        }
      })}
    </div>
    <Reviews/>
    </div>
  );
}

export default Quizzes;