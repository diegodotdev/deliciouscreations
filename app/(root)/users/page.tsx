import { getUsers } from "@/db/queries";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function Users() {
  const users = await getUsers();

  return (
    <MaxWidthWrapper className="flex flex-col gap-10 py-10">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 place-items-start gap-8">
        {users?.map((i) => (
          <Link href={`/users/${i.clerkId}`} className="w-full" key={i.id}>
            <Card className="w-full">
              <CardContent className="pt-5">
                <div className="w-full relative h-[200px] rounded-xl overflow-hidden">
                  <Image
                    fill
                    src={i.imageUrl}
                    alt={i.username}
                    className="object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-1 justify-start items-start">
                <CardTitle className="text-base">
                  {i.firstName} {i.lastName}
                </CardTitle>
                <p className="text-muted-foreground text-xs">@{i.username}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
