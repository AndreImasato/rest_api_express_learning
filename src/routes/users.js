import { Router } from 'express';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../utils/errors';
import { signJwt } from '../utils/jwt';
import Users from '../models/users';
import Roles from '../models/roles';
import middleware from '../middlewares';

const { authJwtMiddleware } = middleware;

const router = Router();
//TODO (only authenticated)
router.post(
  '/',
  async (req, res, next) => {
    const fieldErrors = {};
    if (!req.body.username || req.body.username === ''){
      fieldErrors['username'] = 'Username is required!';
    }

    if (!req.body.email || req.body.email === ''){
      fieldErrors['email'] = 'Email is required!';
    }

    //TODO check if email is a valid email

    if (!req.body.password_1 || req.body.password_1 === ''){
      fieldErrors['password_1'] = 'Password is required!';
    }

    //TODO validate password "strength"

    if (!req.body.password_2 || req.body.password_2 === ''){
      fieldErrors['password_2'] = 'Password confirmation is required!';
    }

    //TODO validate password "strength"

    if (req.body.password_1 !== req.body.password_2){
      fieldErrors['password_2'] = "Passwords don't match";
    }

    if (!_.isEmpty(fieldErrors)){
      //TODO do with error middleware
      return res
        .status(400)
        .send({
          errors: fieldErrors
        });
    }

    const hash = bcrypt.hashSync(req.body.password_1, parseInt(process.env.BCRYPT_SALT_ROUNDS));

    let userPayload = {
      email: req.body.email,
      username: req.body.username,
      password: hash
    }

    if (req.body.roles){
      const roles = await Roles.find({
        name: { $in: req.body.roles }
      })
      userPayload['roles'] = roles.map((role) => { return role._id });
    }

    Users.create(userPayload)
      .then((user) => {
        const token = signJwt(user)
        return res.status(201).json({ token: token });
      })
      .catch((err) => {
        //TODO improves error messages for validator
        return res.status(500).json({ error: err })
      });
  }
);
//TODO implement fetch all users (only authenticated)
router.get('/', [authJwtMiddleware.verifyToken], async (req, res, next) => {
  res.send('ok')
})
//TODO implement fetch user (only authenticated)
//TODO implement patch user (only authenticated)
//TODO implement delete user (only authentitcated)

export default router;