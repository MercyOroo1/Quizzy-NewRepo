import React from 'react';
import ResponseForm from '../responses/ResponseForm';
import './SingleQuestion.css'; // Import your CSS file
import { Link } from 'react-router-dom';

function SingleQuestion({ question, userId }) {
  console.log(question); // Consider removing in production
  return (
    <div className="single-question">
      <div className="question-text">
        <p>{question.question_text}</p>
      </div>
      <div className="choices">
        {question.choice_1 && <p className="choice">A. {question.choice_1}</p>}
        {question.choice_2 && <p className="choice">B. {question.choice_2}</p>}
        {question.choice_3 && <p className="choice">C. {question.choice_3}</p>}
        {question.choice_4 && <p className="choice">D. {question.choice_4}</p>}
      </div>
      
      <ResponseForm 
        question_id={question.id} 
        quiz_id={question.quiz_id} 
        user_id={userId} 
        className="response-form"
      />

     
    </div>
  );
}

export default SingleQuestion;
