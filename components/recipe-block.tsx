import { TRecipe } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { childVariants } from "@/animations";
import { motion } from "framer-motion";

export default function RecipeBlock({
  props,
  title,
}: {
  props: TRecipe;
  title: boolean;
}) {
  return (
    <Link href={`/recipes/${props.id}`} className="w-full">
      <motion.div className="w-full" variants={childVariants}>
        <div className="w-full h-[200px] rounded-lg overflow-hidden relative">
          <Image
            src={props.image}
            alt={props.title}
            fill
            className="object-cover"
          />
        </div>
        {title && <p className="mt-2 font-[600]">{props.title}</p>}
      </motion.div>
    </Link>
  );
}
