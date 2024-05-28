import styled from 'styled-components';

export const QuizBackground = styled.div`
  width: 780px;
  margin: 0 auto;
  margin-bottom: 24px;
  padding: 24px 16px;

  border-radius: 8px;
  background: #fafcff;
  box-shadow: 3px 4px 40px 0px rgba(187, 194, 221, 0.3);
`;

export const QuizTitle = styled.h2`
  margin-bottom: 24px;

  font-size: 36px;
`;

export const QuestionNumber = styled.h3`
  margin-bottom: 16px;

  font-size: 24px;
`;

export const QuestionText = styled.p`
  margin-bottom: 24px;

  font-size: 18px;
`;

export const AnswerList = styled.ul`
  margin-bottom: 20px;
`;
export const AnswerItem = styled.li`
  margin-bottom: 10px;
`;

export const AnswerInput = styled.input`
  margin-right: 10px;

  cursor: pointer;
`;

export const AnswerLabel = styled.label`
  cursor: pointer;
`;


///

export const Title = styled.h2`
  margin-bottom: 24px;

  font-size: 36px;
  text-align: center;
`;

export const ResultTitle = styled.h3`
  margin-bottom: 24px;

  font-size: 24px;
  text-align: center;
`;



export const QuizQuestion = styled.p`
  margin-bottom: 24px;

  font-size: 18px;
`;
export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  width: 400px;
  margin-right: 20px;
  padding: 10px 12px;
  border: 0.8px solid rgb(141 141 141);

  font-size: 12px;
  font-weight: 400;
  line-height: 1.33;
  color: rgb(123, 123, 137);

  background: rgb(245, 246, 250);
  border-radius: 4px;
  outline: transparent;
`;

export const SubmitBtn = styled.button`
  padding: 10px 24px;

  color: #ffffff;
  font-size: 18px;

  background-color: ${props => (props.disabled ? '#bfbfbf' : '#2eb06a')};
  border-radius: 8px;
`;

export const InputItems = styled.li`
  margin-bottom: 20px;
`;


