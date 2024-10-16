import { type TSearch } from "@/types";
import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { parentVariants } from "@/animations";
import { motion } from "framer-motion";
import RecipeBlock from "@/components/recipe-block";
import UserBlock from "@/components/user-block";

export default function Search({
  data,
  searchQuery,
}: {
  data: TSearch;
  searchQuery: string;
}) {
  return (
    <>
      <Head>
        <title>{`delicious | search: ${searchQuery}`}</title>
      </Head>
      <MaxWidthWrapper className="flex flex-col gap-8">
        <p className="text-xl font-[600]">Users:</p>
        {data.users.length !== 0 ? (
          <motion.div
            className="w-full grid grid-cols-5 gap-8 place-items-start"
            variants={parentVariants}
            initial="hidden"
            animate="visible"
          >
            {data.users.map((user) => (
              <UserBlock key={user.id} {...user} />
            ))}
          </motion.div>
        ) : (
          <div className="w-full h-[100px] grid place-items-center">
            <p>no results</p>
          </div>
        )}
        <p className="text-xl font-[600]">Recipes:</p>
        {data.recipes.length !== 0 ? (
          <motion.div
            className="w-full grid grid-cols-5 gap-8 place-items-start"
            variants={parentVariants}
            initial="hidden"
            animate="visible"
          >
            {data.recipes.map((recipe) => (
              <RecipeBlock key={recipe.id} props={recipe} title={true} />
            ))}
          </motion.div>
        ) : (
          <div className="w-full h-[100px] grid place-items-center">
            <p>no results</p>
          </div>
        )}
      </MaxWidthWrapper>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const searchQuery = query.query;
  const response = await fetch(
    `https://avio-api.vercel.app/search?query=${searchQuery}`
  );
  const result = await response.json();

  return {
    props: {
      data: result,
      searchQuery,
    },
  };
};
