import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './RegisterModal.css'

import api from '../../services/api'
import { ReactComponent as Close } from '../../assets/close.svg'
import { ReactComponent as Success } from '../../assets/success.svg'
import { ReactComponent as Fail } from '../../assets/fail.svg'
import RegisterFormSchema from '../../schemas/RegisterFormSchema';

function titleCaseWord(word: string) {
  if (!word) return word;
  return word.replace(
    /\w\S*/g,
    function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export default function RegisterModal() {
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmit] = React.useState(false);
  const [failed, setFail] = React.useState([false, 0]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubmit(false);
    setFail([false, 0]);
  };

  const body = (
    <div className="modal-box">
      <div className="header">
        <h2 id="simple-modal-title">Cadastro</h2>

        <span className="close" onClick={handleClose}>
          <Close width="20px"/>
        </span>
      </div>

      <Formik
          initialValues={{name: "", surname: "", email: "", password: ""}}
          validationSchema={RegisterFormSchema}
          onSubmit={async (values, actions) => {
            const { 
              name, 
              surname, 
              email, 
              password } = values;

            const data = {
              name: titleCaseWord(name),
              surname: titleCaseWord(surname),
              email,
              password
            };

            await api.post('users', data)
              .then(function(response) {
                if(response.status === 201) {
                  setSubmit(true);
                }
              })
              .catch(function(error) {
                setFail([true, error.response.status]);
              });
          }}
      >
          {({
              values,
              errors,
              touched,
              isValid
          }) => (
            <Form className="register">
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
                </div>
      
                <button className="submitData" type="submit" disabled={!isValid}>Cadastrar</button>
            </Form>
          )}
      </Formik>

    </div>
  );

  const success = (
    <div className="modal-box success">
      <div className="header">
        <span className="close" onClick={handleClose}>
          <Close width="20px"/>
        </span>
      </div>

      <span className="success">
        <Success width="80px" height="80px"/>
        <h3>Cadastro efetuado com sucesso</h3>
      </span>
    </div>
  );

  const fail = (
    <div className="modal-box success">
      <div className="header">
        <span className="close" onClick={handleClose}>
          <Close width="20px"/>
        </span>
      </div>

      <span className="success">
        <Fail width="80px" height="80px"/>
        <h3>{ (failed[1] === 409) ? "E-mail já cadastrado" : "Erro interno no servidor" }</h3>
      </span>
    </div>
  );

  return (
    <div>
      <button className="register" type="button" onClick={handleOpen}>
        Cadastre-se
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {submitted ? success : (failed[0] ? fail : body)}
      </Modal>
    </div>
  );
}
