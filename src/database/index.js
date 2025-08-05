import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import config from '../config/config.js';

import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';


const models = [User, Product, Category];

class DataBase {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    const env = process.env.NODE_ENV || 'development';
    const dbConfig = config[env];

    const { database, username, password, ...rest } = dbConfig;

    this.connection = new Sequelize(database, username, password, rest);

    // Inicializa os modelos
    models.forEach(model => model.init(this.connection));

    // Associa os modelos, se aplicável
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
  mongo(){
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/devburger');
  }
}

export default new DataBase();
