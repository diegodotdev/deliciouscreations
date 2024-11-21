import MaxWidthWrapper from "@/components/max-width-wrapper";
import SearchForm from "@/components/search-form";
import db from "@/db";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const data = (
    await db.recipes.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  ).slice(0, 5);

  return (
    <MaxWidthWrapper className="min-h-[90vh] flex flex-col justify-center items-center gap-14 py-10">
      <p className="text-5xl lg:text-7xl font-[600] text-center leading-tight">
        Find or create your perfect
        <br className="hidden lg:inline" /> recipe book
      </p>
      <SearchForm />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 place-items-start gap-8">
        {data.map((i) => (
          <Link href={`/recipes/${i.id}`} className="w-full" key={i.id}>
            <div className="relative w-full rounded-lg overflow-hidden h-[200px]">
              <Image
                src={i.imageUrl}
                alt={i.name}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
