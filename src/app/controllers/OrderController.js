import * as Yup from 'yup';
import Order from '../schemas/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

class OrderController {
  async store(req, res) {
    const schema = Yup.object({
      products: Yup.array()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        )
        .required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const products = await Promise.all(
      req.body.products.map(async (item) => {
        const product = await Product.findByPk(item.id, {
          include: ['category'], // Certifique-se de que Product tem o associate com category
        });

        if (!product) {
          throw new Error(`Produto com ID ${item.id} não encontrado`);
        }

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category.name,
          url: `http://localhost:3001/product-file/${product.path}`,
          quantity: item.quantity,
        };
      })
    );

    const order = await Order.create({
      user: {
        id: user.id.toString(),
        name: user.name,
      },
      products,
      status: 'pendente',
    });

    return res.status(201).json(order);
  }

  async index(req, res) {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  }

  async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    return res.json(order);
  }
}

export default new OrderController();
