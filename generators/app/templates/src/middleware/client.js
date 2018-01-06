// @flow

/**
 * @name clientType
 */

export default (async function client(req, res, next) {
  req.client = req.headers['x-client-type'] || 'web';
  next();
});
