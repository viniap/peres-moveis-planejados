import React, { ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import './RegisterModal.css'
import api from '../../services/api'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 800,
      height: 350,
      backgroundColor: '#fff',
      border: '2px solid',
      borderImageSource: 'linear-gradient(180deg, #009BFF, #E31111)',
      borderImageSlice: 1,
      //boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 'none'
    },
  }),
);

export default function RegisterModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [inputData, setInputData] = React.useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target;

    setInputData({ ...inputData, [name]: value })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, surname, email, password } = inputData;

    const data = {
      name,
      surname,
      email,
      password
    };

    await api.post('users', data);

    alert('Usuário cadastrado com sucesso');

    history.push('/');
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Cadastro</h2>

      <form onSubmit={handleSubmit}>
          <div className="field-group">
              <div className="field">
                  <label htmlFor="name">Nome</label>
                  <input 
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleInputChange}
                  />
              </div>

              <div className="field">
                  <label htmlFor="surname">Sobrenome</label>
                  <input 
                      type="text"
                      name="surname"
                      id="surname"
                      onChange={handleInputChange}
                  />
              </div>
          </div>

          <div className="field-group">
              <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input 
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleInputChange}
                  />
              </div>

              <div className="field">
                  <label htmlFor="password">Senha</label>
                  <input 
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleInputChange}
                  />
              </div>
          </div>

          <button className="submitData" type="submit">Cadastrar</button>
      </form>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Cadastre-se
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
