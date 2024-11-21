"use client";

import Link from "next/link";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { lobster } from "@/app/fonts";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import SideMenu from "./side-menu";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="w-full h-[10vh]">
      <MaxWidthWrapper className="h-full flex justify-between items-center">
        <Link href="/">
          <p className={cn("text-4xl", lobster.className)}>delicious</p>
        </Link>
        <nav className="hidden lg:flex items-center gap-5">
          {NAV_LINKS.map((i) => (
            <Link href={i.href} key={i.id}>
              <div className="flex items-center gap-1">
                <i.icon
                  className={cn(pathname === i.href ? "text-red-400" : "")}
                  size={15}
                />
                <p>{i.label}</p>
              </div>
            </Link>
          ))}
          <SignedIn>
            <Link href="/profile">
              <div className="flex items-center gap-1">
                <User
                  className={cn(pathname === "/profile" ? "text-red-400" : "")}
                  size={15}
                />
                <p>Profile</p>
              </div>
            </Link>
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <ModeToggle />
        </nav>
        <div className="lg:hidden">
          <SideMenu />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
