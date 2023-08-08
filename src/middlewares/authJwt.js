import jwt from 'jsonwebtoken';

import models from '../models';

const Users = models.Users;
const Roles = models.Roles;


const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError){
    return res.status(401).send({ error: "Unauthorized: Access token is expired" });
  }

  return res.sendStatus(401).send({ error: "Unauthorized" });
}

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token){
    return res.status(403).send({ message: 'No token provided' })
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY,
    (err, decoded) => {
      if (err){
        return catchError(err, res);
      }

      req.context = {
        user: decoded
      }
      req.userId = decoded.id;
      next();
    }
  )
}

const isAdmin = async (req, res, next) => {
  Users.findById(req.userId)
    .then((user) => {

      Roles.find(
        {
          _id: { $in: user.roles }
        })
        .then((roles) => {
          for (let i = 0; i < roles.length; i++){
            if (roles[i].name === 'admin'){
              next();
              return;
            }
          }

          return res.status(403).send({ message: "Required admin role" });
        })
        .catch((err) => {
          return res.status(500).send({ error: err })
        })
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ error: err });
    })
}

const authJwtMiddleware = {
  verifyToken,
  isAdmin
}

export default authJwtMiddleware;