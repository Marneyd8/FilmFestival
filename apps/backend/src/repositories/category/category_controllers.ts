import { Request, Response } from 'express';
import categoryRepository from './category_repository';
import { handleRepositoryErrors, parseRequest } from '../../utils';
import {
  createCategoryRequestSchema,
  deleteCategoryRequestSchema,
  getCategoryRequestSchema,
  updateCategoryRequestSchema,
} from './category_schemas';

const getSingleCategory = async (req: Request, res: Response) => {
  const request = await parseRequest(getCategoryRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;

  const category = await categoryRepository.read(id);
  if (category.isErr) {
    handleRepositoryErrors(category.error, res);
    return;
  }
  if (category.isOk)
    res.status(200).send({ item: category.value, message: 'OK' });
};

const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await categoryRepository.readAll();
  if (categories.isErr) {
    handleRepositoryErrors(categories.error, res);
    return;
  }
  if (categories.isOk)
    res.status(200).send({ items: categories.value, message: 'OK' });
};

const createSingleCategory = async (req: Request, res: Response) => {
  console.log(req.body);

  const request = await parseRequest(createCategoryRequestSchema, req, res);
  if (request === null) return;

  const category = request.body;

  const newCategory = await categoryRepository.create(category.name);
  if (newCategory.isErr) {
    handleRepositoryErrors(newCategory.error, res);
    return;
  }
  if (newCategory.isOk)
    res.status(201).send({ item: newCategory.value, message: 'OK' });
};

const updateSingleCategory = async (req: Request, res: Response) => {
  const request = await parseRequest(updateCategoryRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;
  const category = request.body;

  const updated = await categoryRepository.update(id, category.name);
  if (updated.isErr) {
    handleRepositoryErrors(updated.error, res);
    return;
  }
  if (updated.isOk)
    res.status(200).send({ item: updated.value, message: 'OK' });
};

const deleteSingleCategory = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteCategoryRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;

  const confirmation = await categoryRepository.remove(id);
  if (confirmation.isErr) {
    handleRepositoryErrors(confirmation.error, res);
    return;
  }

  res.status(200).send({ item: null, message: 'OK' });
};

export const categoriesController = {
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
  createSingleCategory,
};
