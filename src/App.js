import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutPage from './pages/AboutPage';

import FeedbackData from './data/FeedbackData';

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const addFeedaback = (newFeedback) => {
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
        <Route exact path='/'>
          <FeedbackForm handleAdd={addFeedaback} />
          <FeedbackStats feedback={feedback} />
          <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
        </Route>
        <Route path='/about' component={AboutPage} />
      </div>
    </Router>
  );
}

export default App;
