import { Request, Response } from "express"
import { Product, productModel } from "../models/products";
import { 
  badRequest,
  internalServerError,
  notFound,
  ok,
  validateNumber
} from "../services/utils";

const insertProducts = (req: Request, res: Response) => {

  {
    const product = req.body;

    if (!product) {
      return badRequest(res, "Produto não informado!");
    }

    if (!product.name) {
      return badRequest(res, "Nome do produto não informado!");
    }

    if (!validateNumber(product.price)) {
      return badRequest(res, "Preço do produto não informado!");
    }
  }

  const product = req.body as Product;
  return productModel.insertProduct(product)
    .then(product => {
      res.json(product);
    })
    .catch(err => internalServerError(res, err));
}

const deleteProducts = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  {
    if (!validateNumber(id)) {
      return badRequest(res, "ID não informado");
    }

    const productSaved = await productModel.getProduct(id);
    if (!productSaved) {
      return notFound(res);
    }
  }

  return productModel.deleteProduct(id)
    .then(() => ok(res))
    .catch(err => internalServerError(res, err))
}

const listProducts = async (res: Response) => {
  return productModel.listProducts()
    .then((products) => {
      res.json(products);
    })
    .catch(err => internalServerError(res, err));
}

const updateProducts = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  {
    if (!validateNumber(id)) {
      return badRequest(res, "Id inválido.");
    }

    const product = req.body;

    if (!product) {
      return badRequest(res, "Produto não informado!");
    }

    if (!product.name) {
      return badRequest(res, "Nome do produto não informado!");
    }

    if (!validateNumber(product.price)) {
      return badRequest(res, "Preço do produto não informado!");
    }

    const productSaved = await productModel.getProduct(id);
    if (!productSaved) {
      return notFound(res);
    }
  }

  const product = req.body as Product;

  return productModel.updateProduct(product)
    .then((product) => {
      res.json(product);
    })
    .catch(err => internalServerError(res, err));
}

const getProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  {
    if (!validateNumber(id)) {
      return badRequest(res, "Id inválido");
    }

    const productSaved = await productModel.getProduct(id)
    if (!productSaved) {
      return notFound(res);
    }
  }

  return productModel.getProduct(id)
    .then((product) => res.json(product))
    .catch((err) => internalServerError(res, err))
}

export const productController = {
  insertProducts,
  listProducts,
  deleteProducts,
  updateProducts,
  getProduct,
}