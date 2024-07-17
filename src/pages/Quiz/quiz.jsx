import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './quiz.css';

const Quiz = ({quizzes}) => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let OptArr = [Option1, Option2, Option3, Option4]

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const resp = await fetch(`/participant/quizzes/${id}`);
                if (!resp.ok) {
                    throw new Error('Failed to fetch quiz data');
                }
                const data = await resp.json();
                console.log(quizzes);
                setQuiz(quizzes); // Assuming data is the entire quiz object
                setQuestions(quizzes.questions); // Assuming data.questions is an array of questions
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleNextQuestion = () => {
        if(lock === true) {
            if (currentQuestionIndex === questions.length - 1) {
                setResult(true);
                return;
            }
            setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
            setLock(false);
            OptArr.forEach(option => option.current.classList.remove("correct", "incorrect"));
        }
    };


    const handleAnswer = (e, ans) => {
        if (lock === false) {
            const correctAnswerIndex = questions[currentQuestionIndex].answer - 1; // Assuming answers are 1-based in your data
            if (correctAnswerIndex === ans - 1) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("incorrect");
                setLock(true);
                OptArr[correctAnswerIndex].current.classList.add("correct");
            }
        }
    };
    

    if (!quiz || questions.length === 0) {
        return <h1>Loading...</h1>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    const totalQuestions = questions.length;

    return (
        <div className="quiz-container">
            <h2>{quiz.title}</h2>
            <hr/>
            {result?<>
                <div className="score">
                <p>Score: {score}/{totalQuestions}</p>
                <button>
                <Link to={"/"}>Go Back Home</Link>
                </button>
            </div>
            </>:<>
            <p>{currentQuestion.question_text}</p>
            <div className="choices">
                <ul>
                    <li ref={Option1} onClick={(e)=> {handleAnswer(e,1)}}>{currentQuestion.choice_1}</li>
                    <li ref={Option2} onClick={(e)=> {handleAnswer(e,2)}}>{currentQuestion.choice_2}</li>
                    <li ref={Option3} onClick={(e)=> {handleAnswer(e,3)}}>{currentQuestion.choice_3}</li>
                    <li ref={Option4} onClick={(e)=> {handleAnswer(e,4)}}>{currentQuestion.choice_4}</li>
                </ul> 
            </div>

            <div className="controls">
                {currentQuestionIndex < questions.length -1 &&(
                <button disabled={currentQuestionIndex === questions.length - 1} onClick={handleNextQuestion}>
                    Next
                </button>
                )}
            </div>
            {currentQuestionIndex === questions.length -1 &&(
                <div className='submit-button'>
                    <button onClick={handleNextQuestion}>Submit</button>
                </div>
            )}
            <div className="tally">
            <p>{`${questionNumber} of ${totalQuestions} questions`}</p>
            </div>
            </>}
        </div>
    );
};

export default Quiz;
