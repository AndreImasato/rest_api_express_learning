import Roles from '../models/roles';


export const createRoles = async () => {
  if (Roles.count() === 0){
    const admin = new Roles({
      name: 'admin'
    });
    const guest = new Roles({
      name: 'guest',
    });
    const common = new Roles({
      name: 'common'
    });
  
    Promise.all([
      admin.save(),
      guest.save(),
      common.save()
    ]).catch((err) => {
      console.error(err)
    });
  }
}