// import { Route, Routes } from 'react-router-dom';
// import Layout from './Layout/Layout';
import { Background } from './App.styled';
import QuizItem from './QuizItem/QuizItem';

export const App = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<Layout />}>
    //     <Route element={<QuizItem />} />
    //   </Route>
    // </Routes>
    <Background>
      <QuizItem />
    </Background>
  );
};
