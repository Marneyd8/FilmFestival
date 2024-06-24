import { Result } from '@badrap/result';
import client from '../prisma_client';
import { DbResult } from '../types';
import { DBError, NotFoundError } from '../errors';
import { Category } from './category_types';

async function create(name: string): DbResult<Category> {
  try {
    const res = await client.category.create({
      data: { name }
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function update(id: number, name: string): DbResult<Category> {
  try {
    const res = await client.category.update({
      where: { id },
      data: { name }
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function read(id: number): DbResult<Category> {
  try {
    const res = await client.category.findUnique({
      where: { id }
    });
    if (res) return Result.ok(res);
    return Result.err(new NotFoundError());
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function readAll(): DbResult<Category[]> {
  try {
    const res = await client.category.findMany({});
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function remove(id: number): DbResult<Category> {
  try {
    const res = await client.category.delete({
      where: { id }
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function addFilms(filmIds: number[], categoryId: number): DbResult<Category> {
  try {
    const res = await client.category.update({
      where: {
        id: categoryId
      },
      data: {
        films: {
          connect: filmIds.map((x) => {
            return { id: x };
          })
        }
      }
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function removeFilms(filmIds: number[], categoryId: number): DbResult<Category> {
  try {
    const res = await client.category.update({
      where: {
        id: categoryId
      },
      data: {
        films: {
          disconnect: filmIds.map((x) => {
            return { id: x };
          })
        }
      }
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function searchByName(name: string): DbResult<Category[]> {
  try {
    const res = await client.category.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function getCategoriesWithFilms(): DbResult<Category[]> {
  try {
    const res = await client.category.findMany({
      include: {
        films: true
      }
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}


const categoryRepository = {
  create,
  update,
  read,
  readAll,
  remove,
  addFilms,
  removeFilms,
  searchByName,
  getCategoriesWithFilms
};

export default categoryRepository;
