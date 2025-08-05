import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
    
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }
        
        const {filename: path} = request.file;
        const {name} = request.body;

        const categoryExists = await Category.findOne({
            where:{
                name,
            },
        });

            if (categoryExists){
                return response.status(400).json({error: 'Category alredy exists'});
            }

        const {id} = await Category.create({
            name,
            path,
        });

        return response.status(201).json({id, name});
    }

     
    async update(request, response) {
        const schema = Yup.object({
            name: Yup.string(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }
        
        const {id} = request.params;
        
        const categoryExists = await Category.findByPk(id);
        
        if (!categoryExists) {
            return response.status(400)
            .json({ error: 'Category not found' });
        }

        let path;
        if (request.file) {
            path = request.file.filename;
        }

        const {name} = request.body;
        

            if(name){
                
        const categoryNameExists = await Category.findOne({
            where:{
                name,
            },
        });

            if (categoryNameExists && categoryNameExists.id !== id) {
                return response.status(400).json({error: 'Category alredy exists'});
            }
            }

        await Category.update({
            name,
            path,
        },
        {
            where: { id },
        });


        return response.status(201).json({id, name});
    }

    async index(request, response) {
        const categories = await Category.findAll();
        return response.json(categories);
    }
}

export default new CategoryController();

