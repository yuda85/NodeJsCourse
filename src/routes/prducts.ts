import { NextFunction, Request, Response, Router } from 'express';
import { generateId } from '../utils/id-helper';
import { getRandomCategoryIndex } from '../utils/id-helper';
import procutsData from '../assets/products.json';
import categoryData from '../assets/categories.json';

export interface Product {
  name: string;
  id: string;
  categoryId: string;
  itemInStock: boolean;
}

const products: Product[] = procutsData;

const categoryIds: string[] = categoryData.map((category) => category.id);

const router = Router();

const resolveProductHandler = (req: Request, res: Response, next: NextFunction): void => {
  const productId = req.params.id;
  console.log(req.params);
  const productIndex = products.findIndex((u) => u.id === productId);
  if (productIndex < 0) {
    res.sendStatus(404);
    return;
  }
  if (productId.length < 36) {
    res.sendStatus(400);
    return;
  }
  res.locals.productIndex = productIndex;
  res.locals.product = products[productIndex];
  next();
};

router.get('/', (req, res) => res.send(products));

router.post('/', (req, res) => {
  const newProduct: Product = {
    id: generateId(),
    name: req.query.productName as string,
    categoryId: categoryIds[getRandomCategoryIndex(categoryIds)],
    itemInStock: true,
  };
  products.push(newProduct);

  res.status(201).send(newProduct);
});

router.get('/:id', resolveProductHandler, (req, res) => {
  res.send(res.locals.product);
});

router.put('/:id', resolveProductHandler, (req, res) => {
  const product = products[res.locals.productIndex] as Product;
  const isItemInStock: boolean = !!req.query.itemInStock;
  product.itemInStock = isItemInStock;
  Object.assign(res.locals.product, product);
  res.send(res.locals.user);
});

router.delete('/:id', resolveProductHandler, (req, res) => {
  products.splice(res.locals.userIndex, 1);
  res.sendStatus(204);
});

export { router };
