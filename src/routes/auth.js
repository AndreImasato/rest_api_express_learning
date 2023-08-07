import { Router } from 'express';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from '../models/users';
import { signJwt } from '../utils/jwt';

const router = Router();

// implements login
router.post(
  '/login',
  async (req, res, next) => {
    const fieldErrors = {};
    // check body for username and password parameters
    if (!req.body.username || req.body.username === ''){
      fieldErrors['username'] = 'Username is required!'
    }
    if (!req.body.password || req.body.password === ''){
      fieldErrors['password'] = 'Password is required!'
    }
    if (!_.isEmpty(fieldErrors)){
      return res
        .status(400)
        .send({
          errors: fieldErrors
        });
    }
    
    // find by username
    const user = await Users.findByLogin(req.body.username);
    if (!user){
      fieldErrors['username'] = 'Wrong username or user does not exist';
      return res.status(400).send({ errors: fieldErrors });
    }
    
    // compare passwords
    if (!bcrypt.compareSync(req.body.password, user.password)){
      fieldErrors['password'] = 'Wrong password';
      return res.status(400).send({ errors: fieldErrors });
    }

    // generate JWT
    const token = signJwt(user);
    return res.status(200).json({ token: token })
  }
);
//TODO implements login with JWT
//TODO implements refresh token (only authenticated)

export default router;