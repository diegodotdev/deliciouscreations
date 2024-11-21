import { getRecipe } from "@/db/queries";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Image from "next/image";
import Link from "next/link";
import { Dot } from "lucide-react";

export default async function Recipe({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  return (
    <MaxWidthWrapper className="min-h-[90vh] py-10 flex justify-center items-start">
      <div className="w-full lg:w-1/2 flex flex-col gap-8">
        <p className="font-[600] text-4xl">{recipe?.name}</p>
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <Image
            src={recipe?.imageUrl as string}
            alt={recipe?.name as string}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <Link href={`/users/${recipe?.clerkId}`} prefetch={true}>
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9 rounded-full overflow-hidden">
                <Image
                  src={recipe?.user?.imageUrl as string}
                  alt={recipe?.user.username as string}
                  className="object-cover"
                  fill
                />
              </div>
              <p className="font-[600]">{recipe?.user.username}</p>
            </div>
          </Link>
          <Link href={`/categories/${recipe?.category.toLowerCase()}`}>
            <p className="bg-secondary px-4 py-2 rounded-xl capitalize">
              {recipe?.category.replace("-", " ")}
            </p>
          </Link>
        </div>
        <p>
          <span className="font-[600]">Description</span>: {recipe?.description}
        </p>
        <p className="text-2xl font-[600]">Ingredients</p>
        {recipe?.ingredients.map((i, idx) => (
          <div key={idx} className="flex items-center">
            <Dot />
            <p>{i}</p>
          </div>
        ))}
        <p className="text-2xl font-[600]">Instructions</p>
        {recipe?.instructions.map((i, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <p>{idx + 1}.</p>
            <p>{i}</p>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
