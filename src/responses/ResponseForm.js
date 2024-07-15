import React, { useState } from 'react';
import Response from './Response';
// import './ResponseForm.css';

const ResponseForm = ({ question_id, quiz_id, user_id }) => {
  const [response, setResponse] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Response submitted:', response);

    fetch('http://localhost:5000/participant/responses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({ 
        response: response, 
        question_id: question_id, 
        quiz_id: quiz_id, 
        user_id: user_id 
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response created:', data);
      setIsSubmitted(true);
      setData(data);
    })
    .catch(error => {
      console.error('Error creating response:', error);
      setError('There was an error submitting your response. Please try again.');
    });
  };

  return (
    <div className="response-form-container">
      <form onSubmit={handleSubmit}>
        {/* <label className="response-form-label">Enter your response:</label> */}
        <input
          type="text"
          value={response}
          onChange={(event) => setResponse(event.target.value)}
          placeholder="Type your response here"
          className="response-form-input"
        />
        <button type="submit" className="response-form-button">Submit</button>
      </form>
      {isSubmitted && data && <div className="response-message"><Response response={response} data={data} /></div>}
      {error && <div className="response-error">{error}</div>}
    </div>
  );
};

export default ResponseForm;
