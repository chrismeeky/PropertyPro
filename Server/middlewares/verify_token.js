const verifyToken = (req, res, next) =>{
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
  const bearer = bearerHeader.split(' ');
  // get token from array after split
  const token = bearer[1];
  req.token = token;
  next();
  }
    else{
        res.json({status: 'error',
                  error: 'token could not be generated'});
    }
}

module.exports = verifyToken;