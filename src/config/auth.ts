import authJwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as authConstants from "../constants/constants";
const authEnv = require("../.env");

export default (req: Request, res: Response, next: NextFunction) => {
  // CORS preflight request
  if (req.method === authConstants.HTTP_OPTIONS) {
    next();
  } else {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers[authConstants.AUTHORIZATION];
    if (!token) {
      return res
        .status(403)
        .send({ errors: [authConstants.NO_TOKEN_PROVIDED] });
    }
    authJwt.verify(
      token,
      authEnv.authSecret,
      function (err: any, decoded: any) {
        if (err) {
          return res.status(403).send({
            errors: [authConstants.FAILED_AUTH_TOKEN],
          });
        } else {
          req.decoded = decoded;
          next();
        }
      }
    );
  }
};
