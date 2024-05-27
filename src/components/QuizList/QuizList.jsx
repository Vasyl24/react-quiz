import { Link } from 'react-router-dom';
import { AddQuizLink, MainTitle, QuizBackground } from './QuizList.styled';
import { quiz } from 'quiz';
import { useEffect, useState } from 'react';

const QuizList = ({ setId }) => {
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

  const handleSetId = id => {
    setId(id);
  };

  const handleDeleteItem = itemId => {
    setId(itemId);

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

    const updatedQuiz = { ...initialQuiz, notices: updatedNotices };

    localStorage.setItem('quiz', JSON.stringify(updatedQuiz));

    setInitialQuiz(updatedQuiz);
  };
  // const getQuiz = localStorage.getItem('quiz');
  // const parsedQuiz = JSON.parse(getQuiz);
  // console.log(initialQuiz);
  // const { notices } = parsedQuiz;

  return (
    <>
      <MainTitle>Quizes</MainTitle>
      <AddQuizLink to={'/add'}>Add Quiz +</AddQuizLink>
      <ul>
        {initialQuiz.notices.map((notice, index) => (
          <li key={index} id={notice.id}>
            <Link
              to={`/:${notice.id}`}
              onClick={() => handleSetId(notice.id)}
              id={notice.id}
            >
              <QuizBackground>
                <h3>{notice.quizName}</h3>
                <p>Number of questions {notice.questions.length}</p>
              </QuizBackground>
            </Link>
            <button onClick={() => handleDeleteItem(notice.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default QuizList;
