import Joi from "joi";

const test = ["body", "query", "params", "image"];

function validate(definition) {
  return function (req, res, next) {
    const data = Object.keys(definition).reduce((obj, key) => {
      if (test.includes(key)) {
        obj[key] = req[key];
      }
      return obj;
    }, {});

    const schema = Joi.compile(definition);
    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    return next();
  };
}

export default validate;
