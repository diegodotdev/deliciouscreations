import { type TCook, type TUser } from "@/types";
import { GetStaticPropsContext } from "next";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { User as UserIcon } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { parentVariants } from "@/animations";
import RecipeBlock from "@/components/recipe-block";

export default function User({ user }: { user: TCook }) {
  return (
    <>
      <Head>
        <title>{`delicious | ${user.username}`}</title>
      </Head>
      <MaxWidthWrapper className="flex flex-col gap-8">
        <div className="w-full flex justify-start items-center h-[20vh] gap-4">
          {user.avatar ? (
            <div className="w-[400px] h-[300px] rounded-lg overflow-hidden relative">
              <Image
                src={user.avatar}
                alt={user.username}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-[250px] h-[150px] rounded-lg bg-white/10 grid place-items-center">
              <UserIcon />
            </div>
          )}
          <div>
            <p className="text-4xl font-[600]">
              {user.firstName} {user.lastName}
            </p>
            <p className="opacity-50">@{user.username}</p>
          </div>
        </div>
        <motion.div
          className="w-full grid grid-cols-5 gap-8 place-items-start"
          variants={parentVariants}
          initial="hidden"
          animate="visible"
        >
          {user.recipes.map((recipe) => (
            <RecipeBlock key={recipe.id} props={recipe} title={true} />
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetch("https://avio-api.vercel.app/users");
  const result = await response.json();

  const paths = result.map((user: TUser) => ({
    params: { id: user.username.toString() },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const params = context.params;

  const response = await fetch(
    `https://avio-api.vercel.app/users/${params?.id}`
  );
  const result = await response.json();

  return {
    props: {
      user: result,
    },
  };
};
