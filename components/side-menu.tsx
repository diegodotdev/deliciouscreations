import { Menu, User } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Separator } from "./ui/separator";

export default function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon">
          <Menu size={15} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4 text-base">
          {NAV_LINKS.map((i) => (
            <div key={i.id} className="flex flex-col gap-4">
              <Link href={i.href}>
                <SheetClose asChild>
                  <div className="flex items-center gap-2">
                    <i.icon size={15} />
                    <p>{i.label}</p>
                  </div>
                </SheetClose>
              </Link>
              <Separator />
            </div>
          ))}
          <SignedIn>
            <Link href="/profile">
              <div className="flex items-center gap-2">
                <User size={15} />
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
