import MaxWidthWrapper from "@/components/max-width-wrapper";
import Image from "next/image";
import { getUser } from "@/db/queries";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function User({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <MaxWidthWrapper className="flex flex-col gap-8 py-10">
      <div className="w-full h-[20vh] flex justify-start items-center gap-4">
        <div className="relative w-60 h-44 rounded-xl overflow-hidden">
          <Image
            src={user?.imageUrl as string}
            alt={user?.username as string}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-2xl font-[600]">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-muted-foreground">@{user?.username}</p>
        </div>
      </div>
      <Separator />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 place-items-start gap-8">
        {user?.recipes.map((i) => (
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
                    src={i.imageUrl!}
                    alt={i.name!}
                    fill
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
