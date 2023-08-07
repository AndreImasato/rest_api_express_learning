import jwt from 'jsonwebtoken';


export const signJwt = (user, options = {}) => {
  const userPayload = {
    id: user._id,
    username: user.username,
    email: user.email,
    roles: user.roles
  }
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + parseInt(process.env.JWT_EXPIRATION_DAYS));
  options['expiresIn'] = parseInt(expirationDate.getTime() / 1000, 10);
  return jwt.sign(
    userPayload,
    process.env.SECRET_KEY,
    {
      ...(options && options),
      //algorithm: 'RS256'
    }
  );
};