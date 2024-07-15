import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AddQuestions.css'; // Import your CSS file

function AddQuestions() {
  const { quizId } = useParams();
  const [text, setText] = useState('');
  const [choice_1, setChoice_1] = useState('');
  const [choice_2, setChoice_2] = useState('');
  const [choice_3, setChoice_3] = useState('');
  const [choice_4, setChoice_4] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleSubmitQuestion(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    fetch("http://127.0.0.1:5000/creator/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        text: text,
        choice_1: choice_1,
        choice_2: choice_2,
        choice_3: choice_3,
        choice_4: choice_4,
        answer: answer,
        quiz_id: quizId
      }),
    })
      .then((r) => r.json())
      .then((newQuestion) => {
          setText('');
          setChoice_1('');
          setChoice_2('');
          setChoice_3('');
          setChoice_4('');
          setAnswer('');
          setLoading(false);
          console.log(newQuestion)
      })
      .catch((error) => {
        console.error("Error creating question:", error);
        setError("Failed to create question. Please try again.");
        setLoading(false);
      });
  }

  return (
    <div className="new-question-form">
      <h2 className="form-title">Add Questions for Quiz {quizId}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmitQuestion}>
        <input
          type="text"
          className="input-field"
          name="text"
          placeholder="Question text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          className="input-field"
          name="choice_1"
          placeholder="Choice 1"
          value={choice_1}
          onChange={(e) => setChoice_1(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          className="input-field"
          name="choice_2"
          placeholder="Choice 2"
          value={choice_2}
          onChange={(e) => setChoice_2(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          className="input-field"
          name="choice_3"
          placeholder="Choice 3"
          value={choice_3}
          onChange={(e) => setChoice_3(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          className="input-field"
          name="choice_4"
          placeholder="Choice 4"
          value={choice_4}
          onChange={(e) => setChoice_4(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          className="input-field"
          name="answer"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Adding...' : 'Add Question'}
        </button>
      </form>
      <Link to="/quizzes" className="back-link">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
}

export default AddQuestions;
