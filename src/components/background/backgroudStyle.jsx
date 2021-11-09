import styled from "styled-components";
import imgLogin from './imgLogin.svg'

export const BackgroundImg = styled.div` 
    width: 100%;
    height: 100%;
    position:absolute;
    z-index:1;
    background-color: #1565c0;
    background-image: url(${imgLogin});
    background-repeat:no-repeat;
    background-position:right bottom;

`

