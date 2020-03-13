function checkProjectBody(req, res, next) {
  const {id, title} = req.body;

  if(id === undefined) {
    return res.status(400).json({ error: 'ID is missing' });
  }

  if(title === undefined) {
    return res.status(400).json({ error: 'Title is missing' });
  }

  return next();
}

module.exports = checkProjectBody;