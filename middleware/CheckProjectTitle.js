function checkProjectTitle(req, res, next) {
  const {title} = req.body;

  if(title === undefined) {
    return res.status(400).json({ error: 'Title is missing' });
  }

  return next();
}

module.exports = checkProjectTitle;