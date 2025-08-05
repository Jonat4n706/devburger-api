import User from '../models/User.js';

export default async function isAdmin(req, res, next) {
  const user = await User.findByPk(req.userId);

  if (!user) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  if (!user.admin) {
    return res.status(403).json({ error: 'Acesso negado: apenas administradores podem realizar essa ação.' });
  }

  return next();
}
