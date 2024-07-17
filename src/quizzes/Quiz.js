import React, { useState } from 'react';
import QuizForm from './QuizForm';
import UpdateQuiz from './UpdateQuiz';

function QuizN({onRefresh}) {
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState({ title: '', description: '' });

  const handleAddQuiz = (newQuiz) => {
    const updatedQuizzesArray = [...quizzes, newQuiz];
    setQuizzes(updatedQuizzesArray);
    setQuiz({ title: '', description: '' });
  };

  // const handleUpdateQuiz = (updatedQuiz) => {
  //   const updatedQuizzesArray = quizzes.map(quiz => {
  //     if (quiz.id === updatedQuiz.id) return updatedQuiz
  //     else return quiz;  
  //   });
  //   setQuiz(updatedQuizzesArray);
  // }

  return (
    <div>
      <QuizForm onAddQuiz={handleAddQuiz} quiz={quiz} setQuiz={setQuiz} onRefresh = {onRefresh} />
          <ul>
        {quizzes.map((quiz, index) => (
          <li key={index}>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizN;