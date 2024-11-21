import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getRecipes } from "@/db/queries";

export default async function Recipes() {
  const recipes = await getRecipes();

  return (
    <MaxWidthWrapper className="flex flex-col gap-10 py-10">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 place-items-start gap-8">
        {recipes?.map((i) => (
          <Link
            href={`/recipes/${i.id}`}
            prefetch={true}
            className="w-full"
            key={i.id}
          >
            <Card className="w-full">
              <CardContent className="pt-5">
                <div className="w-full relative h-[200px] rounded-xl overflow-hidden">
                  <Image
                    fill
                    src={i.imageUrl}
                    alt={i.name}
                    className="object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <CardTitle className="text-base">{i.name}</CardTitle>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
