import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import QuizItem from './QuizItem/QuizItem';
import QuizList from './QuizList/QuizList';
import AddQuiz from './AddQuiz/AddQuiz';
import { useState } from 'react';

export const App = () => {
  const [id, setId] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<QuizList id={id} setId={setId} />} />

        <Route path={`/:${id}`} element={<QuizItem id={id} />} />
        <Route path="/add" element={<AddQuiz />} />
      </Route>
    </Routes>
  );
};
