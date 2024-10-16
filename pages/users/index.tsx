import MaxWidthWrapper from "@/components/max-width-wrapper";
import { type TUser } from "@/types";
import { Search } from "lucide-react";
import Head from "next/head";
import { useState } from "react";
import UserBlock from "@/components/user-block";
import { parentVariants } from "@/animations";
import { motion } from "framer-motion";

export default function Users({ users }: { users: TUser[] }) {
  const [search, setSearch] = useState("");

  const filter = users.filter(
    (e) =>
      e.firstName.toLowerCase().includes(search.toLowerCase()) ||
      e.lastName.toLowerCase().includes(search.toLowerCase()) ||
      e.username.toLowerCase().includes(search.toLowerCase())
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
          {filter.map((user) => (
            <UserBlock key={user.id} {...user} />
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await fetch("https://avio-api.vercel.app/users");
  const result = await response.json();

  return {
    props: {
      users: result,
    },
  };
};
