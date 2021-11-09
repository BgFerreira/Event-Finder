import React from "react";
import { LabelContainer } from "./styledForm";
import FormCard from "../cards/formCard";
import { SecundaryButtons } from "../buttons/buttons"
import { Button, Stack } from "@material-ui/core";

import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router";
import api from "../../services/api";


export const login_USER = async (_user) => {
    try {
        const { data } = await api.post("/login", _user,{withCredentials: true }
        );
        console.log("user", _user)    
        return  data;

    } catch (error) {
        const authentic = false;
        return { authentic }
    }

}



const initialValues = {
    username: '',
    password: ''
}


const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required')
})


const LoginForm = (props) => {

    const history = useHistory();
   
    const doLogin = async (values) => {
     const session = await login_USER(values)
     if(session.logged){
        localStorage.setItem("session", JSON.stringify(session) );
          history.push('/home');
     }
         console.log(session.logged)       
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => {
            doLogin(values);
        },
    });

    return (
        <FormCard>
            <h2>Login</h2>

            <form onSubmit={formik.handleSubmit} >
                <LabelContainer>
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        placeholder="username"
                        type="text"
                        name="username"
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


                <Stack spacing={2} direction="row">
                    <Button type="submit" variant="contained" disabled={!formik.isValid}>login</Button>
                    <SecundaryButtons type={"submit"} title={"signup"} redirect={'signup'} />
                </Stack>

            </form>
        </FormCard>
        /*  <FormCard>
              <h2>Login</h2>
              <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit && redirect}
              >
  
                  {formik => {
                      return (
                          <Form className="input-container" >
  
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
  
  
                      
                              <Stack spacing={2} direction="row">
                                  <Button type="submit" variant="contained" disabled={!formik.isValid}>login</Button>
                                  <SecundaryButtons type={"submit"} title={"signup"} redirect={'signup'} />
                              </Stack>
                              <p>Esqueceu a senha?</p>
                          </Form>
                      )
                  }}
              </Formik> */

        /*<form {...props}>
             <LabelContainer>
                 <label htmlFor="username">Username:</label>
                 <StyledInput name="username" type="text" placeholder="enter your username:" />
             </LabelContainer>

             <LabelContainer>
                 <label htmlFor="password">Password:</label>
                 <StyledInput name="password" type="password" placeholder="enter your password:" />
             </LabelContainer>

         </form>


     </FormCard>*/
    )
}

export default LoginForm;