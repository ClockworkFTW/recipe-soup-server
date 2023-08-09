import models from "./config/postgres.js";

async function seed() {
  const user = await models.User.create({
    username: "Nik Boyle",
    email: "nikolasboyle@gmail.com",
    password: "$2b$10$5DB3xu81xHFWiiYnt5AK7uX6ZwwmwNhUTKoC9lzNhLPE4eoeleo6S",
  });

  const userId = user.toJSON().id;

  await models.Recipe.create(
    {
      name: "Birria Tacos",
      prepTime: "PT20M",
      cookTime: "PT3H30M",
      image: {
        bucket: "jnb-recipe-book-bucket",
        key: "image/3ff598dc-743d-4749-b305-9f618a1cd2bb.jpg",
        url: "https://jnb-recipe-book-bucket.s3.us-west-1.amazonaws.com/image/3ff598dc-743d-4749-b305-9f618a1cd2bb.jpg",
      },
      ingredients: [
        { text: "2 pounds boneless chuck", index: 0 },
        { text: "1 pound oxtail or short ribs", index: 1 },
        { text: "1 teaspoon neutral oil (avocado or vegetable oil)", index: 2 },
        { text: "7 ancho chiles (ends trimmed and de-seeded)", index: 3 },
        { text: "7 guajillo chiles (ends trimmed and de-seeded)", index: 4 },
        { text: "3 chiles de arbol (ends trimmed and de-seeded)", index: 5 },
        { text: "1 white onion (peeled and halved)", index: 6 },
        { text: "6 garlic cloves (peeled)", index: 7 },
        { text: "4 roma tomatoes", index: 8 },
        { text: "1 tablespoon black peppercorns", index: 9 },
        { text: "1 teaspoon dried Mexican oregano", index: 10 },
        { text: "1 teaspoon cumin seeds", index: 11 },
        { text: "1 teaspoon coriander seeds", index: 12 },
        { text: "1/4 teaspoon ground cloves", index: 13 },
        {
          text: "1/2 Mexican cinnamon stick (See note if not using Mexican cinnamon)",
          index: 14,
        },
        { text: "3 bay leaves", index: 15 },
        { text: "1 teaspoon apple cider vinegar", index: 16 },
        { text: "3 cups beef broth or water (divided)", index: 17 },
        { text: "1/4 cup minced cilantro", index: 18 },
        { text: "1/4 white onion (minced)", index: 19 },
        { text: "Juice from 1 lime", index: 20 },
        { text: "Kosher salt", index: 21 },
        { text: "Corn tortillas", index: 22 },
        { text: "3 ounces Oaxacan cheese (or mozzarella)", index: 23 },
      ],
      instructions: [
        { type: "section", index: 0, text: "To Sear The Meet" },
        {
          type: "step",
          index: 1,
          text: "Bring the meat to room temperature, about 30 minutes and then sprinkle liberally on all sides with kosher salt. In a large Dutch oven (or a pot with an oven-proof lid), set over medium-high heat, add the neutral oil. When hot, add the meat and sear on all sides until browned. I like to do a hard sear. You’ll have to do this in batches. Transfer to a bowl.",
        },
        { type: "section", index: 2, text: "To Make The Sauce" },
        {
          type: "step",
          index: 3,
          text: "Meanwhile, in another medium pot, add the dried chiles, halved white onion, garlic cloves, tomatoes, spices, bay leaves and add cold water until it covers everything. Place over medium heat and simmer gently for about 15 minutes. Pour through a strainer and transfer everything (including the whole spices) to a blender. If your blender is small you may need to do this in batches.",
        },
        {
          type: "step",
          index: 4,
          text: "Add the apple cider vinegar and about 1 cup of beef broth or water and blend until very smooth, about 2 minutes. Add salt to taste (I added about 1 tablespoon of kosher salt).",
        },
        {
          type: "step",
          index: 5,
          text: "*Note: I have a high-powered blender and it resulted in a super smooth sauce. If you have a blender that is meh, you may want to run the sauce through a strainer to discard any big bits the blender didn’t puree. Very optional!",
        },
        { type: "section", index: 6, text: "To Braise The Meat" },
        {
          type: "step",
          index: 7,
          text: "Preheat the oven to 300F. Add the meat back to the pot and pour the sauce over it. To the blender, add the remaining 2 cups of broth or water and swish it around to pick up any leftover sauce and pour it into the pot. Place over medium heat until it reaches a gentle simmer and then immediately cover and transfer to the preheated oven. Cook for about 3 hours, until the meat is tender.",
        },
        { type: "section", index: 8, text: "To Assemble The Tacos" },
        {
          type: "step",
          index: 9,
          text: "Mix together the cilantro, white onion, lime and salt.",
        },
        {
          type: "step",
          index: 10,
          text: "Remove the meat from the sauce and shred using two forks. Ladle the broth into a bowl and add a handful of diced cilantro.",
        },
        {
          type: "step",
          index: 11,
          text: "Add a non-stick skillet over medium heat. Dip the tortilla into the top of the broth (this should be fat) and add it to the skillet. Pan fry on one side for about 30 seconds and then flip over. Add a some of the shredded meat and the shredded cheese. Fold over and cook until pan fried on both sides, about 1 minute. Transfer to a plate and serve alongside the broth.",
        },
      ],
      cuisine: "Mexican",
      category: "Dinner",
      rating: 4,
      servings: 6,
      userId,
    },
    { include: [models.Image, models.Ingredient, models.Instruction] }
  );

  await models.Recipe.create(
    {
      name: "Spaghetti Carbonara",
      prepTime: "PT10M",
      cookTime: "PT10M",
      image: {
        bucket: "jnb-recipe-book-bucket",
        key: "image/2c88943c-2acd-49a2-abe1-075c9e5495a9.jpg",
        url: "https://jnb-recipe-book-bucket.s3.us-west-1.amazonaws.com/image/2c88943c-2acd-49a2-abe1-075c9e5495a9.jpg",
      },
      ingredients: [
        { text: "Salt", index: 0 },
        { text: "2 large eggs and 2 large yolks, room temperature", index: 1 },
        {
          text: "1ounce (about ⅓ packed cup) grated pecorino Romano, plus additional for serving",
          index: 2,
        },
        { text: "Coarsely ground black pepper", index: 3 },
        { text: "1 tablespoon olive oil", index: 4 },
        {
          text: "3½ ounces of slab guanciale (see recipe), pancetta or bacon, sliced into pieces about ¼ inch thick by ⅓ inch square",
          index: 5,
        },
        { text: "12 ounces spaghetti (about ¾ box)", index: 6 },
      ],
      instructions: [
        {
          type: "step",
          index: 0,
          text: "Place a large pot of lightly salted water (no more than 1 tablespoon salt) over high heat, and bring to a boil. Fill a large bowl with hot water for serving, and set aside.",
        },
        {
          type: "step",
          index: 1,
          text: "In a mixing bowl, whisk together the eggs, yolks and pecorino and Parmesan. Season with a pinch of salt and generous black pepper.",
        },
        {
          type: "step",
          index: 2,
          text: "Set the water to boil. Meanwhile, heat oil in a large skillet over medium heat, add the pork, and sauté until the fat just renders, on the edge of crispness but not hard. Remove from heat and set aside.",
        },
        {
          type: "step",
          index: 3,
          text: "Add pasta to the water and boil until a bit firmer than al dente. Just before pasta is ready, reheat guanciale in skillet, if needed. Reserve 1 cup of pasta water, then drain pasta and add to the skillet over low heat. Stir for a minute or so.",
        },
        {
          type: "step",
          index: 4,
          text: "Empty serving bowl of hot water. Dry it and add hot pasta mixture. Stir in cheese mixture, adding some reserved pasta water if needed for creaminess. Serve immediately, dressing it with a bit of additional grated pecorino and pepper.",
        },
      ],
      cuisine: "Italian",
      category: "Dinner",
      rating: 3,
      servings: 4,
      userId,
    },
    { include: [models.Image, models.Ingredient, models.Instruction] }
  );

  await models.Recipe.create(
    {
      name: "Margherita Pizza",
      prepTime: "PT25M",
      cookTime: "PT20M",
      image: {
        bucket: "jnb-recipe-book-bucket",
        key: "image/634701bc-0ff9-4bfa-a74c-3be007161ce3.jpg",
        url: "https://jnb-recipe-book-bucket.s3.us-west-1.amazonaws.com/image/634701bc-0ff9-4bfa-a74c-3be007161ce3.jpg",
      },
      ingredients: [
        {
          text: "1 batch easy whole wheat pizza dough or 1 pound store-bought pizza dough",
          index: 0,
        },
        {
          text: "1 large can (28 ounces) whole San Marzano tomatoes",
          index: 1,
        },
        {
          text: "12 ounces (dry weight) ovoline-type mozzarella or other fresh mozzarella balls, ideally water-packed",
          index: 2,
        },
        {
          text: "Handful of fresh basil, thinly sliced plus small leaves",
          index: 3,
        },
        {
          text: "Additional garnishes: Drizzle of extra-virgin olive oil, flaky sea salt or kosher salt and optional red pepper flakes",
          index: 4,
        },
      ],
      instructions: [
        {
          type: "step",
          index: 0,
          text: "Preheat the oven to 500 degrees Fahrenheit with a rack in the upper third of the oven. If you’re using a baking stone or baking steel, place it on the upper rack. Prepare dough through step 5.",
        },
        {
          type: "step",
          index: 1,
          text: "Place a medium mixing bowl in the sink and pour the canned tomatoes into the bowl, juices and all. Crush the tomatoes by hand. Spread about ¾ cup of the tomato sauce evenly over each pizza, leaving about 1 inch bare around the edges.",
        },
        {
          type: "step",
          index: 2,
          text: "If your mozzarella is packed in water, drain off the water and gently pat the mozzarella dry on a clean tea towel or paper towels. If you’re working with large mozzarella balls, tear them into smaller 1-inch balls. Distribute the mozzarella over the pizza, concentrating it a bit more in the center of the pizza, as it will melt toward the edges.",
        },
        {
          type: "step",
          index: 3,
          text: "Bake pizzas individually on the top rack until the crust is golden and the cheese is just turning golden, about 10 to 12 minutes (or significantly less, if you’re using a baking stone/steel—keep an eye on it).",
        },
        {
          type: "step",
          index: 4,
          text: "Top each pizza generously with fresh basil, followed by a light back-and-forth drizzle of olive oil, a sprinkling of salt, and red pepper flakes, if you wish. Slice and enjoy. Leftover pizza will keep well in the refrigerator for up to 4 days.",
        },
      ],
      cuisine: "Italian",
      category: "Dinner",
      rating: 5,
      servings: 8,
      userId,
    },
    { include: [models.Image, models.Ingredient, models.Instruction] }
  );
}

export default seed;
