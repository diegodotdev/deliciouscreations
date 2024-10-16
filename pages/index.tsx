import Head from "next/head";
import SearchForm from "@/components/search-form";
import { type TRecipe } from "@/types";
import RecipeBlock from "@/components/recipe-block";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { parentVariants } from "@/animations";
import { motion } from "framer-motion";

export default function Home({ recipes }: { recipes: TRecipe[] }) {
  return (
    <>
      <Head>
        <title>delicious | home</title>
      </Head>
      <MaxWidthWrapper className="w-full h-[90vh] flex justify-center items-center flex-col gap-14">
        <p className="text-7xl font-[600] text-center leading-tight">
          Find or create your perfect <br />
          recipe book
        </p>
        <SearchForm />
        <motion.div
          className="w-full grid grid-cols-5 place-items-start gap-8"
          variants={parentVariants}
          initial="hidden"
          animate="visible"
        >
          {recipes.map((recipe) => (
            <RecipeBlock key={recipe.id} props={recipe} title={false} />
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
      recipes: result.slice(0, 4),
    },
  };
};
