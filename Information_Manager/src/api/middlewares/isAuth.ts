// remove by JRT : import jwt from 'express-jwt';
var { expressjwt: jwt } = require("express-jwt");
import config from '../../../config';

/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 * But it could come in a query parameter with the name that you want like
 * GET https://my-bulletproof-api.com/stats?apiKey=${JWT}
 * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff
 */
const getTokenFromHeader = req => {
  let authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("You must be logged in to access this route");

  if (!authHeader.startsWith("Bearer")) throw new Error("Token schema not supported");

  return authHeader.substring(6);
};

let jwksRsa = require('jwks-rsa');

const isAuth = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'dev-3hnosuh6oycbgons.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'Sk0nEcUzFPLnFEdOx9QxkwEMNZ4yZP3N',
  issuer: 'dev-3hnosuh6oycbgons.us.auth0.com',
  algorithms: ['RS256'],
  userProperty: 'token',
  getToken: getTokenFromHeader
});

export default isAuth;
