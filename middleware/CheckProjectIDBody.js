function checkProjectIDBody(req, res, next) {
  const {id} = req.params;

  if(id === undefined) {
    return res.status(400).json({ error: 'ID is missing' });
  }

  return next();
}

module.exports = checkProjectIDBody;