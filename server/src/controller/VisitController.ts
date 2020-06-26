import {Request, Response} from 'express';
import knex from '../database/connection';

class VisitController {

    async create(request: Request, response: Response) {

        const { 
            user_id,
            address,
            whatsapp,
            datetime,
            description,
            image
        } = request.body;

        const user = await knex('users').where('id', user_id);

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
            .where('id', user_id)
            .update({
                name: undefined,
                surname: undefined,
                email: undefined,
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
            .where('id', user_id)
            .update({
                name: undefined,
                surname: undefined,
                email: undefined,
                whatsapp,
                password: undefined,
                address_id: addressId[0]
            });
        }
        
        await knex('visits').insert({
            user_id,
            datetime,
            description,
            image
        });

        return response.status(201).json({ message: "Agendamento de visita realizado com sucesso" });
    }


}

export default VisitController;