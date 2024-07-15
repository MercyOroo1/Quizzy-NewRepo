import React from 'react';
import './SingleReview.css'

function SingleReview({ review }) {
  console.log(review);
  return (
    <div className="single-review-container">
      <p>
        <span className="rating">Rating: {review.rating}</span>
      </p>
      <p>
        <span className="review-text">Review_text: {review.review_text}</span>
      </p>
     
      <p>
        <span className="user-id">User_id: {review.user_id}</span>
      </p>
    </div>
  );
}

export default SingleReview;