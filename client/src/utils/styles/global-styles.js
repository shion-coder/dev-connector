import { createGlobalStyle, keyframes } from 'styled-components';
import { normalize } from 'styled-normalize';

import background from 'assets/images/showcase.jpg';

/* -------------------------------------------------------------------------- */

const fadeIn = keyframes`
  from {
      opacity: 0;
  }

  to {
      opacity: 1;
  }
`;

export const GlobalStyles = createGlobalStyle`
  /* ${normalize}

  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    background: transparent;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: sans-serif;
    animation: ${fadeIn} 1s ease;
  }

  a {
    text-decoration: none;
  } */

  img {
    width: 100%;
  }

  .landing {
    position: relative;
    background: url(${background}) no-repeat;
    background-size: cover;
    background-position: center;
    height: 100vh;
    margin-top: -24px;
    margin-bottom: -50px;
  }

  .landing-inner {
    padding-top: 80px;
  }

  .dark-overlay {
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .card-form {
    opacity: 0.9;
  }

  .latest-profiles-img {
    width: 40px;
    height: 40px;
  }

  .form-control::placeholder {
    color: #bbb !important;
  }

  .link-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline;
    color: rgba(255,255,255,.5);
    margin: 0;
    padding: 0;
  }

  .link-button:hover,
  .link-button:focus {
    text-decoration: none;
  }
`;
