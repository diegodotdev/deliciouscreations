"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "@/actions";
import Loader from "@/components/loader";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

function SearchComponent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const { data, isLoading, error } = useQuery({
    queryKey: ["search"],
    queryFn: () => getSearch(q!),
  });

  if (isLoading) return <Loader />;
  if (error) return <div>error</div>;
  return (
    <MaxWidthWrapper className="flex flex-col gap-8 py-10">
      <div className="w-full h-[10vh] flex justify-start items-center">
        <p className="text-4xl font-[600]">Showing results for: {q}</p>
      </div>
      <Separator />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 place-items-start gap-8">
        {data?.map((i) => (
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

export default function Search() {
  return (
    <Suspense>
      <SearchComponent />
    </Suspense>
  );
}
