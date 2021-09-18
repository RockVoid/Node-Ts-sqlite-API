import { Router } from 'express';
import { productController } from '../controllers/products';

const productRouter = Router();

productRouter.get('/', productController.listProducts);
productRouter.get('/:id', productController.getProduct);
productRouter.post('/', productController.insertProducts);
productRouter.put('/:id', productController.updateProducts);
productRouter.delete('/:id', productController.deleteProducts);

export {
  productRouter
};
