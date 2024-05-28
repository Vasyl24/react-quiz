import { nanoid } from 'nanoid';
import {
  AnswerInput,
  AnswerItem,
  AnswerLabel,
  AnswerList,
  QuestionNumber,
  QuestionText,
  QuizBackground,
  QuizTitle,
} from './QuizEdit.styled';
import { useEffect, useState } from 'react';
import { quiz } from 'quiz';
import { useParams } from 'react-router-dom';

const QuizEdit = () => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [initialQuiz, setInitialQuiz] = useState(null);

  const { quizId } = useParams();

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

  const storedQuiz = localStorage.getItem('quiz');

  const parsedQuiz = JSON.parse(storedQuiz);

  const notice = parsedQuiz.notices.find(notice => notice.id === quizId);

  const quizComponents = parsedQuiz.notices;

  function handleDeleteQuestion(e) {
    const questionToDelete = e.target.id;

    const idxToDelete = notice.questions.findIndex(
      question => question.questionNum === Number(questionToDelete)
    );

    if (idxToDelete === -1) {
      return;
    }

    let updatedQuestions = notice.questions.filter(
      (question, index) => index !== idxToDelete
    );

    updatedQuestions = updatedQuestions.map((question, index) => ({
      ...question,
      questionNum: index,
    }));

    const updatedNotice = {
      ...notice,
      questions: updatedQuestions,
    };

    const idxToChange = initialQuiz.notices.findIndex(
      idx => idx.id === notice.id
    );

    if (idxToChange === -1) {
      return;
    }

    const updatedNotices = [
      ...initialQuiz.notices.slice(0, idxToChange),
      updatedNotice,
      ...initialQuiz.notices.slice(idxToChange + 1),
    ];

    const updatedQuiz = {
      ...initialQuiz,
      notices: updatedNotices,
    };

    localStorage.setItem('quiz', JSON.stringify(updatedQuiz));

    setInitialQuiz(updatedQuiz);
  }

  return (
    <>
      <button>Add question</button>
      <button onClick={() => setShowDeleteBtn(true)}>Delete question</button>

      {quizComponents.map(
        quizComponent =>
          quizComponent.id === quizId &&
          notice.questions.map((question, index) => (
            <QuizBackground key={index}>
              <QuizTitle>{notice.quizName}</QuizTitle>
              <QuestionNumber>
                Question <span>{question.questionNum + 1} </span>
                of
                <span> {notice.questions.length}</span>
              </QuestionNumber>
              <QuestionText>{question.questionText}</QuestionText>
              <form>
                <AnswerList>
                  {question.answList.map((answerItem, idx) => {
                    const id = `answer-${nanoid()}`;

                    return (
                      <AnswerItem key={idx}>
                        <AnswerInput
                          type="radio"
                          name="answer"
                          id={`answer-${id}`}
                          value={answerItem}
                          checked={question.rightAnswer === answerItem}
                          disabled
                          readOnly
                        />
                        <AnswerLabel htmlFor={`answer-${id}`}>
                          {answerItem}
                        </AnswerLabel>
                      </AnswerItem>
                    );
                  })}
                </AnswerList>
              </form>

              {showDeleteBtn && (
                <button
                  id={question.questionNum}
                  onClick={e => handleDeleteQuestion(e)}
                >
                  Delete
                </button>
              )}
            </QuizBackground>
          ))
      )}
    </>
  );
};

export default QuizEdit;
