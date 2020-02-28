function logRequests(req, res, next) {
  console.count('Quantidade de requisições');

  return next();
}

module.exports = { logRequests };