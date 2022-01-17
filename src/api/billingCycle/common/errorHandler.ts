import { Request, Response, NextFunction } from "express";
import * as _ from "lodash";

const parseErrors = (nodeRestfulErrors: any) => {
  const errors: any[] = [];
  _.forIn(nodeRestfulErrors, (error: any) => errors.push(error.message));
  return errors;
};

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const bundle = res.locals.bundle;

  if (bundle.errors) {
    const errors = parseErrors(bundle.errors);
    res.status(500).json({ errors });
  } else {
    next();
  }
};
