import { Link } from 'react-router-dom';
import { MainTitle, QuizBackground } from './QuizList.styled';
import { quiz } from 'quiz';

const QuizList = () => {
  localStorage.setItem('quiz', JSON.stringify(quiz));

  const getQuiz = localStorage.getItem('quiz');
  const parsedQuiz = JSON.parse(getQuiz);

  const { quizName, questions } = parsedQuiz;

  return (
    <>
      <MainTitle>Quizes</MainTitle>

      <ul>
        <Link to={'/quiz'}>
          <li>
            <QuizBackground>
              <h3>{quizName}</h3>
              <p>Number of questions {questions.length}</p>
            </QuizBackground>
          </li>
        </Link>
      </ul>
    </>
  );
};

export default QuizList;
