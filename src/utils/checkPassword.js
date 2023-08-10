const checkPasswordStrength = (password) => {

  const strongPasswordPattern = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])'
  );

  if (strongPasswordPattern.test(password)){
    return true;
  } else {
    return false;
  }
}

export default checkPasswordStrength;