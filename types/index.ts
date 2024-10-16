export interface TRecipe {
  category: string;
  createdAt: string;
  description: string;
  id: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  title: string;
  username: string;
}

export interface TSingleRecipe extends TRecipe {
  user: TUser;
}

export interface TUser {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
}

export interface TCook extends TUser {
  recipes: TRecipe[];
}

export interface TSearch {
  users: TUser[];
  recipes: TRecipe[];
}
