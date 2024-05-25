import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
// import { Background } from './App.styled';
import QuizItem from './QuizItem/QuizItem';
import QuizList from './QuizList/QuizList';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<QuizList />} />

        <Route path="/quiz" element={<QuizItem />} />
      </Route>
    </Routes>
    // <Background>
    //   <QuizItem />
    // </Background>
  );
};
