import { nanoid } from 'nanoid';
import {
  AnswerInput,
  AnswerItem,
  AnswerLabel,
  AnswerList,
  Input,
  InputItems,
  Label,
  QuestionNumber,
  QuestionText,
  QuizBackground,
  QuizQuestion,
  QuizTitle,
  ResultTitle,
  SubmitBtn,
} from './QuizEdit.styled';
import { useEffect, useState } from 'react';
import { quiz } from 'quiz';
import { useParams } from 'react-router-dom';

const QuizEdit = () => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [initialQuiz, setInitialQuiz] = useState(null);

  ////

  const [inputQuestionValue, setInputQuestionValue] = useState('');
  const [inputResponseValue, setInputResponseValue] = useState('');

  const [quizQuestion, setQuizQuestion] = useState({
    questionNum: 0,
    questionText: '',
    answList: [],
    rightAnswer: '',
  });

  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);

  ////

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

  ////

  function handleQuestionWrite(e) {
    setInputQuestionValue(e.target.value);
  }

  function handleResponseWrite(e) {
    setInputResponseValue(e.target.value);
  }

  function handleChooseAnswer(e) {
    setIsAnswered(true);
    setUserAnswer(e.target.value);
  }

  function addQuestion(e) {
    e.preventDefault();

    setQuizQuestion({
      ...quizQuestion,
      questionText: inputQuestionValue,
    });

    setInputQuestionValue('');
  }

  function addResponse(e) {
    e.preventDefault();

    if (quizQuestion.answList.length < 5) {
      quizQuestion.answList.push(inputResponseValue);
    }

    setInputResponseValue('');
  }

  const lastQuestionNumber = notice.questions.length - 1;

  function addQuestionForm(e) {
    e.preventDefault();

    setIsAnswered(false);

    quizQuestion.rightAnswer = userAnswer;
    quizQuestion.questionNum = lastQuestionNumber + 1;

    notice.questions.push(quizQuestion);

    const updatedNotice = {
      ...notice,
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

    setQuizQuestion({
      ...quizQuestion,
      questionNum: 0,
      questionText: '',
      answList: [],
      rightAnswer: '',
    });
  }

  return (
    <>
      <button
        onClick={() => {
          setShowDeleteBtn(false);
          setShowAddForm(true);
        }}
      >
        Add question
      </button>
      <button
        onClick={() => {
          setShowAddForm(false);
          setShowDeleteBtn(true);
        }}
      >
        Delete question
      </button>

      {showAddForm && (
        <>
          <ul>
            <InputItems>
              <form action="">
                <Label htmlFor="quiz-question">Question</Label>
                <Input
                  type="text"
                  id="quiz-question"
                  value={inputQuestionValue}
                  onChange={handleQuestionWrite}
                />

                <SubmitBtn type="submit" onClick={addQuestion}>
                  Add question
                </SubmitBtn>
              </form>
            </InputItems>

            <InputItems>
              <form action="">
                <Label htmlFor="quiz-response">Response</Label>
                <Input
                  type="text"
                  id="quiz-response"
                  value={inputResponseValue}
                  onChange={handleResponseWrite}
                />

                <SubmitBtn
                  type="submit"
                  onClick={addResponse}
                  disabled={quizQuestion.answList.length === 5}
                >
                  Add response
                </SubmitBtn>
              </form>
            </InputItems>
          </ul>
          <ResultTitle>Previous quiz view</ResultTitle>

          <form>
            <QuizQuestion>{quizQuestion.questionText}</QuizQuestion>

            <AnswerList>
              {quizQuestion.answList.map((answer, index) => {
                const id = `answer-${nanoid()}`;

                return (
                  <AnswerItem key={index}>
                    <AnswerInput
                      type="radio"
                      id={`answer-${id}`}
                      name="answer"
                      value={answer}
                      onChange={handleChooseAnswer}
                    />
                    <AnswerLabel htmlFor={`answer-${id}`}>{answer}</AnswerLabel>
                  </AnswerItem>
                );
              })}
            </AnswerList>

            {quizQuestion.questionText &&
              quizQuestion.answList.length >= 2 &&
              isAnswered && (
                <SubmitBtn type="submit" onClick={addQuestionForm}>
                  Confirm
                </SubmitBtn>
              )}
          </form>
        </>
      )}

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
