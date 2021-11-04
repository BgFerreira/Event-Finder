import React from "react";
import { StyledInput, LabelContainer } from "./styledForm";
import FormCard from "../cards/formCard";
import BasicButtons from "../buttons/buttons"

const SignupForm = (props) => {
    return (
        <FormCard>
            <h2>Signup</h2>
            <form {...props}>

                <LabelContainer>
                    <label htmlFor="fullname">fullname:</label>
                    <StyledInput name="fullname" type="text" placeholder="enter your fullname:" />
                </LabelContainer>

                <LabelContainer>
                    <label htmlFor="username">Username:</label>
                    <StyledInput name="username" type="text" placeholder="enter your username:" />
                </LabelContainer>

                <LabelContainer>
                    <label htmlFor="password">Password:</label>
                    <StyledInput name="password" type="password" placeholder="enter your password:" />
                </LabelContainer>
            </form>
            <BasicButtons title={"Cadastrar"} />
        </FormCard>
    )
}

export default SignupForm;