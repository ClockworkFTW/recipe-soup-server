import Joi from "joi";

const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    passwordA: Joi.string().min(10).required(),
    passwordB: Joi.string().min(10).required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
  }),
};

const verifyEmail = {
  params: Joi.object().keys({
    token: Joi.string()
      .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
      .required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  params: Joi.object().keys({
    token: Joi.string()
      .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
      .required(),
  }),
  body: Joi.object().keys({
    passwordA: Joi.string().min(10).required(),
    passwordB: Joi.string().min(10).required(),
  }),
};

export default {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
