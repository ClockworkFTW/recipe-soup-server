import Joi from "joi";

const getRecipes = {
  query: Joi.object().keys({
    page: Joi.number().allow(""),
    query: Joi.string().allow(""),
    sort: Joi.string().valid("new", "rating", "time").allow(""),
  }),
};

const getRecipe = {
  params: Joi.object().keys({
    recipeId: Joi.string().guid({ version: "uuidv4" }).required(),
  }),
};

const ingredient = Joi.object().keys({
  index: Joi.number().required(),
  text: Joi.string().required(),
});

const instruction = Joi.object().keys({
  index: Joi.number().required(),
  type: Joi.string().valid("section", "step").required(),
  text: Joi.string().required(),
});

const createRecipe = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    cookTime: Joi.string().regex(
      /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
    ),
    prepTime: Joi.string().regex(
      /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
    ),
    cuisine: Joi.string().required(),
    rating: Joi.number().required(),
    servings: Joi.number().required(),
    ingredients: Joi.array().items(ingredient).required(),
    instructions: Joi.array().items(instruction).required(),
  }),
  image: Joi.object().keys({
    body: Joi.binary().required(),
    key: Joi.string().required(),
  }),
};

const updateRecipe = {
  params: Joi.object().keys({
    recipeId: Joi.string().guid({ version: "uuidv4" }).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    cookTime: Joi.string().regex(
      /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
    ),
    prepTime: Joi.string().regex(
      /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
    ),
    cuisine: Joi.string(),
    rating: Joi.number(),
    servings: Joi.number(),
    ingredients: Joi.array().items(ingredient).required(),
    instructions: Joi.array().items(instruction).required(),
  }),
  image: Joi.object().keys({
    body: Joi.binary(),
    key: Joi.string(),
  }),
};

const deleteRecipe = {
  params: Joi.object().keys({
    recipeId: Joi.string().guid({ version: "uuidv4" }).required(),
  }),
};

export default {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
