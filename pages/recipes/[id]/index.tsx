import MaxWidthWrapper from "@/components/max-width-wrapper";
import { type TSingleRecipe } from "@/types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { parentVariants, childVariants } from "@/animations";
import Image from "next/image";
import { Dot, User } from "lucide-react";
import Link from "next/link";

export default function Recipe({ recipe }: { recipe: TSingleRecipe }) {
  return (
    <>
      <Head>
        <title>delicious | {recipe.title}</title>
      </Head>
      <MaxWidthWrapper>
        <motion.div
          className="w-1/2 mx-auto flex flex-col gap-8"
          variants={parentVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={childVariants} className="text-4xl font-[600]">
            {recipe.title}
          </motion.p>
          <motion.div
            className="relative w-full h-[400px] rounded-lg overflow-hidden"
            variants={childVariants}
          >
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="w-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={childVariants}
            className="w-full flex justify-between items-center"
          >
            <Link href={`/users/${recipe.user.username}`}>
              <div className="flex items-center gap-2">
                {recipe.user.avatar ? (
                  <div></div>
                ) : (
                  <div className="w-10 h-10 rounded-full grid place-items-center bg-white/10">
                    <User size={15} />
                  </div>
                )}
                <p className="font-[600]">{recipe.user.username}</p>
              </div>
            </Link>
            <Link href={`/categories/${recipe.category}`}>
              <p className="capitalize px-2 py-1 rounded-lg bg-red-400 text-neutral-200">
                {recipe.category}
              </p>
            </Link>
          </motion.div>
          <motion.p variants={childVariants}>{recipe.description}</motion.p>
          <motion.p variants={childVariants} className="text-lg font-[600]">
            Ingredients
          </motion.p>
          {recipe.ingredients.map((i, idx) => (
            <motion.div
              className="flex items-center"
              variants={childVariants}
              key={idx}
            >
              <Dot />
              <p>{i}</p>
            </motion.div>
          ))}
          <motion.p variants={childVariants} className="text-lg font-[600]">
            Instructions
          </motion.p>
          {recipe.instructions.map((i, idx) => (
            <motion.p key={idx} variants={childVariants}>
              {idx + 1}. {i}
            </motion.p>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const params = context.params;
  const response = await fetch(
    `https://avio-api.vercel.app/recipes/${params?.id}`
  );
  const result = await response.json();

  return {
    props: {
      recipe: result,
    },
  };
};
