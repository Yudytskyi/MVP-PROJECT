module.exports = (err, req, res, next) => {
  if (res.headerSent) {
    return console.log(err);
  }
  res.status(err.status || 500).send({
    data: {
      message: err.message || massage,
    },
  });
};
