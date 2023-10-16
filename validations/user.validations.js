import Joi from "joi";

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().guid({ version: "uuidv4" }).required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().guid({ version: "uuidv4" }).required(),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().guid({ version: "uuidv4" }).required(),
  }),
};

export default {
  getUser,
  updateUser,
  deleteUser,
};
