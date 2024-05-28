import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import QuizItem from './QuizItem/QuizItem';
import QuizList from './QuizList/QuizList';
import AddQuiz from './AddQuiz/AddQuiz';
import QuizEdit from './QuizEdit/QuizEdit';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<QuizList />} />

        <Route path="/quiz/:quizId" element={<QuizItem />} />
        <Route path="add" element={<AddQuiz />} />
        <Route path="/edit/:quizId" element={<QuizEdit />} />
      </Route>
    </Routes>
  );
};
