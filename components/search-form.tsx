import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  value: z.string().min(1),
});

export default function SearchForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    router.push(`/search?query=${values.value}`);
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full grid place-items-center"
    >
      <div className="w-1/2 px-6 py-4 flex items-center gap-2 bg-white/10 rounded-full">
        <Search size={15} />
        <Controller
          name="value"
          control={form.control}
          render={({ field }) => (
            <input
              placeholder="Search"
              {...field}
              className="grow outline-none bg-transparent"
            />
          )}
        />
      </div>
    </form>
  );
}
