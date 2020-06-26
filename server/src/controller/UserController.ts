import {Request, Response} from 'express';
import knex from '../database/connection';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class UserController {

    async create(request: Request, response: Response) {

        const { 
            name,
            surname,
            email,
            password
        } = request.body;

        const emailExist = await knex.select(['*']).from('users').where('email', email);

        if(emailExist.length > 0){
            return response.status(409).json({ message: 'E-mail já cadastrado' })
        }

        await bcrypt.hash(password, 10, async (errBcrypt, passwordHash) => {

            if(errBcrypt){
                return response.status(500).json({ error: errBcrypt });
            }

            const userId = await knex('users').insert({
                name,
                surname,
                email,
                password: passwordHash,
            });

            return response.status(201).json({
                message: 'Cadastro efetuado com sucesso',
                user: {
                    id: userId[0],
                    name,
                    surname,
                    email,
                }
            })

        });

    }

    async auth(request: Request, response: Response) {

        const {
            email,
            password
        } = request.body;

        const user = await knex('users').where({ email });

        if(user.length > 0){
            
            await bcrypt.compare(password, user[0].password, (errBcrypt, result) => {

                if(errBcrypt){
                    return response.status(401). json({ message: 'Falha na autenticação' });
                }

                if(result){

                    const token = jwt.sign({

                        id: user[0].id, 
                        email: user[0].email 
                    
                    }, 
                    String(process.env.APP_SECRET), 
                    {

                        expiresIn: '2h'

                    });
                
                    const data = {
                        id: user[0].id,
                        name: user[0].name,
                        surname: user[0].surname,
                        email: user[0].email,
                        whatsapp: user[0].whatsapp,
                        address_id: user[0].address_id,
                        token
                    }
                
                    return response.status(200).json({ 
                        message: 'Autenticação efetuada com sucesso',
                        user: data
                    });

                }

                return response.status(401).json({ message: 'Falha na autenticação' });

            });

        }
        else{

            return response.status(401).json({ message: 'Falha na autenticação' });

        }

    }

    async update(request: Request, response: Response) {

        const id = request.params.id;

        const {
            name,
            surname,
            email,
            whatsapp,
            address
        } = request.body;

        const user = await knex('users').where('id', id);

        if(user[0].address_id != null){
            await knex('adresses')
            .where('id', user[0].address_id)
            .update({
                cep: address.cep,
                state: address.state,
                city: address.city,
                neighborhood: address.neighborhood,
                street: address.street,
                num: address.number,
                reference: address.reference
            });

            await knex('users')
            .where('id', id)
            .update({
                name,
                surname,
                email,
                whatsapp,
                password: undefined,
                address_id: undefined
            });
        }
        else{
            const addressId = await knex('adresses').insert({
                cep: address.cep,
                state: address.state,
                city: address.city,
                neighborhood: address.neighborhood,
                street: address.street,
                num: address.number,
                reference: address.reference
            });

            await knex('users')
            .where('id', id)
            .update({
                name,
                surname,
                email,
                whatsapp,
                password: undefined,
                address_id: addressId[0]
            });
        }

        return response.status(200).json({
            message: 'Atualização efetuada com sucesso',
            user: {
                id,
                name,
                surname,
                email,
                whatsapp,
                address
            }
        })

    }

    //TODO: Listar também orçamentos, projetos e visitas.
    //      Tratar erro do id não existente.
    async show(request: Request, response: Response) {

        const id = request.params.id;

        const user = await knex('users').where('id', id);

        const address = await knex('adresses').where('id', user[0].address_id);

        const userInfo = {
            id: user[0].id,
            name: user[0].name,
            surname: user[0].surname,
            email: user[0].email,
            whatsapp: user[0].whatsapp,
            address: address[0]
        }

        return response.status(200).json(userInfo);
        
    }

    //TODO: Deletar orçamentos, projetos e visitas do usuário
    async delete(request: Request, response: Response) {

        const id = request.params.id;

        const address_id = await knex.select('address_id').from('users').where('id', id);

        if(address_id[0] != null){
            await knex('adresses').where('id', address_id[0]).del();
        }

        await knex('users').where('id', id).del();

        return response.status(200).json({ message: 'Usuário deletado com sucesso' });

    }

}

export default UserController;