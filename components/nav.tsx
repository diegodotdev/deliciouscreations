import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { Lobster } from "next/font/google";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";
import { usePathname } from "next/navigation";
import getUser from "@/hooks/getUser";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { clearLocalStorage } from "@/lib/utils";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function Nav() {
  const { user } = getUser();
  const router = useRouter();

  const signOut = () => {
    clearLocalStorage();
    router.refresh();
  };
  return (
    <div className="w-full h-[10vh]">
      <MaxWidthWrapper className="h-full flex justify-between items-center">
        <Link href="/">
          <p className={cn("text-4xl", lobster.className)}>delicious</p>
        </Link>
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((i) => {
            const pathname = usePathname();
            return (
              <Link href={i.href} key={i.id}>
                <div className="flex items-center gap-1">
                  <i.icon
                    size={15}
                    className={cn(pathname === i.href ? "text-red-400" : "")}
                  />
                  <p>{i.label}</p>
                </div>
              </Link>
            );
          })}
          {user ? (
            <>
              <Link href="/post">
                <div className="flex items-center gap-1">
                  <Pen
                    size="15px"
                    className={cn(
                      location.pathname === "/post" ? "text-red-400" : ""
                    )}
                  />
                  <span>Post</span>
                </div>
              </Link>
              <button
                className="px-4 py-2 bg-red-400 rounded-lg text-white"
                onClick={signOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth">
              <button className="px-4 py-2 bg-neutral-200 text-[#0b1215] rounded-lg">
                Sign In
              </button>
            </Link>
          )}
        </nav>
      </MaxWidthWrapper>
    </div>
  );
}
