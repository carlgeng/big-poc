export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRequired = (value) => {
  return value != null && value.toString().trim() !== '';
};

export const validateForm = (fields) => {
  const errors = {};
  Object.entries(fields).forEach(([key, { value, validators, label }]) => {
    for (const validator of validators) {
      if (validator.fn(value)) continue;
      errors[key] = validator.message || `${label}无效`;
      break;
    }
  });
  return errors;
};

export const commonValidators = {
  email: [
    {
      fn: validateEmail,
      message: '请输入有效的邮箱地址',
    },
    {
      fn: validateRequired,
      message: '邮箱不能为空',
    },
  ],
  password: [
    {
      fn: validatePassword,
      message: '密码至少6位',
    },
    {
      fn: validateRequired,
      message: '密码不能为空',
    },
  ],
  required: [
    {
      fn: validateRequired,
      message: '此字段不能为空',
    },
  ],
};