import app from "./src/app.js";
import env from "dotenv";
import connectToDB from "./src/config/database.js";

env.config();

connectToDB();

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
