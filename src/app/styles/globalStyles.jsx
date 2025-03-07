import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
//     box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard-Regular', sans-serif;
  }

  body, html {
  height: 100%;
  margin: 0;
  overflow: hidden; /* 전체 페이지 스크롤 방지 */
}
`;

export default GlobalStyle;
