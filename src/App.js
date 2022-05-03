import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';

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
    <>
      <Header />
      <div className='container'>
        <FeedbackForm handleAdd={addFeedaback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  );
}

export default App;
