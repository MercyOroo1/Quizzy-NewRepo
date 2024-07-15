import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './QuizForm.css'; // Import your CSS file

function QuizForm({ onAddQuiz, onRefresh }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoadingQuiz(true);
    setError('');
    fetch("http://127.0.0.1:5000/creator/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          if (response.status === 403){
            throw new Error(`Access denied`)
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((newQuiz) => {
        console.log("New quiz created:", newQuiz);
        onAddQuiz(newQuiz);
        setTitle('');
        setDescription('');
        onRefresh();
        navigate(`/add-questions/${newQuiz.id}`); // Redirect to AddQuestions page with quiz
        setLoadingQuiz(false);
      })
      .catch((error) => {
        console.error("Error creating quiz:", error);
        setError(`Failed to create quiz. Error: ${error.message}`);
        setLoadingQuiz(false);
      });
  }

  return (
    <div className="new-quiz-form">
      <h2 className="form-title">New Quiz</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          name="title"
          placeholder="Quiz title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loadingQuiz}
        />
        <input
          type="text"
          className="input-field"
          name="description"
          placeholder="Quiz description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loadingQuiz}
        />
        <button type="submit" className="submit-button" disabled={loadingQuiz}>
          {loadingQuiz ? 'Adding...' : 'Add Quiz'}
        </button>
      </form>
      <Link to="/quizzes" className="back-link">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
}

export default QuizForm;
