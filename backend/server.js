const express = require("express");
const cors = require("cors");
const { getAllRecipes, getRecipe } = require("./controllers/recipeController");

const app = express();
//cors hatalarını önleyen middleware
app.use(cors());

//route tanımı yap
app.route("/api/recipes").get(getAllRecipes);
app.route("/api/recipes/:id").get(getRecipe);

//dinlenecek portu belirle
app.listen(4000, () => {
  console.log("Server 4000 portunu dinlemeye başladı");
});
