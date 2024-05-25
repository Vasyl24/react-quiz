import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ResultBackground = styled.div`
  text-align: center;
`;

export const ResultTitle = styled.h2`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const ResultText = styled.p`
  font-size: 24px;
  margin-bottom: 36px;
`;

export const ResultNum = styled.span`
  font-size: 30px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
`;

export const HomeLink = styled(Link)`
  padding: 10px 24px;

  color: #ffffff;
  font-size: 24px;

  background: #b6b631;
  border-radius: 8px;
`;

export const TryAgainBtn = styled.button`
  padding: 10px 24px;

  color: #ffffff;
  font-size: 24px;

  background: #314eb6;
  border-radius: 8px;
`;
