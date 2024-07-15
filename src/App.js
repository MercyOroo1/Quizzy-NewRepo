import './App.css';
import Login from './pages/Login/Login';
import useFetch from './useFetch';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quizzes from './quizzes/Quizzes';
import Questions from './questions/Questions';
import axios from 'axios';
import { useState, useEffect } from 'react';
import QuizForm from './quizzes/QuizForm';
import QuizPage from './quizzes/QuizPage';
import SingleQuestion from './questions/SingleQuestion';
import SingleQuiz from './quizzes/SingleQuiz';
import AddQuestions from './questions/AddQuestions';

function App() {
  const [userId, setUserId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Get user ID from backend API
    axios.get('/api/user')
     .then(response => {
        setUserId(response.data.id);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  const { data, errors } = useFetch("http://127.0.0.1:5555/participant/quizzes", null, refresh)

  console.log(data, errors)

  const handleRefresh = () => {
    setRefresh(!refresh);
  }


   
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/quizzes' element={<Quizzes quizzes={data} userId={userId} />} />
          <Route path='quizzes/questions/:quizId' element={<Questions quizzes={data} userId={userId} />} />
          <Route path= 'quizzes/create/quizzes' element = {<QuizPage quizzes = {data} onRefresh={handleRefresh} />}/>
          <Route path="/add-questions/:quizId" element={<AddQuestions/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;