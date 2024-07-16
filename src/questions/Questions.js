import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SingleQuestion from './SingleQuestion';
import './Questions.css';
import Review from '../reviews/Review';

function Questions({ userId }) {
  const params = useParams();
  const quizId = params.quizId;

  const [questions, setQuestions] = useState([]);
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (quizId) {
      fetch(`http://127.0.0.1:5555/participant/quizzes/${quizId}/questions`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
       .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
       .then(data => {
          setQuestions(data);
        })
       .catch(error => console.error('Error fetching questions:', error));
    }
  }, [quizId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5555/participant/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        rating: parseInt(rating),  // Assuming rating is a number
        review_text: reviewText,
        quiz_id: quizId
      }),
    })
     .then((r) => r.json())
     .then((newReview) => {
        setRating('');
        setReviewText('');
        console.log(newReview);
        setReviews(newReview)
      })
     .catch((error) => {
        console.error("Error creating review:", error);
      });
  }

  return (
    <div>
      <h2 className='header'>Questions for Quiz {quizId}</h2>
      <ul>
        {questions.map(question => <SingleQuestion key={question.id} question={question} userId={userId} />)}
      </ul>
      <div className='review-form'>
        <p>How would you rate this quiz on a scale of one to ten 🤔</p>
        <form onSubmit={handleSubmitReview}>
          <div>
            <label>
            <p>Rating:</p>
              <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="10" />
            </label>
          </div>
          <div>
          <label>
            <p>Review:</p>
            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
          </label>
          </div>
          <Link to='/quizzes'>
            <button className='back-btn'>Back</button>
          </Link>
          <button type="submit">Submit Review</button>
        </form>
      </div>
      <div>
        <Review reviews={reviews} />
      </div>
      
    </div>
  );
}

export default Questions;