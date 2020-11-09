import { NextFunction, Request, Response, Router } from 'express';
import { generateId } from '../utils/id-helper';
import categoryData from '../assets/categories.json';
import procutsData from '../assets/products.json';
import { Product } from './prducts';

interface Category {
  name: string;
  id: string;
}

const categories: Category[] = categoryData;

const router = Router();

const resolveCategoryHandler = (req: Request, res: Response, next: NextFunction): void => {
  const categoryId = req.params.id;
  const categoryIndex = categories.findIndex((u) => u.id === categoryId);
  if (categoryIndex < 0) {
    res.sendStatus(404);
    return;
  }
  if (categoryId.length !== 36) {
    res.sendStatus(400);
    return;
  }
  res.locals.categoryIndex = categoryIndex;
  res.locals.category = categories[categoryIndex];
  res.locals.categoryId = categoryId;
  next();
};

router.get('/', (req, res) => res.send(categories));

router.post('/', (req, res) => {
  const newCategory: Category = {
    id: generateId(),
    name: req.query.categoryName as string,
  };
  categories.push(newCategory);

  res.status(201).send(newCategory);
});

router.get('/:id', resolveCategoryHandler, (req, res) => {
  res.send(res.locals.product);
});

router.get('/:id/products', resolveCategoryHandler, (req, res) => {
  const categoryProducts: Product[] = procutsData.filter((product) => product.categoryId === res.locals.categoryId);

  res.send(categoryProducts);
});

router.put('/:id', resolveCategoryHandler, (req, res) => {
  const product: Category = categories[res.locals.productIndex];
  const newCategoryName: string = req.query.categoryName as string;
  product.name = newCategoryName;
  Object.assign(res.locals.category, product);
  res.send(res.locals.user);
});

router.delete('/:id', resolveCategoryHandler, (req, res) => {
  categories.splice(res.locals.categoryIndex, 1);
  res.sendStatus(204);
});

export { router };
