import { quiz } from 'quiz';

const QuizList = () => {
  localStorage.setItem('quiz', JSON.stringify(quiz));

  const questNum = localStorage.getItem('quiz');
  const parsedQuiz = JSON.parse(questNum);

  const { quizName, questions } = parsedQuiz;

  return (
    <>
      <h2>Quizes</h2>

      <ul>
        <li>
          <div>
            <h3>{}</h3>
            <p></p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default QuizList;
