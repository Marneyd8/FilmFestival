import type { Request, Response } from 'express';
import { ZodSchema, ZodTypeDef } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ConflictError, DBError, NotFoundError } from './repositories/errors';

export class UnimplementedError extends Error {
  public name = "UnimplementedError";
  public message = "This feature is not implemented yet.";
}

export class InternalError extends Error {
  public name = "InternalError";
  public message = "Something went wrong on our side.";
}


export const handleRepositoryErrors = (e: Error, res: Response) => {
  if (e instanceof NotFoundError) {
    res.status(404).send({
      name: e.name || 'NotFoundError',
      message: e.message || 'Entity not found',
    });
  } else if (e instanceof DBError) {
    res.status(500).send({
      name: e.name || 'InternalError',
      message: e.message || 'Something went wrong on our side.',
    });
  } else if (e instanceof ConflictError) {
    res.status(400).send({
      name: e.name || 'ConflictError',
      message: e.message || 'Conflict',
    });
  } else {
    res.status(500).send({
      name: 'UnknownError',
      message: 'Something went wrong.',
    });
  }
};

export const parseRequest = async <
  Output,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output
>(
  schema: ZodSchema<Output, Def, Input>,
  req: Request,
  res: Response
) => {
  const parsedRequest = await schema.safeParseAsync(req);

  if (!parsedRequest.success) {
    const error = fromZodError(parsedRequest.error);
    const errorResponse: Error = {
      name: 'ValidationError',
      message: error.message,
    };
    res.status(400).send(errorResponse);
    return null;
  }

  return parsedRequest.data;
};
