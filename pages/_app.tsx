import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Nav from "@/components/nav";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <div className={cn("w-full", poppins.className)}>
        <Nav />
        <AnimatePresence>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </div>
      <Toaster />
    </>
  );
}
