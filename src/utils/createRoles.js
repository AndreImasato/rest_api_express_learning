import Roles from '../models/roles';


export const createRoles = async () => {
  console.log("Creating roles")
  const query = await Roles.find();

  console.log(query.length)
  if (query.length === 0){
    console.log("Trying to create roles")
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