import bcrypt from 'bcryptjs';
import models from '../models';
import { BCRYPT_SALT_ROUNDS, SAMPLE_ADMIN_USER, SAMPLE_ADMIN_EMAIL, SAMPLE_ADMIN_PASSWORD } from '../config'

export const createSampleUsers = async () => {
  const Roles = models.Roles;
  const Users = models.Users;

  // check if sample user is already created
  const user = await Users.findOne({
    username: SAMPLE_ADMIN_USER
  });

  if (!user){
    const hash = bcrypt.hashSync(
      SAMPLE_ADMIN_PASSWORD,
      BCRYPT_SALT_ROUNDS
    );

    // find roles
    const roles = await Roles.find();
    const userRoles = roles.map((role) => { return role._id });
    Users.create({
      username: SAMPLE_ADMIN_USER,
      email: SAMPLE_ADMIN_EMAIL,
      password: hash,
      roles: userRoles
    })
      .catch((err) => {
        console.error(err);
      });
  }
}

