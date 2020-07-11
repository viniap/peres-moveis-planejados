import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './Login.css';

import Header from '../../components/Header';
import RegisterModal from '../../components/RegisterModal';
import useAuth from '../../contexts/auth';
import Page from '../../components/Page';
import Content from '../../components/Content';
import SectionHeader from '../../components/SectionHeader';
import FormBox from '../../components/FormBox';
import FormSchema from '../../schemas/FormSchema';

const Login = () => {

    const { signIn } = useAuth();

    return (
        <Page id="page-login">
            <Content>
                <Header />

                <SectionHeader>Entrar</SectionHeader>

                <FormBox>
                    <Formik
                        initialValues={{email: "", password: ""}}
                        validationSchema={FormSchema}
                        onSubmit={(values, actions) => {
                            const { email, password } = values;
    
                            const data = {
                                email,
                                password
                            };

                            actions.resetForm();
                            signIn(data);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            isValid
                        }) => (
                            <Form className="login">
                                <div className="field-group">
                                    <div className="field">
                                        <label htmlFor="email">E-mail</label>
                                        <Field 
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={!(errors.email && touched.email) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="email" 
                                            className="error=message"
                                        />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="password">Senha</label>
                                        <Field 
                                            type="password"
                                            name="password"
                                            id="password"
                                            className={!(errors.password && touched.password) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="password" 
                                            className="error=message"
                                        />
                                    </div>

                                    <div className="button-group">
                                        <button type="submit" disabled={!isValid}>Entrar</button>
                                        <Link to="/esqueci">Esqueci minha senha</Link>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <main className="login">
                        <h6>Ainda não possui uma conta?</h6>
                        <RegisterModal />
                    </main>
                </FormBox>
            </Content>
        </Page>
    );
}

export default Login;