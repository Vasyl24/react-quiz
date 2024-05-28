import { Link, useNavigate } from 'react-router-dom';
import {
  AddQuizLink,
  ButtonContainer,
  IconEdit,
  IconTrash,
  LinkEdit,
  MainTitle,
  QuizBackground,
  TrashBtn,
} from './QuizList.styled';
import { quiz } from 'quiz';
import { useEffect, useState } from 'react';
import icon from '../../assets/sprite.svg';

const QuizList = () => {
  const [initialQuiz, setInitialQuiz] = useState(null);
  // localStorage.setItem('quiz', JSON.stringify(quiz));
  const navigate = useNavigate();

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

  const handleDeleteItem = (e, itemId) => {
    e.stopPropagation();

    e.preventDefault();
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

  const handleEdit = (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    navigate(`/edit/${id}`);
  };

  return (
    <>
      <AddQuizLink to={'/add'}>Add New Quiz +</AddQuizLink>

      <MainTitle>Quizes</MainTitle>
      <ul>
        {initialQuiz.notices.map((notice, index) => (
          <li key={index} id={notice.id}>
            <Link to={`/quiz/${notice.id}`}>
              <QuizBackground>
                <div>
                  <h3>{notice.quizName}</h3>
                  <p>Number of questions {notice.questions.length}</p>
                </div>

                <ButtonContainer>
                  <LinkEdit
                    // to={`/edit/${notice.id}`}
                    onClick={e => {
                      handleEdit(e, notice.id);
                    }}
                  >
                    <IconEdit>
                      <use href={`${icon}#icon-edit`}></use>
                    </IconEdit>
                  </LinkEdit>

                  <TrashBtn onClick={e => handleDeleteItem(e, notice.id)}>
                    <IconTrash>
                      <use href={`${icon}#icon-trash`}></use>
                    </IconTrash>
                  </TrashBtn>
                </ButtonContainer>
              </QuizBackground>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default QuizList;
