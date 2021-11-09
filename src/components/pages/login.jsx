import React from "react";
import LoginForm from "../form/loginForm";
import FormCard from "../cards/formCard";
import ButtonAppBar from "../navbar/navbar";
import { BackgroundImg } from "../background/backgroudStyle";

const Login = () => {

    return (
        
        <>
        <LoginForm action={"/login"} method={"post"} />
        <BackgroundImg/>
        </>
        
    )
}

export default Login;