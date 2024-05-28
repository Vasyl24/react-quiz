import { Link } from 'react-router-dom';
import { AddQuizLink, MainTitle, QuizBackground } from './QuizList.styled';
import { quiz } from 'quiz';
import { useEffect, useState } from 'react';

const QuizList = () => {
  const [initialQuiz, setInitialQuiz] = useState(null);
  // localStorage.setItem('quiz', JSON.stringify(quiz));

  useEffect(() => {
    const storedQuiz = localStorage.getItem('quiz');

    if (storedQuiz) {
      setInitialQuiz(JSON.parse(storedQuiz));
    } else {
      localStorage.setItem('quiz', JSON.stringify(quiz));
      setInitialQuiz(quiz);
    }
  }, []);

  if (!initialQuiz) {
    return <div>Loading...</div>;
  }

  const handleDeleteItem = itemId => {
    const idxToDelete = initialQuiz.notices.findIndex(
      notice => notice.id === itemId
    );

    if (idxToDelete === -1) {
      return;
    }

    const updatedNotices = [
      ...initialQuiz.notices.slice(0, idxToDelete),
      ...initialQuiz.notices.slice(idxToDelete + 1),
    ];

    const updatedQuizList = { ...initialQuiz, notices: updatedNotices };

    localStorage.setItem('quiz', JSON.stringify(updatedQuizList));

    setInitialQuiz(updatedQuizList);
  };

  return (
    <>
      <MainTitle>Quizes</MainTitle>
      <AddQuizLink to={'/add'}>Add Quiz +</AddQuizLink>
      <ul>
        {initialQuiz.notices.map((notice, index) => (
          <li key={index} id={notice.id}>
            <Link to={`/quiz/${notice.id}`}>
              <QuizBackground>
                <h3>{notice.quizName}</h3>
                <p>Number of questions {notice.questions.length}</p>
              </QuizBackground>
            </Link>

            <button onClick={() => handleDeleteItem(notice.id)}>Delete</button>
            <Link to={`/edit/${notice.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default QuizList;
