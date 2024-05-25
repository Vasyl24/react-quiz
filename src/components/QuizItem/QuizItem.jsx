import { useEffect, useState } from 'react';
import {
  AnswerInput,
  AnswerItem,
  AnswerLabel,
  AnswerList,
  NextBtn,
  QuestionNumber,
  QuestionText,
  QuizBackground,
  QuizTitle,
} from './QuizItem.styled';
import Result from 'components/Result/Result';
import { nanoid } from 'nanoid';
import { quiz } from 'quiz';

const QuizItem = () => {
  // const quiz = {
  //   quizName: 'React Quiz',
  //   id: 1,
  //   questions: [
  //     {
  //       questionNum: 0,
  //       questionText: 'Which planet is known as the Red Planet?',
  //       answList: ['Earth', 'Mars', 'Venus', 'Jupiter'],
  //       rightAnswer: 'Mars',
  //     },
  //     {
  //       questionNum: 1,
  //       questionText: 'What is the capital of France?',
  //       answList: ['Madrid', 'Berlin', 'Paris', 'Rome'],
  //       rightAnswer: 'Paris',
  //     },
  //     {
  //       questionNum: 2,
  //       questionText: 'Who wrote "Romeo and Juliet"?',
  //       answList: [
  //         'Charles Dickens',
  //         'William Shakespeare',
  //         'Jane Austen',
  //         'Mark Twain',
  //       ],
  //       rightAnswer: 'William Shakespeare',
  //     },
  //     {
  //       questionNum: 3,
  //       questionText: 'What is the largest ocean on Earth?',
  //       answList: [
  //         'Atlantic Ocean',
  //         'Indian Ocean',
  //         'Arctic Ocean',
  //         'Pacific Ocean',
  //       ],
  //       rightAnswer: 'Pacific Ocean',
  //     },
  //     {
  //       questionNum: 4,
  //       questionText: 'Which element has the chemical symbol "O"?',
  //       answList: ['Gold', 'Oxygen', 'Hydrogen', 'Helium'],
  //       rightAnswer: 'Oxygen',
  //     },
  //     {
  //       questionNum: 5,
  //       questionText: 'In which year did the Titanic sink?',
  //       answList: ['1910', '1912', '1914', '1916'],
  //       rightAnswer: '1912',
  //     },
  //   ],
  // };

  const [isAnswered, setIsAnswered] = useState(false);
  const [showModal, setShowModal] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [allAnswers, setAllAnswers] = useState([]);
  const [rightAnswersNum, setRightAnswersNum] = useState(0);

  localStorage.setItem('quiz', JSON.stringify(quiz));

  const questNum = localStorage.getItem('quiz');
  const parsedQuiz = JSON.parse(questNum);

  const { quizName, questions } = parsedQuiz;
  const isLastQuestion = showModal === questions.length - 1;
  const rightAnswers = [];

  questions.map(question => rightAnswers.push(question.rightAnswer));

  function handleChooseAnswer(e) {
    setIsAnswered(true);
    setUserAnswer(e.target.value);
  }

  function chooseAnswer() {
    const newAnswers = [...allAnswers, userAnswer];

    setAllAnswers(newAnswers);
    localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));

    setShowModal(showModal + 1);
    setIsAnswered(false);

    let correctCount = 0;

    if (localStorage.getItem('quizAnswers')) {
      const givenAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
      const answers = [...givenAnswers];

      for (let i = 0; i < rightAnswers.length; i += 1) {
        if (rightAnswers[i] === answers[i]) {
          correctCount += 1;
        }
      }
    }

    setRightAnswersNum(correctCount);
  }

  useEffect(() => {
    const handleBeforeUnload = event => {
      event.preventDefault();

      localStorage.removeItem('quizAnswers');
      console.log(localStorage.getItem('quizAnswers'));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {questions.map((question, index) =>
        showModal === question.questionNum ? (
          <QuizBackground key={index}>
            <QuizTitle>{quizName}</QuizTitle>
            <QuestionNumber>
              Question <span>{question.questionNum + 1} </span>
              of
              <span> {questions.length}</span>
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
                        onChange={handleChooseAnswer}
                      />
                      <AnswerLabel htmlFor={`answer-${id}`}>
                        {answerItem}
                      </AnswerLabel>
                    </AnswerItem>
                  );
                })}
              </AnswerList>
            </form>

            {isLastQuestion ? (
              <NextBtn
                type="button"
                onClick={chooseAnswer}
                disabled={!isAnswered}
              >
                Finish
              </NextBtn>
            ) : (
              <NextBtn
                type="button"
                onClick={chooseAnswer}
                disabled={!isAnswered}
              >
                Next
              </NextBtn>
            )}
          </QuizBackground>
        ) : null
      )}

      {showModal > questions.length - 1 && (
        <Result rightAnswersNum={rightAnswersNum} question={questions.length} />
      )}
    </>
  );
};
export default QuizItem;
