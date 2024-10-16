import { Dispatch, SetStateAction } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setLocalStorage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

export default function SignUpForm({
  setIsActive,
}: {
  setIsActive: Dispatch<SetStateAction<"sign-in" | "sign-up">>;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("https://avio-api.vercel.app/users/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();

    if (result.message === "Username is already in use, try again") {
      toast.error("Username is taken, try again");
    } else {
      setLocalStorage(values.username);
      router.push("/");
    }
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-8 justify-center items-center w-1/3"
    >
      <p className="text-4xl font-[600]">Sign Up</p>
      <Controller
        name="firstName"
        control={form.control}
        render={({ field }) => (
          <input
            type="text"
            placeholder="First name"
            {...field}
            className="w-full px-6 py-4 bg-white/10 rounded-lg outline-none"
          />
        )}
      />
      <Controller
        name="lastName"
        control={form.control}
        render={({ field }) => (
          <input
            type="text"
            placeholder="Last name"
            {...field}
            className="w-full px-6 py-4 bg-white/10 rounded-lg outline-none"
          />
        )}
      />
      <Controller
        name="username"
        control={form.control}
        render={({ field }) => (
          <input
            type="text"
            placeholder="Username"
            {...field}
            className="w-full px-6 py-4 bg-white/10 rounded-lg outline-none"
          />
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field }) => (
          <input
            type="password"
            placeholder="Password"
            {...field}
            className="w-full px-6 py-4 bg-white/10 rounded-lg outline-none"
          />
        )}
      />
      <button
        type="submit"
        className="w-full px-6 py-4 bg-neutral-200 rounded-lg outline-none text-[#0b1215]"
      >
        Sign Up
      </button>
      <p
        onClick={() => setIsActive("sign-in")}
        className="underline underline-offset-2 cursor-pointer"
      >
        Already have an account?
      </p>
    </form>
  );
}
