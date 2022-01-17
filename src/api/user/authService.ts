import * as _ from "lodash";
import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./user");
const env = require("../../.env");
const serviceConstants = require("../../constants/constants");

const sendErrorsFromDB = (res: any, dbErrors: any) => {
  const errors: any[] = [];
  _.forIn(dbErrors.errors, (error: any) => errors.push(error.message));
  return res.status(400).json({ errors });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email || "";
  const password = req.body.password || "";
  User.findOne({ email }, (err: any, user: any) => {
    if (err) {
      return sendErrorsFromDB(res, err);
    } else if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ ...user }, env.authSecret, {
        expiresIn: "1 day",
      });
      const { name, email } = user;
      res.json({ name, email, token });
    } else {
      return res.status(400).send({ errors: [serviceConstants.LOGIN_ERROR] });
    }
  });
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || "";
  jwt.verify(token, env.authSecret, function (err: any, decoded: any) {
    return res.status(200).send({ valid: !err });
  });
};

const signup = (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name || "";
  const email = req.body.email || "";
  const password = req.body.password || "";
  const confirmPassword = req.body.confirm_password || "";

  if (!email.match(serviceConstants.EMAIL_REGEX)) {
    return res.status(400).send({ errors: [serviceConstants.INVALID_EMAIL] });
  }

  if (!password.match(serviceConstants.PASSWORD_REGEX)) {
    return res.status(400).send({
      errors: [serviceConstants.INVALID_PASSWORD],
    });
  }
  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(password, salt);

  if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
    return res
      .status(400)
      .send({ errors: [serviceConstants.PASSWORD_NOT_MATCH] });
  }

  User.findOne({ email }, (err: any, user: any) => {
    if (err) {
      return sendErrorsFromDB(res, err);
    } else if (user) {
      return res
        .status(400)
        .send({ errors: [serviceConstants.USER_ALREADY_EXISTS] });
    } else {
      const newUser = new User({ name, email, password: passwordHash });
      newUser.save((err: any) => {
        if (err) {
          return sendErrorsFromDB(res, err);
        } else {
          login(req, res, next);
        }
      });
    }
  });
};

module.exports = { login, signup, validateToken };
