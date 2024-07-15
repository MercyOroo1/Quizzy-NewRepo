import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './SingleQuiz.css';
import { Link } from 'react-router-dom';

function SingleQuiz({ quiz, onUpdateQuiz, onDeleteQuiz }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpdateQuiz = () => {
    fetch(`http://127.0.0.1:5000/creator/quizzes/${quiz.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        title,
        description
      })
    })
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        if (response.status === 403){
          // throw new Error(`Access denied`)
          alert("Access denied")
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
      .then(data => {
        onUpdateQuiz(quiz.id, title, description);
        setIsEditing(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCancelEdit = () => {
    setTitle(quiz.title);
    setDescription(quiz.description);
    setIsEditing(false);
  };

  const handleDeleteQuiz = () => {
    if (window.confirm(`Are you sure you want to delete quiz "${quiz.title}"?`)) {
      fetch(`http://127.0.0.1:5000/creator/quizzes/${quiz.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          if (response.status === 403){
            alert('Access Denied')
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
        .then(data => {
          onDeleteQuiz(quiz.id);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div className='card-list'>
      <div className="card">
        <div className="card-body">
          <img src="https://d1ymz67w5raq8g.cloudfront.net/Pictures/1024x536/6/5/5/509655_shutterstock_1506580442_769367.jpg" alt="Quiz" className="card-img-top" />
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="form-control"
            />
          ) : (
            <h5 className="card-title">{title}</h5>
          )}
          {isEditing ? (
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="form-control"
            />
          ) : (
            <h6 className="card-subtitle mb-2 text-body-secondary">{description}</h6>
          )}
          <p className="card-text">Created At: {quiz.created_at}</p>
          <p className="card-text">Updated At: {quiz.updated_at}</p>
          {isEditing ? (
            <div>
              <button className='card-btn save-btn' onClick={handleUpdateQuiz}>Save</button>
              <button className='card-btn cancel-btn' onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <button className='card-btn edit-btn' onClick={() => setIsEditing(true)}>Edit</button>
              <button className='card-btn delete-btn' onClick={handleDeleteQuiz}>Delete</button>
              <Link to={`questions/${quiz.id}`}>
                <button className='card-btn'>Take quiz</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleQuiz;
