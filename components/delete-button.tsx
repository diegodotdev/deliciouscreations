"use client";

import { Button } from "./ui/button";
import { deleteRecipe } from "@/actions";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <Button
      className="w-1/2"
      variant="destructive"
      onClick={() => deleteRecipe(id)}
    >
      Delete
    </Button>
  );
}
