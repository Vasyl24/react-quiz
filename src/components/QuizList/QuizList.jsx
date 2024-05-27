import { Link } from 'react-router-dom';
import { AddQuizLink, MainTitle, QuizBackground } from './QuizList.styled';
import { quiz } from 'quiz';

const QuizList = ({ setId }) => {
  localStorage.setItem('quiz', JSON.stringify(quiz));

  const getQuiz = localStorage.getItem('quiz');
  const parsedQuiz = JSON.parse(getQuiz);

  const { notices } = parsedQuiz;

  return (
    <>
      <MainTitle>Quizes</MainTitle>
      <AddQuizLink to={'/add'}>Add Quiz +</AddQuizLink>
      <ul>
        {notices.map((notice, index) => (
          <li key={index} id={notice.id}>
            <Link
              to={'/quiz'}
              onClick={e => {
                setId(e.currentTarget.id);
                console.log(e.currentTarget.id);
              }}
              id={notice.id}
            >
              <QuizBackground>
                <h3>{notice.quizName}</h3>
                <p>Number of questions {notice.questions.length}</p>
              </QuizBackground>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default QuizList;
