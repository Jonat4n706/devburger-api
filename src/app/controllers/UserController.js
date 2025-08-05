import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/User.js';

class UserController {
  async store(req, res) {
   

    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Nome é obrigatório')
        .matches(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome não pode conter números ou caracteres especiais'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
      password: Yup.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('Senha é obrigatória'),
      admin: Yup.boolean(),
    });


    

try {
      await schema.validate(req.body, { abortEarly: false });

      const { name, email, password, admin } = req.body;

      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }



      const user = await User.create({
        id: uuidv4(),
        name,
        email,
        password, // Usado para acionar o hook que gera o password_hash
        admin,
      });

      // Retornando apenas os dados públicos
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        created_at: user.createdAt,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(400).json({
          error: 'Falha na validação',
          messages: err.errors,
        });
      }

      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new UserController();
