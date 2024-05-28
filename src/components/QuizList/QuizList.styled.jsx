import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainTitle = styled.h1`
  margin-bottom: 24px;

  font-size: 48px;
`;

export const AddQuizLink = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  padding: 16px 16px;
  border: 1px solid transparent;

  font-size: 36px;

  border-radius: 18px;
  transition: border 0.3s ease-out, box-shadow 0.3s ease-out;

  &:hover {
    border: 1px solid grey;
    box-shadow: 3px 4px 40px 0px rgba(187, 194, 221, 0.6);
  }
`;

export const QuizBackground = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 24px 16px;

  border-radius: 8px;
  background: #fafcff;
  box-shadow: 3px 4px 40px 0px rgba(187, 194, 221, 0.6);
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const TrashBtn = styled.button`
  padding: 7px;
  border-radius: 50%;
  transition: background-color 0.3s ease-out;

  & > svg {
    transition: stroke 0.2s ease-out;
  }

  &:hover {
    background-color: #d53939;

    & > svg {
      stroke: #f3f3f3;
    }
  }
`;

export const IconTrash = styled.svg`
  width: 28px;
  height: 28px;
  stroke: grey;
`;

export const LinkEdit = styled.button`
  display: inline-block;
  padding: 7px;
  border-radius: 50%;
  transition: background-color 0.3s ease-out;

  cursor: pointer;

  & > svg {
    transition: stroke 0.2s ease-out;
  }

  &:hover {
    background-color: grey;

    & > svg {
      stroke: #f3f3f3;
    }
  }
`;

export const IconEdit = styled.svg`
  width: 24px;
  height: 24px;
  stroke: grey;
`;
