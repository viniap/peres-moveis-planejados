import {Request, Response} from 'express';
import knex from '../database/connection';


class ImageController {

    async index(request: Request, response: Response) {

        const images = await knex('images').select('*');

        const serializedImages = images.map(image => {

            return {

                title: image.title,
                class: image.class,
                image: `http://localhost:3333/uploads/${image.image}`

            };

        });

        return response.json(serializedImages);

    }

}

export default ImageController;