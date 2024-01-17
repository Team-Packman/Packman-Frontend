import { css } from '@emotion/react';
import normalize from 'emotion-normalize';

// eslint-disable-next-line import/extensions
import Pretendard from '@/assets/fonts/PretendardVariable.woff2';

const globalStyle = css`
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
    font-family: Pretendard, sans-serif;
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

    color: black;

    background-color: transparent;
    border: none;
  }

  input,
  textarea {
    /* stylelint-disable-next-line declaration-property-unit-allowed-list */
    font-size: 16px;

    -webkit-appearance: none;
    appearance: none;
    -webkit-border-radius: 0;
    border-radius: 0;
  }

  select {
    /* stylelint-disable-next-line declaration-property-unit-allowed-list */
    font-size: 16px;

    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    -webkit-border-radius: 0;
    border-radius: 0;
    outline: none;
  }

  ${normalize}

  @font-face {
    font-family: Pretendard;
    font-style: normal;
    font-display: optional;
    src: url(${Pretendard}) format('woff2');
  }
`;

export default globalStyle;
