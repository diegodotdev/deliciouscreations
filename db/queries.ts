import db from "@/db";

export async function getRecipes() {
  try {
    const data = db.recipes.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getRecipe(id: string) {
  try {
    const data = db.recipes.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getUsers() {
  try {
    const data = await db.users.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getUser(id: string) {
  try {
    const data = await db.users.findUnique({
      where: {
        clerkId: id,
      },
      include: {
        recipes: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getProfile(id: string) {
  try {
    const data = await db.users.findUnique({
      where: {
        clerkId: id,
      },
      include: {
        recipes: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
