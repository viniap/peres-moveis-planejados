import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './Profile.css';

import api from '../../services/api';

import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import useAuth from '../../contexts/auth';
import Page from '../../components/Page';
import Content from '../../components/Content';
import FormBox from '../../components/FormBox';
import ProfileFormSchema from '../../schemas/ProfileFormSchema';
import MyField from '../../components/MyField';
import MessageModal from '../../components/MessageModal';
import { ReactComponent as Fail } from '../../assets/fail.svg';
import { ReactComponent as Success } from '../../assets/success.svg';

function titleCaseWord(word: string) {
    if (!word) return word;
    return word.replace(
      /\w\S*/g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
}

function checkProperties(obj: any) {
    for (var key in obj) {
        if(key !== "complemento" && key !== "referencia"){
            if (obj[key] === null)
                return false;
        }
    }
    return true;
}

const Profile = () => {
    const [success, setSuccess] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const { user } = useAuth();

    return (
        <Page id="page-profile">
            <Content>
                <Header />

                <SectionHeader>Meu perfil</SectionHeader>

                <FormBox>
                    <Formik
                        initialValues={{
                            name: (!user?.name) ? "" : user?.name,
                            surname: (!user?.surname) ? "" : user?.surname,
                            email: (!user?.email) ? "" : user?.email,
                            cep: (!user?.address?.cep) ? "" : user?.address?.cep,
                            uf: (!user?.address?.uf) ? "" : user?.address?.uf,
                            localidade: (!user?.address?.localidade) ? "" : user?.address?.localidade,
                            bairro: (!user?.address?.bairro) ? "" : user?.address?.bairro,
                            logradouro: (!user?.address?.logradouro) ? "" : user?.address?.logradouro,
                            num: (!user?.address?.num) ? "" : user?.address?.num,
                            complemento: (!user?.address?.complemento) ? "" : user?.address?.complemento,
                            referencia: (!user?.address?.referencia) ? "" : user?.address?.referencia,
                            whatsapp: (!user?.whatsapp) ? "" : user?.whatsapp,
                            password: "",
                            newpassword: "",
                        }}
                        validationSchema={ProfileFormSchema}
                        onSubmit={async (values) => {
                            setSuccess(false);
                            setOpen(false);
                            const address = {
                                cep: (values.cep.length > 0) ? values.cep : null,
                                uf: (values.uf.length > 0) ? values.uf.toUpperCase() : null,
                                localidade: (values.localidade.length > 0) ? titleCaseWord(values.localidade) : null,
                                bairro: (values.bairro.length > 0) ? titleCaseWord(values.bairro) : null,
                                logradouro: (values.logradouro.length > 0) ? titleCaseWord(values.logradouro) : null,
                                num: (values.num.length > 0) ? values.num : null,
                                complemento: (values.complemento.length > 0) ? values.complemento : null,
                                referencia: (values.referencia.length > 0) ? values.referencia : null
                            }
                            
                            const profileData = {
                                name: titleCaseWord(values.name),
                                surname: titleCaseWord(values.surname),
                                email: values.email,
                                whatsapp: (values.whatsapp.length > 0) ? values.whatsapp : null,
                                address,
                                password: (values.password.length > 0) ? values.password : null,
                                newPassword: (values.newpassword.length > 0) ? values.newpassword : null
                            }
                            
                            await api.put(`users/${user?.id}`, profileData)
                                .then(function(response) {
                                    if(response.status === 200) {
                                        const newUser = {
                                            id: user?.id,
                                            name: profileData.name,
                                            surname: profileData.surname,
                                            email: profileData.email,
                                            whatsapp: profileData.whatsapp,
                                            address: (checkProperties(address)) ? address : user?.address
                                        }
                                        localStorage.setItem('@peres-moveis-planejados/user', JSON.stringify(newUser));
                                        setMessage("Atualizado com sucesso");
                                        setSuccess(true);
                                        setOpen(true);
                                        //window.location.reload();
                                    }
                                    
                                })
                                .catch(function(error) {
                                    console.log(error);
                                    if(error.response.status === 409) {
                                        setMessage("E-mail já utilizado");
                                        setOpen(true);
                                    }
                                    else {
                                        console.log(error.response);
                                        setMessage("Erro ao atualizar");
                                        setOpen(true);
                                    }
                                });
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            isValid
                        }) => (
                            <Form className="profile">
                                <div className="field-group">
                                    <div className="field">
                                        <label htmlFor="name">Nome</label>
                                        <Field 
                                            type="text"
                                            name="name"
                                            id="name"
                                            className={!(errors.name && touched.name) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="name" 
                                            className="error=message"
                                        />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="surname">Sobrenome</label>
                                        <Field
                                            type="text"
                                            name="surname"
                                            id="surname"
                                            className={!(errors.surname && touched.surname) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="surname" 
                                            className="error=message"
                                        />
                                    </div>
                                </div>

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
                                </div>

                                <div className="field-group">
                                    <div className="field">
                                        <label htmlFor="cep">CEP</label>
                                        <Field 
                                            type="text"
                                            name="cep"
                                            id="cep"
                                            className={!(errors.cep && touched.cep) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="cep" 
                                            className="error=message"
                                        />
                                    </div>
                                </div>

                                <div className="field-group">
                                    <div className="field">
                                        <label htmlFor="uf">UF</label>
                                        <MyField 
                                            type="text"
                                            name="uf"
                                            id="uf"
                                            className={!(errors.uf && touched.uf) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="uf" 
                                            className="error=message"
                                        />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="localidade">Cidade</label>
                                        <MyField 
                                            type="text"
                                            name="localidade"
                                            id="localidade"
                                            className={!(errors.localidade && touched.localidade) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="localidade" 
                                            className="error=message"
                                        />
                                    </div>
                                </div>

                                <div className="field-group">
                                    <div className="field">
                                        <label htmlFor="bairro">Bairro/Região Administrativa</label>
                                        <MyField 
                                            name="bairro"
                                            type="text"
                                            id="bairro"
                                            className={!(errors.bairro && touched.bairro) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="bairro" 
                                            className="error=message"
                                        />
                                    </div>
                                </div>

                                <div className="field-group">
                                    <div className="field">
                                        <label htmlFor="logradouro">Logradouro</label>
                                        <MyField 
                                            type="text"
                                            name="logradouro"
                                            id="logradouro"
                                            className={!(errors.logradouro && touched.logradouro) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="logradouro" 
                                            className="error=message"
                                        />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="num">Número</label>
                                        <Field 
                                            type="text"
                                            name="num"
                                            id="num"
                                            className={!(errors.num && touched.num) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="num" 
                                            className="error=message"
                                        />
                                    </div>
                                </div>

                                <div className="field-group">
                                    <div className="field">
                                        <label htmlFor="complemento">Complemento (opcional)</label>
                                        <MyField 
                                            type="text"
                                            name="complemento"
                                            id="complemento"
                                            className={!(errors.complemento && touched.complemento) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="complemento" 
                                            className="error=message"
                                        />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="referencia">Referência (opcional)</label>
                                        <Field 
                                            type="text"
                                            name="referencia"
                                            id="referencia"
                                            className={!(errors.referencia && touched.referencia) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="referencia" 
                                            className="error=message"
                                        />
                                    </div>
                                </div>

                                <div className="field-group">
                                    <div className="field">
                                        <label htmlFor="whatsapp">Whatsapp</label>
                                        <Field 
                                            type="text"
                                            name="whatsapp"
                                            id="whatsapp"
                                            className={!(errors.whatsapp && touched.whatsapp) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="whatsapp" 
                                            className="error=message"
                                        />
                                    </div>
                                </div>

                                <div className="field-group">
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

                                    <div className="field">
                                        <label htmlFor="newpassword">Nova senha</label>
                                        <Field 
                                            type="password"
                                            name="newpassword"
                                            id="newpassword"
                                            className={!(errors.newpassword && touched.newpassword) ? "input-style" : "input-style incorrect"}
                                        />
                                        <ErrorMessage 
                                            component="span" 
                                            name="newpassword" 
                                            className="error=message"
                                        />
                                    </div>
                                </div>

                                <button className="schedule" type="submit">Salvar</button>
                                <MessageModal 
                                    message={message}
                                    open={open}
                                    icon={ success ? <Success width="80px" height="80px"/> : <Fail width="80px" height="80px"/> }
                                />
                            </Form>
                        )}
                    </Formik>
                </FormBox>

                
            </Content>
        </Page>
    );
}

export default Profile;