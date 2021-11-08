import React, { useState } from "react";
import { LabelContainer } from "./styledForm";
import FormCard from "../cards/formCard";
import { SecundaryButtons } from "../buttons/buttons"
import { Button, Stack } from "@material-ui/core";

import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router";
import api from "../../services/api";


const initialValues = {
    fullname: '',
    username: '',
    password: '',
    confirmPassword: ''
}

const validationSchema = Yup.object({
    fullname: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().required('Required')
})

export const SignUp_USER = async (_user) => {
    try {
        const { data } = await api.post("/signup", _user);
        const authentic = true;
        return { data, authentic }
    } catch (error) {
        const authentic = false;
        return { authentic }

    }
    
}



 const SignupForm = (props) => {
    const [msgError, SetMsgError] = useState('');
    const history = useHistory();
    const redirect = (_values) => {
        history.push('/home');

    }

    const goEvents = async (values) => {
    await SignUp_USER(values);
    console.log(values)
    history.push("/home")
}

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            if (values.fullname === '' || values.confirmPassword === '' || values.password === '' ||  values.username === '') {
                return SetMsgError("Insira todos os dados.")
            }

            if (values.confirmPassword !== values.password) {
                return SetMsgError("As senhas são diferentes.")
            }

            alert(JSON.stringify(values, null, 2));
            goEvents(values)
        },
    });

    return (

        <FormCard>
            <h2>Signup</h2>

            <form onSubmit={formik.handleSubmit} >
                <LabelContainer>
                    <label htmlFor="fullname">Fullname:</label>
                    <input
                        id="fullname"
                        placeholder="fullname"
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.fullname}
                        required
                    />

                </LabelContainer>

                <LabelContainer>
                    <label htmlFor="username">username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        required
                    />


                </LabelContainer>

                <LabelContainer>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="***"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                    />
                </LabelContainer>

                <LabelContainer>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="***"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        required
                    />
                </LabelContainer>

                <Stack spacing={2} direction="row">
                                 <Button type="submit" variant="contained" disabled={!formik.isValid}>Cadastrar</Button>
                                 <SecundaryButtons type={"submit"} title={"Voltar"} redirect={''} />
                             </Stack>

            </form>
        </FormCard>
        /* <FormCard>
             <h2>Signup</h2>
 
             <Formik
                 initialValues={initialValues}
                 validationSchema={validationSchema}
                 onSubmit={onSubmit && redirect}
             >
 
                 {formik => {
                     return (
                         <Form className="input-container" >
 
                             <LabelContainer>
                                 <label htmlFor="fullname">Fullname:</label>
                                 <Field
                                     type="text"
                                     name="fullname"
                                     placeholder={`email@example.com`}
                                     id="fullname"
                                 />
 
                                 <ErrorMessage name="fullname">
                                     {errorMsg => <div className="error">campo obrigatorio</div>}
                                 </ErrorMessage>
                             </LabelContainer>
 
                             <LabelContainer>
                                 <label htmlFor="username">Username:</label>
                                 <Field
                                     type="text"
                                     name="username"
                                     placeholder={`email@example.com`}
                                     id="username"
                                 />
 
                                 <ErrorMessage name="username">
                                     {errorMsg => <div className="error">campo obrigatorio</div>}
                                 </ErrorMessage>
                             </LabelContainer>
 
                             <LabelContainer>
                                 <label htmlFor="password">Password:</label>
                                 <Field
                                     type="password"
                                     name="password"
                                     placeholder={`***`}
                                     id="password"
                                 />
 
                                 <ErrorMessage name="password">
                                     {errorMsg => <div className="error">campo obrigatorio</div>}
                                 </ErrorMessage>
                             </LabelContainer>
 
                             <LabelContainer>
                                 <label htmlFor="confirmPassword">Confirm Password:</label>
                                 <Field
                                     type="password"
                                     name="confirmPassword"
                                     placeholder={`***`}
                                     id="confirmPassword"
                                 />
 
                                 <ErrorMessage name="confirmPassword">
                                     {errorMsg => <div className="error">campo obrigatorio</div>}
                                 </ErrorMessage>
                             </LabelContainer>
 
 
 
                             <Stack spacing={2} direction="row">
                                 <Button type="submit" variant="contained" disabled={!formik.isValid}>Cadastrar</Button>
                                 <SecundaryButtons type={"submit"} title={"Voltar"} redirect={''} />
                             </Stack>
                         </Form>
                     )
                 }}
             </Formik>
 
             {<form {...props}>
 
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
 
             <Stack spacing={2} direction="row">
                 <BasicButtons title={"Cadastrar"} redirect={'home'} />
                 <SecundaryButtons title={"Voltar"} redirect={''} />
             </Stack>
             
 
         </FormCard>*/
    )
}

export default SignupForm;