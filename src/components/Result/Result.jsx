import {
  ButtonContainer,
  HomeLink,
  ResultBackground,
  ResultNum,
  ResultText,
  ResultTitle,
  TryAgainBtn,
} from './Result.styled';

const Result = ({ rightAnswersNum, question }) => {
  return (
    <ResultBackground>
      <ResultTitle>Your result is</ResultTitle>
      <ResultText>
        <ResultNum>{rightAnswersNum}</ResultNum> right answers of{' '}
        <ResultNum>{question}</ResultNum>
      </ResultText>

      <ButtonContainer>
        <HomeLink to={'/'}>Go home</HomeLink>

        <TryAgainBtn type="button" onClick={() => window.location.reload()}>
          Try again
        </TryAgainBtn>
      </ButtonContainer>
    </ResultBackground>
  );
};

export default Result;
