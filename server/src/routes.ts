import { auth } from './middlewares/auth';
import UserController from './controller/UserController';
import ImageController from './controller/ImageController';
import { Router } from 'express';

const routes = Router();
const userController = new UserController();
const imageController = new ImageController();

// Listar imagens do Portfólio
routes.get('/images', imageController.index);

// Cadastrar o usuário
routes.post('/users', userController.create);

// Autenticar o usuário (iniciar sessão)
routes.post('/users/session', userController.auth);

routes.delete('/users/:id', userController.delete);

routes.get('/users/:id', userController.show);

routes.put('/users/:id', userController.update);

routes.use(auth);

export default routes;