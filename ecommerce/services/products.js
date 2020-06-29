const productsMock = require("../utils/mocks/products");
const MongoLib = require("../lib/mongo");

class ProductsService {
  constructor() {
    this.collection = "products";

    // MongoLib
    this.mongoDB = new MongoLib();
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  async getProduct({ productId }) {
    const product = this.mongoDB.get(this.collection, productId);
    return product || {}
  }

  async createProduct({ product }) {
    const productId = await this.mongoDB.create(this.collection, product)
    console.log("PRODUCT ID AFTER CREATION!", productId)
    return productId;
  }

  async updateProduct({ productId, product }) {
    const updatedProductId = await this.mongoDB.update(this.collection, productId, product)
    return updatedProductId;
  }

//   async modifyProduct({ productId, changes }) {
//     return Promise.resolve(productsMock[0]);
//   }

  async deleteProduct({ productId }) {
    const deletedProductId = await this.mongoDB.delete(this.collection, productId)
    return deletedProductId;
  }
}

module.exports = ProductsService;
