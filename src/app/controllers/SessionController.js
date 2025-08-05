import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User.js';
import authConfig from '../../config/auth.js';

class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Payload com admin incluído
    const payload = { id: user.id, name: user.name, admin: user.admin };

    const accessToken = jwt.sign(payload, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    const refreshToken = jwt.sign(payload, authConfig.refresh.secret, {
      expiresIn: authConfig.refresh.expiresIn,
    });

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
      accessToken,
      refreshToken,
    });
  }

  async refresh(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Token de refresh não fornecido' });
    }

    try {
      const decoded = jwt.verify(refreshToken, authConfig.refresh.secret);

      // Buscar dados atualizados do banco (recomendado)
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      // Usar dados atualizados do banco - sempre inclui admin
      const payload = { 
        id: user.id, 
        name: user.name, 
        admin: user.admin // Sempre atualizado do banco
      };

      const newAccessToken = jwt.sign(payload, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.expiresIn,
      });

      return res.json({ 
        accessToken: newAccessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          admin: user.admin,
        }
      });

    } catch (err) {
      return res.status(401).json({ error: 'Token de refresh inválido' });
    }
  }
}

export default new SessionController();
