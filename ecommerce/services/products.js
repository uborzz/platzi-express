const productsMock = require("../utils/mocks/products");
const MongoLib = require("../lib/mongo");

class ProductsService {
  constructor() {
    this.collection = "products";

    // MongoLib
    this.mongoDB = new MongoLib();
  }

  getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  getProduct({ productId }) {
    return Promise.resolve(productsMock[0]);
  }

  createProduct({ product }) {
    return Promise.resolve(productsMock[1]);
  }

  updateProduct({ productId, product }) {
    return Promise.resolve(productsMock[0]);
  }

  modifyProduct({ productId, changes }) {
    return Promise.resolve(productsMock[0]);
  }

  deleteProduct({ productId }) {
    return Promise.resolve(productsMock[0]);
  }
}

module.exports = ProductsService;
