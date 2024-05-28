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
