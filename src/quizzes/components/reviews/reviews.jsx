import React, { useEffect, useRef, useState } from 'react'
import userProf from '../../../assets/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png'
import './reviews.css'


const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const slider = useRef();
    let tx = 0;

    const slideForward = () =>{
        if (tx > -50){
            tx -= 25;
            slider.current.style.transform = `translateX(${tx}%)`;
        }
    }

    const slideBackward = () =>{
        if (tx < 0){
            tx += 25;
            slider.current.style.transform = `translateX(${tx}%)`;
        }
    }
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const resp = await fetch('/participant/reviews', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if (!resp.ok) {
                    throw new Error('Failed to fetch quiz data')
                }

                const data = await resp.json();
                console.log(data);
                setReviews(data)
            }
            catch (error) {
                console.error(error)
            }
        };
        fetchQuizzes();
    }, [])
    return (
        <div className='reviews'>
            <h1>Reviews</h1>
            <div className="all-quizzes">
                <button className='next-button' onClick={slideForward}>Next</button>
                <button className='back-button' onClick={slideBackward}>Previous</button>
                <div className='slider'>
                    <ul ref={slider}>
                    {reviews.map((review) => {
                        return (
                                <li key={review.id}>
                                    <div key={review.id} className='slide'>
                                        <div className='user-info'>
                                            <img src={userProf} alt="pfp" />
                                            <h3>{review.review_text}</h3>
                                            <p>Rating: {review.rating}</p>
                                        </div>
                                    </div>
                                </li>
                        )
                    })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Reviews