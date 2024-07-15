import React, { useEffect, useState } from 'react';
import SingleReview from './SingleReview';

function Review({ reviews }) {
    const [fetchedReviews, setFetchedReviews] =useState ([])
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/creator/quizzes/${reviews.quiz_id}/reviews`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched reviews:', data);
        setFetchedReviews(data)
        // Handle the fetched data as needed
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (reviews.quiz_id) {
      fetchReviews();
    }
  }, [reviews.id]);
 console.log(fetchedReviews)
  return (
    <div>
         {fetchedReviews.map (review => (<SingleReview key = {review.id} review = {review}/> ))}
      </div>
  );
}

export default Review;
