import MaxWidthWrapper from "@/components/max-width-wrapper";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { getProfile } from "@/db/queries";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/delete-button";

export default async function Profile() {
  const { userId } = await auth();
  const user = await getProfile(userId!);

  return (
    <MaxWidthWrapper className="flex flex-col gap-8 py-10">
      <div className="w-full h-[20vh] flex justify-between items-center">
        <div className="flex items-center gap-4">
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
        <Link href="/profile/post" className="hidden lg:inline">
          <Button>Post</Button>
        </Link>
      </div>
      <Link href="/profile/post" className="w-full">
        <Button className="w-full">Post</Button>
      </Link>
      <Separator />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 place-items-start gap-8">
        {user?.recipes.map((i) => (
          <Dialog key={i.id}>
            <DialogTrigger className="w-full">
              <Card className="w-full">
                <CardContent className="pt-5">
                  <div className="w-full relative h-[200px] rounded-xl overflow-hidden">
                    <Image
                      src={i.imageUrl || ""}
                      alt={i.name || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <CardTitle className="text-base">{i.name}</CardTitle>
                </CardFooter>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{i.name}</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-4 py-4">
                <Link
                  href={`/recipes/${i.id}`}
                  prefetch={true}
                  className="w-1/2"
                  key={i.id}
                >
                  <Button className="w-full">View</Button>
                </Link>
                <DeleteButton id={i?.id} />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
