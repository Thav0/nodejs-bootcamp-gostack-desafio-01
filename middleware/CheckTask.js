function checkTask(req, res, next) {
  const {id} = req.params;
  const {task} = req.body;

  if(id === undefined) {
    return res.status(400).json({ error: 'ID is missing' });
  }

  if(task === undefined) {
    return res.status(400).json({ error: 'Task is missing' });
  }

  return next();
}

module.exports = checkTask;