export class DBError extends Error {
  constructor() {
    super('Something went wrong on our side');
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('Entity not found');
  }
}
export class ConflictError extends Error {}
