import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainTitle = styled.h1`
  margin-bottom: 24px;

  font-size: 48px;
`;

export const AddQuizLink = styled(Link)`
  display: block;
  margin-bottom: 24px;

  font-size: 36px;
`;
export const QuizBackground = styled.div`
  margin-bottom: 24px;
  padding: 24px 16px;

  border-radius: 8px;
  background: #fafcff;
  box-shadow: 3px 4px 40px 0px rgba(187, 194, 221, 0.6);
`;