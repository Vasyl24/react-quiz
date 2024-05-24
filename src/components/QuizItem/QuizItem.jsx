import { useState } from 'react';
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

const QuizItem = () => {
  const quiz = {
    id: 1,
    questions: [
      {
        questionNum: 1,
        questionText: 'Which planet is known as the Red Planet?',
        answList: ['Earth', 'Mars', 'Venus', 'Jupiter'],
        rightAnsw: 'Mars',
      },
      {
        questionNum: 2,
        questionText: 'What is the capital of France?',
        answList: ['Madrid', 'Berlin', 'Paris', 'Rome'],
        rightAnsw: 'Paris',
      },
      {
        questionNum: 3,
        questionText: 'Who wrote "Romeo and Juliet"?',
        answList: [
          'Charles Dickens',
          'William Shakespeare',
          'Jane Austen',
          'Mark Twain',
        ],
        rightAnsw: 'William Shakespeare',
      },
      {
        questionNum: 4,
        questionText: 'What is the largest ocean on Earth?',
        answList: [
          'Atlantic Ocean',
          'Indian Ocean',
          'Arctic Ocean',
          'Pacific Ocean',
        ],
        rightAnsw: 'Pacific Ocean',
      },
      {
        questionNum: 5,
        questionText: 'Which element has the chemical symbol "O"?',
        answList: ['Gold', 'Oxygen', 'Hydrogen', 'Helium'],
        rightAnsw: 'Oxygen',
      },
      {
        questionNum: 6,
        questionText: 'In which year did the Titanic sink?',
        answList: ['1910', '1912', '1914', '1916'],
        rightAnsw: '1912',
      },
      {
        questionNum: 7,
        questionText: 'Who is known as the Father of Computers?',
        answList: [
          'Alan Turing',
          'Charles Babbage',
          'John von Neumann',
          'Bill Gates',
        ],
        rightAnsw: 'Charles Babbage',
      },
      {
        questionNum: 8,
        questionText: 'What is the largest continent?',
        answList: ['Africa', 'Asia', 'Europe', 'Antarctica'],
        rightAnsw: 'Asia',
      },
      {
        questionNum: 9,
        questionText: 'What is the chemical formula for water?',
        answList: ['H2O', 'CO2', 'NaCl', 'O2'],
        rightAnsw: 'H2O',
      },
      {
        questionNum: 10,
        questionText: 'What is the hardest natural substance on Earth?',
        answList: ['Gold', 'Iron', 'Diamond', 'Quartz'],
        rightAnsw: 'Diamond',
      },
      {
        questionNum: 11,
        questionText: 'Who painted the Mona Lisa?',
        answList: [
          'Vincent van Gogh',
          'Pablo Picasso',
          'Leonardo da Vinci',
          'Claude Monet',
        ],
        rightAnsw: 'Leonardo da Vinci',
      },
      {
        questionNum: 12,
        questionText: 'Which country is known as the Land of the Rising Sun?',
        answList: ['China', 'Japan', 'Korea', 'Thailand'],
        rightAnsw: 'Japan',
      },
      {
        questionNum: 13,
        questionText: 'How many bones are in the adult human body?',
        answList: ['206', '201', '210', '215'],
        rightAnsw: '206',
      },
      {
        questionNum: 14,
        questionText: 'What is the main ingredient in guacamole?',
        answList: ['Tomato', 'Avocado', 'Onion', 'Pepper'],
        rightAnsw: 'Avocado',
      },
      {
        questionNum: 15,
        questionText: 'Which language is the most widely spoken worldwide?',
        answList: ['English', 'Spanish', 'Mandarin Chinese', 'Hindi'],
        rightAnsw: 'Mandarin Chinese',
      },
      {
        questionNum: 16,
        questionText: 'Who discovered penicillin?',
        answList: [
          'Marie Curie',
          'Albert Einstein',
          'Alexander Fleming',
          'Isaac Newton',
        ],
        rightAnsw: 'Alexander Fleming',
      },
      {
        questionNum: 17,
        questionText: 'What is the smallest unit of life?',
        answList: ['Tissue', 'Organ', 'Cell', 'Molecule'],
        rightAnsw: 'Cell',
      },
      {
        questionNum: 18,
        questionText: 'In which country are the pyramids of Giza located?',
        answList: ['Mexico', 'India', 'Egypt', 'Peru'],
        rightAnsw: 'Egypt',
      },
      {
        questionNum: 19,
        questionText: 'Which instrument is known as the "king of instruments"?',
        answList: ['Piano', 'Violin', 'Guitar', 'Organ'],
        rightAnsw: 'Organ',
      },
      {
        questionNum: 20,
        questionText: 'What is the capital city of Australia?',
        answList: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        rightAnsw: 'Canberra',
      },
      {
        questionNum: 21,
        questionText: 'Which planet is closest to the sun?',
        answList: ['Earth', 'Venus', 'Mercury', 'Mars'],
        rightAnsw: 'Mercury',
      },
      {
        questionNum: 22,
        questionText: 'Who was the first person to walk on the moon?',
        answList: [
          'Buzz Aldrin',
          'Michael Collins',
          'Yuri Gagarin',
          'Neil Armstrong',
        ],
        rightAnsw: 'Neil Armstrong',
      },
      {
        questionNum: 23,
        questionText: 'What is the smallest prime number?',
        answList: ['0', '1', '2', '3'],
        rightAnsw: '2',
      },
      {
        questionNum: 24,
        questionText: "Which gas is most abundant in the Earth's atmosphere?",
        answList: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        rightAnsw: 'Nitrogen',
      },
      {
        questionNum: 25,
        questionText: 'What is the longest river in the world?',
        answList: [
          'Amazon River',
          'Nile River',
          'Yangtze River',
          'Mississippi River',
        ],
        rightAnsw: 'Nile River',
      },
    ],
  };

  const [isAnswered, setIsAnswered] = useState(false);
  const [showModal, setShowModal] = useState(1);
  const [userAnswer, setUserAnswer] = useState(null);
  const [allAnswers, setAllAnswers] = useState([]);

  localStorage.setItem('quiz', JSON.stringify(quiz));

  const questNum = localStorage.getItem('quiz');
  const parsedQuiz = JSON.parse(questNum);

  const { questions } = parsedQuiz;

  // const lastElement = questions[questions.length - 1];
  // console.log(lastElement.questionNum);

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
  }

  const isLastQuestion = showModal === questions.length;

  return (
    <>
      {questions.map((question, index) =>
        showModal === question.questionNum ? (
          <QuizBackground key={index}>
            <QuizTitle>React Quiz</QuizTitle>
            <QuestionNumber>
              Question <span>{question.questionNum} </span>
              of
              <span> {questions.length}</span>
            </QuestionNumber>
            <QuestionText>{question.questionText}</QuestionText>
            <form>
              <AnswerList>
                {question.answList.map((answerItem, idx) => (
                  <AnswerItem key={idx}>
                    <AnswerInput
                      type="radio"
                      name="answer"
                      id={`answer-${idx}`}
                      value={answerItem}
                      onChange={handleChooseAnswer}
                    />
                    <AnswerLabel htmlFor={`answer-${idx}`}>
                      {answerItem}
                    </AnswerLabel>
                  </AnswerItem>
                ))}
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
    </>
  );
};
export default QuizItem;
