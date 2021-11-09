import React from "react";
import { LabelContainer } from "./styledForm";
import FormCard from "../cards/formCard";
import { SecundaryButtons } from "../buttons/buttons"
import { Button, Stack } from "@material-ui/core";
import api from "../../services/api";
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router";

export const SignUp_Event = async (_event) => {
    try {
        const { data } = await api.post("/post-events",_event,{ withCredentials: true }
        );
        console.log("entrou")
        return { data }
    } catch (error) {
        const authentic = false;
        return { authentic }

    }
    
}
const initialValues = {
    title: "",
    description: "",
    img: "",
    date: "",
    time: "",
}

const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    img: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    time: Yup.string().required('Required'),
})

const NewEventForm = (props) => {

    const history = useHistory();
    const redirect = (_values) => {
        history.push('/home');

    }

    const onSubmit = values => {
        console.log('form data', values);
        redirect(values)
    }

    const goEvents = async (values) => {
        await SignUp_Event(values);
        console.log(values)
        history.push("/home")
    }
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            img: "",
            date: "",
            time: "",
        },
        onSubmit: values => {
            goEvents(values)

            // doLogin(values);
            
        },
    });

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit && redirect}
        >

            <FormCard>
                <h2>Signup Event:</h2>

                <form onSubmit={formik.handleSubmit} >
                    <LabelContainer>
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            placeholder="Title"
                            type="text"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            required
                        />
                        <ErrorMessage name="title">
                            {errorMsg => <div className="error">campo obrigatorio</div>}
                        </ErrorMessage>
                        
                    </LabelContainer>

                    <LabelContainer>
                        <label htmlFor="img">Image:</label>
                        <input
                            type="text"
                            name="img"
                            id="img"
                            placeholder="link da imagem"
                            onChange={formik.handleChange}
                            value={formik.values.img}
                            required
                        />


                    </LabelContainer>

                    <LabelContainer>
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            required
                        />
                    </LabelContainer>

                    <LabelContainer>
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            onChange={formik.handleChange}
                            value={formik.values.date}
                            required
                        />
                    </LabelContainer>

                    <LabelContainer>
                        <label htmlFor="time:">Time::</label>
                        <input
                            type="time"
                            name="time"
                            id="time"
                            onChange={formik.handleChange}
                            value={formik.values.time}
                            required
                        />
                    </LabelContainer>

                    <Stack spacing={2} direction="row">
                        <Button type="submit" variant="contained" disabled={!formik.isValid}>Cadastrar</Button>
                        <SecundaryButtons type="submit" title="Voltar" redirect='home' />
                    </Stack>


                </form>
            </FormCard>
        </Formik>
        /*  <FormCard>
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
                                  <label htmlFor="title">Title:</label>
                                  <Field
                                      type="text"
                                      name="title"
                                      id="title"
                                  />
  
                                  <ErrorMessage name="title">
                                      {errorMsg => <div className="error">campo obrigatorio</div>}
                                  </ErrorMessage>
                              </LabelContainer>
  
                              <LabelContainer>
                                  <label htmlFor="img">Image:</label>
                                  <Field
                                      type="text"
                                      name="img"
                                      id="img"
                                  />
  
                                  <ErrorMessage name="image">
                                      {errorMsg => <div className="error">campo obrigatorio</div>}
                                  </ErrorMessage>
                              </LabelContainer>
  
                              <LabelContainer>
                                  <label htmlFor="description">Description:</label>
                                  <Field
                                      type="text"
                                      name="description"
                                      id="description"
                                  />
  
                                  <ErrorMessage name="description">
                                      {errorMsg => <div className="error">campo obrigatorio</div>}
                                  </ErrorMessage>
                              </LabelContainer>
  
                              <LabelContainer>
                                  <label htmlFor="date">Date:</label>
                                  <Field
                                      type="date"
                                      name="date"
                                      id="date"
                                  />
  
                                  <ErrorMessage name="date">
                                      {errorMsg => <div className="error">campo obrigatorio</div>}
                                  </ErrorMessage>
                              </LabelContainer>
  
                              <LabelContainer>
                                  <label htmlFor="time">Time:</label>
                                  <Field
                                      type="time"
                                      name="time"
                                      placeholder={`***`}
                                      id="time"
                                  />
  
                                  <ErrorMessage name="time">
                                      {errorMsg => <div className="error">campo obrigatorio</div>}
                                  </ErrorMessage>
                              </LabelContainer>
  
  
  
                              <Stack spacing={2} direction="row">
                                  <Button type="submit" variant="contained" disabled={!formik.isValid}>Cadastrar</Button>
                                  <SecundaryButtons type={"submit"} title={"Voltar"} redirect={'home'} />
                              </Stack>
                          </Form>
                      )
                  }}
              </Formik>
  
           
              </FormCard> */
    )
}

export default NewEventForm;