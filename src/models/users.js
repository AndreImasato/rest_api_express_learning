import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Roles'
      }
    ]
  },
  { timestamps: true }
);

usersSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({
    username: login,
  });

  return user;
}

const Users = mongoose.model("users", usersSchema);
export default Users;