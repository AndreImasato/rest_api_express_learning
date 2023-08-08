import { Router } from 'express';
import _ from 'lodash';
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../utils/errors';
import { signJwt } from '../utils/jwt';
import Users from '../models/users';
import Roles from '../models/roles';
import middleware from '../middlewares';

const { authJwtMiddleware } = middleware;

const router = Router();
// Create new user (only admin)
router.post(
  '/',
  [authJwtMiddleware.verifyToken, authJwtMiddleware.isAdmin],
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

// implement fetch all users (only authenticated)
router.get(
  '/',
  [authJwtMiddleware.verifyToken],
  async (req, res, next) => {
    const users = await Users.find();
    return res.status(200).json({ users });
  }
);

// implement fetch user (only authenticated)
router.get(
  '/:userId',
  [authJwtMiddleware.verifyToken],
  async (req, res, next) => {
    const user = await Users.findById(req.params.userId);
    return res.status(200).json({ user });
  }
);

// implement patch user (only authenticated)
router.patch(
  '/:userId',
  [authJwtMiddleware.verifyToken, authJwtMiddleware.isAdmin],
  async (req, res, next) => {
    const { password_1, password_2, ...payload } = req.body;
    const fieldErrors = {};

    if (password_1 && password_2 && password_1 !== '' && password_2 !== '' && password_1 === password_2){
      //TODO check password_1 strength
      const hash = bcrypt.hashSync(
        req.body.password_1,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      );
      payload['password'] = hash;
    } else if (password_1 && password_1 !== '' && (!password_2 || password_2 === '')){
      fieldErrors['password_2'] = "Password confirmation is required";
    } else if (password_1 && password_1 !== '' && password_2 && password_2 !== '' && password_1 !== password_2){
      fieldErrors['password_2'] = "Passwords do not match";
    }

    //TODO check if email is defined and if email is a valid email format

    if (!_.isEmpty(fieldErrors)){
      return res.status(400).send({ errors: fieldErrors });
    }
    Users.findByIdAndUpdate(
      req.params.userId,
      payload
    )
      .then((user) => {
        return res.status(200).send({ message: user });
      })
      .catch((err) => {
        return res.status(500).send({ error: err });
      })
  }
);

// implement delete user (only authentitcated)
router.delete(
  '/:userId',
  [authJwtMiddleware.verifyToken, authJwtMiddleware.isAdmin],
  async (req, res, next) => {
    Users
      .findByIdAndRemove(
        req.params.userId,
        { useFindAndModify: false }
      )
      .then(() => {
        return res.status(204).send({ message: "User successfully deleted" });
      })
      .catch((err) => {
        return res.status(500).json({ error: err })
      })    
  }
)

export default router;