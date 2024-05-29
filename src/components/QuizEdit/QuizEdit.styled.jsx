import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  margin-bottom: 48px;
`;

export const AddButton = styled.button`
  padding: 16px 24px;
  border: 1px solid grey;

  font-size: 20px;

  background: transparent;
  transition: border 0.3s ease-out, background 0.3s ease-out,
    color 0.3s ease-out;

  border-radius: 15px;

  &:hover {
    color: #ffffff;
    border: 1px solid #ebbf32;
    background: #ebbf32;
  }
`;

export const DeleteButton = styled.button`
  padding: 16px 24px;
  border: 1px solid grey;

  font-size: 20px;

  background: transparent;
  transition: border 0.3s ease-out, background 0.3s ease-out,
    color 0.3s ease-out;

  border-radius: 15px;

  &:hover {
    color: #ffffff;
    border: 1px solid palevioletred;
    background: palevioletred;
  }
`;

export const HomeLink = styled(Link)`
  padding: 16px 24px;
  border: 1px solid grey;

  font-size: 20px;

  background: transparent;
  transition: border 0.3s ease-out, background 0.3s ease-out,
    color 0.3s ease-out;

  border-radius: 15px;

  &:hover {
    color: #ffffff;
    border: 1px solid #ebbf32;
    background: #ebbf32;
`;

export const QuizBackground = styled.div`
  position: relative;

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

export const AddQuestionContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  gap: 150px;
`;

export const ResultContainer = styled.div`
  padding: 16px;
  width: 450px;
  height: 370px;
  border: 1px solid grey;
  border-radius: 8px;
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

export const QuizEditBtn = styled.li`
  margin-bottom: 20px;
`;
export const CloseBtn = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;

  width: 24px;
  height: 24px;
  stroke: #000000;
`;

export const AddQuestionList = styled.ul`
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconClose = styled.svg`
  width: 24px;
  height: 24px;
  stroke: #000000;
`;
