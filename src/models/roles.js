import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const rolesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

const Roles = mongoose.model("Roles", rolesSchema);
export default Roles;