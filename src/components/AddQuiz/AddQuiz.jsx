import { useState } from 'react';
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
  QuizQuestion,
  QuizTitle,
  ResultTitle,
  SubmitBtn,
  Title,
} from './AddQuiz.styled';
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
      <ul>
        <InputItems>
          <form>
            <Label htmlFor="quiz-title">Quiz title</Label>
            <Input
              type="text"
              id="quiz-title"
              value={inputTitleValue}
              onChange={handleTitleWrite}
            />
            <SubmitBtn type="submit" onClick={addTitle}>
              Add title
            </SubmitBtn>
          </form>
        </InputItems>
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
        <QuizTitle>{quizForm.quizName}</QuizTitle>
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

      <ul>
        {quizForm.questions.map((question, index) => (
          <li key={index}>
            <QuizTitle>{quizForm.quizName}</QuizTitle>
            <QuestionNumber>
              Question <span>{question.questionNum + 1} </span>
              of
              <span> {quizForm.questions.length}</span>
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
                        disabled
                      />
                      <AnswerLabel htmlFor={`answer-${id}`}>
                        {answerItem}
                      </AnswerLabel>
                    </AnswerItem>
                  );
                })}
              </AnswerList>
              {quizForm.quizName !== '' && quizForm.questions.length >= 1 && (
                <SubmitBtn type="submit" onClick={addNewQuiz}>
                  Add quiz
                </SubmitBtn>
              )}
            </form>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddQuiz;
