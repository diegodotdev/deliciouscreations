import { TUser } from "@/types";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import { childVariants } from "@/animations";
import Image from "next/image";
import Link from "next/link";

export default function UserBlock(props: TUser) {
  return (
    <Link href={`/users/${props.username}`} className="w-full">
      <motion.div variants={childVariants} className="w-full">
        <div className="w-full h-[200px] grid place-items-center rounded-lg overflow-hidden">
          {props.avatar ? (
            <Image
              src={props.avatar}
              alt="avatar"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-white/10 grid place-items-center">
              <User className="text-neutral-200" />
            </div>
          )}
        </div>
        <div className="mt-2">
          <p className="font-[600]">
            {props.firstName} {props.lastName}
          </p>
          <p className="text-xs opacity-50">@{props.username}</p>
        </div>
      </motion.div>
    </Link>
  );
}
