"use client";

import { Form, FormItem, FormField, FormControl } from "@/components/ui/form";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  input: z.string().min(1),
});

export default function SearchForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    router.push(`/search?q=${values.input}`);
  };
  return (
    <Form {...form}>
      <form
        className="w-full lg:w-1/2 px-4 py-2 rounded-full bg-secondary flex items-center gap-1"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Search size={15} />
        <FormField
          name="input"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grow">
              <FormControl>
                <Input
                  {...field}
                  className="grow focus-visible:ring-0 border-none shadow-none"
                  placeholder="Search"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
