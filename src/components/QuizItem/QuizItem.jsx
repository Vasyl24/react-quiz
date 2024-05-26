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
// import { quiz } from 'quiz';

const QuizItem = ({ id }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [showModal, setShowModal] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [allAnswers, setAllAnswers] = useState([]);
  const [rightAnswersNum, setRightAnswersNum] = useState(0);

  // localStorage.setItem('quiz', JSON.stringify(quiz));

  const questNum = localStorage.getItem('quiz');
  const parsedQuiz = JSON.parse(questNum);

  const notice = parsedQuiz.notices.find(notice => notice.id === id);

  const quizComponents = parsedQuiz.notices;

  const isLastQuestion = showModal === notice.questions.length - 1;
  const rightAnswers = [];

  notice.questions.map(question => rightAnswers.push(question.rightAnswer));

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
      // console.log(localStorage.getItem('quizAnswers'));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {quizComponents.map(
        quizComponent =>
          quizComponent.id === id &&
          notice.questions.map((question, index) =>
            showModal === question.questionNum ? (
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
          )
      )}

      {showModal > notice.questions.length - 1 && (
        <Result
          rightAnswersNum={rightAnswersNum}
          question={notice.questions.length}
        />
      )}
    </>
  );
};
export default QuizItem;
