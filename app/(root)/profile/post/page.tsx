import RecipeForm from "@/components/recipe-form";
import db from "@/db";
import { type Body } from "@/types";

export default async function Post() {
  async function createRecipe(body: Body) {
    "use server";

    try {
      await db.recipes.create({
        data: {
          ...body,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return <RecipeForm createRecipe={createRecipe} />;
}
