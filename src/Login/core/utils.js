export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return 'Campo Obligatorio.';

  return '';
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return 'Campo Obligatorio.';

  return '';
};
