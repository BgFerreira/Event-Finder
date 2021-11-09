import { createGlobalStyle } from 'styled-components'
//import imgLogin from './backgroundLogin.jpg'

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
    color: #111;
    outline:none;
    text-decoration:none;
    box-sizing: border-box;
  }
  
  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }



  #root {
    width: 100%;
    height: 100%;
    display: flex;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items:center;
    padding: 10px 0px;
    height: 70%;
    width: 100%;
  }
`

/*body {
  width: 100%;
  height: 100%;
  background-color: #fff;
  background-image: url(${imgLogin});
  background-repeat:no-repeat;
  background-position:right bottom;
}*/