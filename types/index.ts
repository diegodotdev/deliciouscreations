import type { Recipes, Users } from "@prisma/client";

export interface TRecipe extends Recipes {
  user: Users;
}

export interface TUser extends Users {
  recipes: Recipes[];
}

export interface Body {
  name: string;
  clerkId: string;
  description: string;
  imageUrl: string;
  category: string;
  ingredients: string[];
  instructions: string[];
}
