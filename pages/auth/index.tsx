import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { useState } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Head from "next/head";
import { useRouter } from "next/navigation";
import getUser from "@/hooks/getUser";

export default function Auth() {
  const [isActive, setIsActive] = useState<"sign-in" | "sign-up">("sign-in");
  const { user } = getUser();
  const router = useRouter();

  if (user) router.push("/");
  return (
    <>
      <Head>
        <title>delicious | auth</title>
      </Head>
      <MaxWidthWrapper className="h-[90vh] grid place-items-center">
        {isActive === "sign-in" ? (
          <SignInForm setIsActive={setIsActive} />
        ) : (
          <SignUpForm setIsActive={setIsActive} />
        )}
      </MaxWidthWrapper>
    </>
  );
}
