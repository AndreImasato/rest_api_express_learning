import { Router } from 'express';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from '../models/users';
import RefreshToken from '../models/auth';
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
    const accessToken = signJwt(user);

    // generate Refresh token
    const refreshToken = await RefreshToken.createToken(user);
    return res
      .status(200)
      .json({ access: accessToken, refresh: refreshToken })
  }
);
//TODO implements login with JWT
// implements refresh token
router.post(
  '/refresh',
  async (req, res, next) => {
    const { refreshToken: requestToken } = req.body;
    if (requestToken == null){
      return res
        .status(403)
        .json({ error: "Refresh token is required!" });
    }
    // generate new refresh token and access token

    try {
      let refreshToken = await RefreshToken.findOne({ token: requestToken });
      if (!refreshToken){
        return res.status(403).json({
          error: 'Refresh token not recognized'
        });
      }

      if (RefreshToken.verifyExpiration(refreshToken)){
        await RefreshToken.findByIdAndRemove(
          refreshToken._id,
          { useFindAndModify: false }
        );

        return res.status(403).json({
          error: "Refresh token is expired. Sign in again."
        });
      }

      const user = Users.findById(refreshToken.user._id);

      let newAccessToken = signJwt(user);
      return res
        .status(200)
        .json({
          access: newAccessToken,
          refresh: refreshToken.token
        })
    } catch (err) {
      return res.status(500).send({ error: err });
    }
  }
);

export default router;