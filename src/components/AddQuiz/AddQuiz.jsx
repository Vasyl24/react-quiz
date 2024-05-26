import { useState } from 'react';
import { QuizQuestion, QuizTitle, ResultTitle, Title } from './AddQuiz.styled';
import { nanoid } from 'nanoid';

const AddQuiz = () => {
  const [inputTitleValue, setInputTitleValue] = useState('');
  const [inputQuestionValue, setInputQuestionValue] = useState('');
  const [inputResponseValue, setInputResponseValue] = useState('');

  const [quizQuestion, setQuizQuestion] = useState({
    questionNum: 0,
    questionText: '',
    answList: [],
    rightAnswer: '',
  });

  const [quizForm, setquizForm] = useState({
    quizName: '',
    id: null,
    questions: [],
  });

  function handleTitleWrite(e) {
    setInputTitleValue(e.target.value);
  }

  function handleQuestionWrite(e) {
    setInputQuestionValue(e.target.value);
  }

  function handleResponseWrite(e) {
    setInputResponseValue(e.target.value);
  }

  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);

  function handleChooseAnswer(e) {
    setIsAnswered(true);
    setUserAnswer(e.target.value);
  }

  function addTitle(e) {
    e.preventDefault();

    setquizForm({ ...quizForm, quizName: inputTitleValue });

    setInputTitleValue('');
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

  function addQuestionForm(e) {
    e.preventDefault();

    setIsAnswered(false);

    quizForm.questions.push(quizQuestion);
    quizQuestion.rightAnswer = userAnswer;

    setQuizQuestion({
      ...quizQuestion,
      questionNum: quizQuestion.questionNum + 1,
      questionText: '',
      answList: [],
      rightAnswer: '',
    });
  }
  const currentLocalStorage = localStorage.getItem('quiz');
  const currentQuiz = JSON.parse(currentLocalStorage);
  currentQuiz.notices.push(quizForm);

  function addNewQuiz(e) {
    e.preventDefault();
    quizForm.id = nanoid();
    console.log(quizForm.id);
    localStorage.setItem('quiz', JSON.stringify(currentQuiz));
  }

  return (
    <>
      <Title>Create quiz</Title>
      <form>
        <label htmlFor="quiz-title">Quiz title</label>
        <input
          type="text"
          id="quiz-title"
          value={inputTitleValue}
          onChange={handleTitleWrite}
        />
        <button type="submit" onClick={addTitle}>
          Add title
        </button>
      </form>

      <form action="">
        <label htmlFor="quiz-question">Question</label>
        <input
          type="text"
          id="quiz-question"
          value={inputQuestionValue}
          onChange={handleQuestionWrite}
        />

        <button type="submit" onClick={addQuestion}>
          Add question
        </button>
      </form>

      <form action="">
        <label htmlFor="quiz-response">Response</label>
        <input
          type="text"
          id="quiz-response"
          value={inputResponseValue}
          onChange={handleResponseWrite}
        />

        <button
          type="submit"
          onClick={addResponse}
          disabled={quizQuestion.answList.length === 5}
        >
          Add response
        </button>
      </form>

      <ResultTitle>Previous quiz view</ResultTitle>

      <form>
        {/* <QuizTitle>{quizForm.quizName}</QuizTitle> */}
        <QuizQuestion>{quizQuestion.questionText}</QuizQuestion>

        <ul>
          {quizQuestion.answList.map((answer, index) => {
            const id = `answer-${nanoid()}`;

            return (
              <li key={index}>
                <input
                  type="radio"
                  id={`answer-${id}`}
                  name="answer"
                  value={answer}
                  onChange={handleChooseAnswer}
                />
                <label htmlFor={`answer-${id}`}>{answer}</label>
              </li>
            );
          })}
        </ul>

        {quizQuestion.questionText &&
          quizQuestion.answList.length >= 2 &&
          isAnswered && (
            <button type="submit" onClick={addQuestionForm}>
              Confirm
            </button>
          )}
      </form>

      <ul>
        {quizForm.questions.map((question, index) => (
          <li key={index}>
            <QuizTitle>{quizForm.quizName}</QuizTitle>
            <h3>
              Question <span>{question.questionNum + 1} </span>
              of
              <span> {quizForm.questions.length}</span>
            </h3>
            <p>{question.questionText}</p>
            <form>
              <ul>
                {question.answList.map((answerItem, idx) => {
                  const id = `answer-${nanoid()}`;

                  return (
                    <li key={idx}>
                      <input
                        type="radio"
                        name="answer"
                        id={`answer-${id}`}
                        disabled
                      />
                      <label htmlFor={`answer-${id}`}>{answerItem}</label>
                    </li>
                  );
                })}
              </ul>
              {quizForm.quizName !== '' && quizForm.questions.length >= 1 && (
                <button type="submit" onClick={addNewQuiz}>
                  Add quiz
                </button>
              )}
            </form>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddQuiz;
