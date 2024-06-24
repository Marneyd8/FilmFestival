import BaseApi from './baseApi';
import {
  CategoryBase,
  CategoryUpdate,
  CategoryExtended,
  ApiRespMulti,
  ApiRespSingle,
  ApiRespMultiPaginated,
  ReqPagination,
  Category,
} from './types';

const CATEGORIES_PREFIX = '/categories';
const TYPE_BASIC = { type: 'basic' };

async function getCategoryById(
  id: string
): Promise<ApiRespSingle<CategoryExtended>> {
  return BaseApi.getSingle<CategoryExtended>(`${CATEGORIES_PREFIX}/${id}`);
}

async function getAllCategories(): Promise<ApiRespMulti<CategoryExtended>> {
  return BaseApi.getAll<CategoryExtended>(CATEGORIES_PREFIX);
}

async function getAllCategoriesBasic(): Promise<ApiRespMulti<Category>> {
  return BaseApi.getAll<Category>(CATEGORIES_PREFIX, {
    params: TYPE_BASIC,
  });
}

async function getAllCategoriesPaginated({
  page,
}: ReqPagination): Promise<ApiRespMultiPaginated<CategoryExtended>> {
  return BaseApi.getAllPaginated<CategoryExtended>(CATEGORIES_PREFIX, {
    params: { page },
  });
}

async function createCategory(
  payload: CategoryBase
): Promise<ApiRespSingle<CategoryExtended>> {
  return BaseApi.postSingle<CategoryExtended>(CATEGORIES_PREFIX, payload);
}

async function updateCategory(
  id: string,
  payload: CategoryUpdate
): Promise<ApiRespSingle<CategoryExtended>> {
  return BaseApi.putSingle<CategoryExtended>(
    `${CATEGORIES_PREFIX}/${id}`,
    payload
  );
}

async function deleteCategory(
  id: string
): Promise<ApiRespSingle<CategoryExtended>> {
  return BaseApi.deleteSingle<CategoryExtended>(`${CATEGORIES_PREFIX}/${id}`);
}

const CategoryApi = {
  getAllCategories,
  getCategoryById,
  getAllCategoriesBasic,
  getAllCategoriesPaginated,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default CategoryApi;
