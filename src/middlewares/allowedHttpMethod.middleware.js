/**
 *
 * @param {GET, POST, DELETE, PUT, PATCH, UPDATE} methods
 * @returns {Function}
 * @constructor allowedHttpMethod
 * @description Middleware to check if the HTTP method is allowed
 */

const allowedHttpMethods =
  (methods = []) =>
  (req, res, next) => {
    if (methods.includes(req.method)) return next();
    res.error(405, `The ${req.method} method for the "${req.originalUrl}" route is not supported.`);
  };

export default allowedHttpMethods;
