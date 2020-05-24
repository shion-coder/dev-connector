import styled, { keyframes } from 'styled-components';

/* -------------------------------------------------------------------------- */

const bounce = keyframes`
  0%,

  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }

  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
`;

const fade = keyframes`
  0%,

  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Spinner = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  margin: 20px auto 10px auto;
`;

export const Bounce = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00c3b3;
  border-radius: 50%;
  opacity: 0.6;
  animation: ${bounce} 2s ${({ delay }) => delay || null} infinite ease-in-out;
`;

export const Text = styled.div`
  margin-right: auto;
  margin-left: auto;
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 300;
  letter-spacing: 0.2rem;
  color: ${({ theme }) => (theme === 'dark' ? '#f7f8f9' : '#181818')};
  animation: ${fade} 1.25s ease-in-out 0.25s infinite;
`;
