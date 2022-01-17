const env = require("../.env");
export const BASE_URL = `mongodb+srv://${env.dbUser}:${env.dbPassword}@my-money-cluster.kzxuo.mongodb.net/mymoney?retryWrites=true&w=majority`;
export const LOGIN_ERROR = "Invalid User/Password";
export const USER_ALREADY_EXISTS = "User already exists.";
export const PASSWORD_NOT_MATCH = "Passwords do not match.";
export const INVALID_EMAIL = "Invalid email";
export const INVALID_PASSWORD =
  "The password must have: Capital letter, Lower case letter, a number, special charactere(@#$%) and size between 6-20.";
export const HTTP_OPTIONS = "OPTIONS";
export const HTTP_POST = "POST";
export const HTTP_GET = "GET";
export const HTTP_PUT = "PUT";
export const HTTP_DELETE = "DELETE";
export const AUTHORIZATION = "authorization";
export const NO_TOKEN_PROVIDED = "No token provided.";
export const FAILED_AUTH_TOKEN = "Failed to authenticate token.";
export const PATH_REQUIRED = "The attribute '{PATH}' is required.";
export const VALUE_CANNOT_BE_LOWER = "'{VALUE}' cannot be lower than '{MIN}'";
export const VALUE_CANNOT_BE_HIGHER = "'{VALUE}' cannot be higher than '{MAX}'";
export const VALUE_IS_NOT_VALID =
  "'{VALUE}' is not a valid argument for attribute '{PATH}', valid arguments are ['PAGO', 'PENDENTE', 'AGENDADO']";
export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const PASSWORD_REGEX =
  /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
