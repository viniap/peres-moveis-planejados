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

        const emailExist = await knex.select(['id'])
            .from('users')
            .where({ email });

        if(emailExist.length > 0){
            return response.status(409).json({ error: 'E-mail already used' })
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
                message: 'Registered successfully',
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
            
            await bcrypt.compare(password, user[0].password, async (errBcrypt, result) => {

                if(errBcrypt){
                    return response.status(401). json({ message: 'Authentication failure' });
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

                    if(user[0].address_id != null) {
                        const address = await knex('adresses').where('id', user[0].address_id);

                        const userData = {
                            id: user[0].id,
                            name: user[0].name,
                            surname: user[0].surname,
                            email: user[0].email,
                            whatsapp: user[0].whatsapp,
                            address: {
                                cep: address[0].cep,
                                uf: address[0].uf,
                                localidade: address[0].localidade,
                                bairro: address[0].bairro,
                                logradouro: address[0].logradouro,
                                num: address[0].num,
                                complemento: address[0].complemento,
                                referencia: address[0].referencia
                            },
                        }

                        return response.status(200).json({ 
                            message: 'Authentication succeeded',
                            token,
                            user: userData
                        });
                    }
                    
                    const userData = {
                        id: user[0].id,
                        name: user[0].name,
                        surname: user[0].surname,
                        email: user[0].email,
                        whatsapp: user[0].whatsapp,
                        address: null,
                    }
                
                    return response.status(200).json({ 
                        message: 'Authentication succeeded',
                        token,
                        user: userData
                    });

                }

                return response.status(401).json({ message: 'Authentication failure' });

            });

        }
        else{

            return response.status(401).json({ message: 'Authentication failure' });

        }

    }

    async update(request: Request, response: Response) {

        function checkProperties(obj: any) {
            for (var key in obj) {
                if(key != "complemento" && key != "referencia"){
                    if (obj[key] === null)
                        return false;
                }
            }
            return true;
        }

        const id = request.params.id;

        const {
            name,
            surname,
            email,
            whatsapp,
            address,
            password,
            newPassword
        } = request.body;

        const currentEmail = await knex.select('email')
            .from('users')
            .where({ id });

        if(currentEmail[0].email != email){
            const emailExist = await knex.select(['id'])
                .from('users')
                .where({ email });

            if(emailExist.length > 0){
                return response.status(409).json({ error: 'E-mail already used' })
            }
        }

        if((!password) && (!newPassword)) {        

            if(!(checkProperties(address))) {
                await knex('users')
                .where({ id })
                .update({
                    name,
                    surname,
                    email,
                    whatsapp,
                    password: undefined,
                    address_id: undefined
                });

                return response.status(200).json({ message: 'Update successfully' });
            }
            else {
                const user = await knex('users').where({ id });

                if(user[0].address_id != null){
                    await knex('adresses')
                    .where('id', user[0].address_id)
                    .update({
                        cep: address.cep,
                        uf: address.uf,
                        localidade: address.localidade,
                        bairro: address.bairro,
                        logradouro: address.logradouro,
                        num: address.num,
                        complemento: address.complemento,
                        referencia: address.referencia
                    });

                    await knex('users')
                    .where({ id })
                    .update({
                        name,
                        surname,
                        email,
                        whatsapp,
                        password: undefined,
                        address_id: undefined
                    });

                    return response.status(200).json({ message: 'Update successfully' });
                }
                else{
                    const addressId = await knex('adresses').insert({
                        cep: address.cep,
                        uf: address.uf,
                        localidade: address.localidade,
                        bairro: address.bairro,
                        logradouro: address.logradouro,
                        num: address.num,
                        complemento: address.complemento,
                        referencia: address.referencia
                    });

                    await knex('users')
                    .where({ id })
                    .update({
                        name,
                        surname,
                        email,
                        whatsapp,
                        password: undefined,
                        address_id: addressId[0]
                    });

                    return response.status(200).json({ message: 'Update successfully' });
                }
            }
        }
        else if(password && newPassword) {

            const user = await knex('users').where({ id });

            await bcrypt.compare(password, user[0].password, async (errBcrypt1, result) => {

                if(errBcrypt1){
                    return response.status(500). json({ error: errBcrypt1 });
                }

                if(result){

                    await bcrypt.hash(newPassword, 10, async (errBcrypt2, passwordHash) => {

                        if(errBcrypt2){
                            return response.status(500).json({ error: errBcrypt2 });
                        }
            
                        if(!(checkProperties(address))) {
                            await knex('users')
                            .where({ id })
                            .update({
                                name,
                                surname,
                                email,
                                whatsapp,
                                password: passwordHash,
                                address_id: undefined
                            });

                        }
                        else {
                            if(user[0].address_id != null){
                                await knex('adresses')
                                .where('id', user[0].address_id)
                                .update({
                                    cep: address.cep,
                                    uf: address.uf,
                                    localidade: address.localidade,
                                    bairro: address.bairro,
                                    logradouro: address.logradouro,
                                    num: address.num,
                                    complemento: address.complemento,
                                    referencia: address.referencia
                                });
            
                                await knex('users')
                                .where({ id })
                                .update({
                                    name,
                                    surname,
                                    email,
                                    whatsapp,
                                    password: passwordHash,
                                    address_id: undefined
                                });
                            }
                            else{
                                const addressId = await knex('adresses').insert({
                                    cep: address.cep,
                                    uf: address.uf,
                                    localidade: address.localidade,
                                    bairro: address.bairro,
                                    logradouro: address.logradouro,
                                    num: address.num,
                                    complemento: address.complemento,
                                    referencia: address.referencia
                                });
            
                                await knex('users')
                                .where({ id })
                                .update({
                                    name,
                                    surname,
                                    email,
                                    whatsapp,
                                    password: passwordHash,
                                    address_id: addressId[0]
                                });
                            }
                        }
                        return response.status(200).json({ message: 'Update successfully' });
                    });
                }
                else {
                    return response.status(401).json({ message: 'Authentication failure' });
                }
            });
        }
        else {
            return response.status(400).json({ message: "Missing information" });
        }
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