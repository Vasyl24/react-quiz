import { Link } from 'react-router-dom';
import styled from 'styled-components';

// export const LinkContainer = styled.div`
//   text-align: center;
//   margin-bottom: 24px;
// `;
export const HomeLink = styled(Link)`
  display: inline-block;
  padding: 8px 12px;
  border: 1px solid grey;

  font-size: 16px;

  background: transparent;
  transition: border 0.3s ease-out, background 0.3s ease-out,
    color 0.3s ease-out;

  border-radius: 15px;

  &:hover {
    color: #ffffff;
    border: 1px solid #ebbf32;
    background: #ebbf32;
`;

export const AddQuestionContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  margin-bottom: 24px;

  font-size: 36px;
  text-align: center;
`;
export const ResultContainer = styled.div`
  margin: 0 auto;
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

export const QuizTitle = styled.h3`
  margin-bottom: 24px;

  font-size: 20px;
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

  &.last-btn {
    display: block;
    margin: 0 auto;
    padding: 10px 64px;
  }
`;

export const QuizItem = styled.li`
  width: 780px;
  margin: 0 auto;
  margin-bottom: 24px;
  padding: 24px 16px;

  border-radius: 8px;
  background: #fafcff;
  box-shadow: 3px 4px 40px 0px rgba(187, 194, 221, 0.3);
`;
export const InputList = styled.ul`
  display: block;
  width: 600px;
`;

export const InputItems = styled.li`
  margin-bottom: 20px;
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
