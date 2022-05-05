import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutPage from './pages/AboutPage';

import FeedbackData from './data/FeedbackData';
import AboutIconLink from './components/AboutIconLink';

import Post from './components/Post';

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const addFeedback = (newFeedback) => {
    // give a unique id
    newFeedback.id = uuidv4();
    // cant push onto feedback, immutable, must use spread to recreate array
    setFeedback([newFeedback, ...feedback]);
    console.log('New feedback: ', newFeedback);
  };

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  return (
    <Router>
      <Header />
      <div className='container'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList
                  feedback={feedback}
                  handleDelete={deleteFeedback}
                />
              </>
            }
          />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/post/*' element={<Post />} />
        </Routes>
        <AboutIconLink />
      </div>
    </Router>
  );
}

export default App;
