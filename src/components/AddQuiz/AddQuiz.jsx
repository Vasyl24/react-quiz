import { useState } from 'react';
import {
  AddQuestionContainer,
  AnswerInput,
  AnswerItem,
  AnswerLabel,
  AnswerList,
  HomeLink,
  Input,
  InputItems,
  InputList,
  Label,
  QuestionNumber,
  QuestionText,
  QuizItem,
  QuizQuestion,
  QuizTitle,
  ResultContainer,
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

    localStorage.setItem('quiz', JSON.stringify(currentQuiz));
  }

  return (
    <>
      <HomeLink to={'/'}>Go home</HomeLink>

      <Title>Create quiz</Title>
      <AddQuestionContainer>
        <InputList>
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
        </InputList>

        <ResultContainer>
          <ResultTitle>Previous quiz view</ResultTitle>

          <QuizTitle>Quiz Title: {quizForm.quizName}</QuizTitle>
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
        </ResultContainer>
      </AddQuestionContainer>

      <ul>
        {quizForm.questions.map((question, index) => (
          <QuizItem key={index}>
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
                        checked={answerItem}
                        disabled
                      />
                      <AnswerLabel htmlFor={`answer-${id}`}>
                        {answerItem}
                      </AnswerLabel>
                    </AnswerItem>
                  );
                })}
              </AnswerList>
            </form>
          </QuizItem>
        ))}

        {quizForm.quizName !== '' && quizForm.questions.length >= 1 && (
          <SubmitBtn type="submit" onClick={addNewQuiz} className="last-btn">
            Add quiz
          </SubmitBtn>
        )}
      </ul>
    </>
  );
};

export default AddQuiz;
