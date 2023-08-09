//TODO validate password strength
const registerUserSchema = {
  email: {
    errorMessage: 'Email is required!',
    isEmail: true,
    trim: true,
    escape: true
  },
  username: {
    trim: true,
    notEmpty: true,
    escape: true,
    errorMessage: "Username is required!"
  },
  password_1: {
    trim: true,
    escape: true,
    isLength: {
      options: {
        min: 8
      },
      errorMessage: 'Password must have at least 8 characters!'
    },
    errorMessage: 'Password is required!'
  },
  password_2: {
    trim: true,
    notEmpty: true,
    escape: true,
    errorMessage: 'Password confirmation is required!',
    isLength: {
      options: {
        min: 8
      },
      errorMessage: 'Password confirmation must have at least 8 characters!'
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password_1){
          throw new Error("Password don't match!")
        }
        return value;
        
      },
      errorMessage: "Password don't match!"
    },
  }
};

export default registerUserSchema;