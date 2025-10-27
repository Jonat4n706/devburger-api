import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController.js';


import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';



import authMiddleware from './app/middlewares/authMiddleware.js';
import isAdmin from './app/middlewares/isAdmin.js';

import multerConfig from './config/multer.js';

const upload = multer(multerConfig);

const routes = new Router();

// Rotas públicas
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middleware de autenticação
routes.use(authMiddleware);

// Rotas protegidas (somente autenticado)
routes.post('/orders', OrderController.store);     
routes.get('/orders', isAdmin, OrderController.index);
routes.put('/orders/:id', isAdmin, OrderController.updateStatus);

// Admin: produtos
routes.post('/products', isAdmin, upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index); 
routes.put('/products/:id', isAdmin, upload.single('file'), ProductController.update);

// Admin: categorias
routes.post('/categories', isAdmin, upload.single('file'), CategoryController.store);
routes.get('/categories', CategoryController.index); 
routes.put('/categories/:id', isAdmin, upload.single('file'), CategoryController.update);

routes.post('/create-payment-intent', CreatePaymentIntentController.store);


export default routes;
