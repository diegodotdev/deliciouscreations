import MaxWidthWrapper from "@/components/max-width-wrapper";
import { type TRecipe } from "@/types";
import { Search } from "lucide-react";
import Head from "next/head";
import { useState } from "react";
import RecipeBlock from "@/components/recipe-block";
import { parentVariants } from "@/animations";
import { motion } from "framer-motion";

export default function Recipes({ recipes }: { recipes: TRecipe[] }) {
  const [search, setSearch] = useState("");

  const filter = recipes.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Head>
        <title>delicious | recipes</title>
      </Head>
      <MaxWidthWrapper className="flex flex-col gap-8">
        <div className="w-full flex justify-end items-center h-[10vh]">
          <div className="w-2/5 px-6 py-4 bg-white/10 rounded-full flex items-center gap-2">
            <Search size={15} />
            <input
              className="grow bg-transparent outline-none"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <motion.div
          className="w-full grid grid-cols-5 gap-8 place-items-start"
          variants={parentVariants}
          initial="hidden"
          animate="visible"
        >
          {filter.map((recipe) => (
            <RecipeBlock key={recipe.id} props={recipe} title={true} />
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await fetch("https://avio-api.vercel.app/recipes");
  const result = await response.json();

  return {
    props: {
      recipes: result,
    },
  };
};
