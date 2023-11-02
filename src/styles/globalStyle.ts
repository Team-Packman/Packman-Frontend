import { css } from 'styled-components';
import { normalize } from 'styled-normalize';

// eslint-disable-next-line import/extensions
import Pretendard from '@/assets/fonts/PretendardVariable.woff2';

const globalStyle = css`
  ${normalize}

  @font-face {
    font-family: 'Pretendard';
    font-display: optional;
    font-style: normal;
    src: url(${Pretendard}) format('woff2');
  }

  :root {
    --vh: 100%;
  }

  * {
    scrollbar-width: none;

    box-sizing: border-box;

    font-size: 62.5%;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  html,
  body {
    font-family: 'Pretendard', 'sans-serif';
  }

  a {
    text-decoration: none;
  }

  button,
  ul,
  li,
  h1,
  h2,
  h3,
  p {
    margin: 0;
    padding: 0;
  }

  button {
    cursor: pointer;
  }

  input,
  textarea {
    font-size: 16px;

    -webkit-appearance: none;
    appearance: none;
    -webkit-border-radius: 0;
    border-radius: 0;
  }

  select {
    font-size: 16px;

    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    -webkit-border-radius: 0;
    border-radius: 0;
    outline: none;
  }
`;

export default globalStyle;
