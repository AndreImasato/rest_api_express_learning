import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { JWT_REFRESH_EXPIRATION } from '../config'

const Schema = mongoose.Schema;


const RefreshTokenSchema = new Schema(
  {
    token: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users"
    },
    expiryDate: Date,
  }
);

RefreshTokenSchema.statics.createToken = async function (user){
  let expiredAt = new Date();
  expiredAt.setSeconds(
    expiredAt.getSeconds() + JWT_REFRESH_EXPIRATION
  );

  //TODO changes refresh token generation
  let _token = uuidv4();

  let _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime()
  });

  let refreshToken = await _object.save();

  return refreshToken.token;
}

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
}

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
export default RefreshToken;