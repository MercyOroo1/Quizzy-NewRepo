import React from 'react';
import Quiz from './Quiz';

function QuizPage({ quizzes, onRefresh }) {
  console.log(quizzes);
  const firstQuiz = quizzes.flat()[0]; // get the first quiz

  return (
    <div>
      {firstQuiz && firstQuiz.id ? (
        <Quiz key={firstQuiz.id} quiz={firstQuiz} onRefresh = {onRefresh}/>
      ) : (
        <p>No quizzes available</p> // or render a default component or message
      )}
    </div>
  );
}

export default QuizPage;