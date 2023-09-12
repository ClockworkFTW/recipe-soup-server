import "dotenv/config";

import app from "./config/app.js";
import variables from "./config/variables.js";
import { sequelize } from "./config/postgres.js";
import seed from "./data/seed.js";

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    seed();
  }

  app.listen(variables.port, () =>
    console.log(`Example app listening on port ${variables.port}!`)
  );
});
