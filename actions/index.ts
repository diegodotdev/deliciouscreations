"use server";

import db from "@/db";
import { Body } from "@/types";
import { revalidatePath } from "next/cache";

export async function getSearch(id: string) {
  try {
    const recipes = await db.recipes.findMany();
    const filter = recipes?.filter((i) =>
      i.name.toLowerCase().includes(id.toLowerCase())
    );
    return filter;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function deleteRecipe(id: string) {
  try {
    const data = await db.recipes.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profile");
    return { message: "Recipe has been deleted" };
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function createRecipe(body: Body) {
  await db.recipes
    .create({
      data: {
        ...body,
      },
    })
    .catch((error) => console.log(error));
}
