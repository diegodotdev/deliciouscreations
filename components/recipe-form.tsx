"use client";

import { useUser } from "@clerk/nextjs";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Dropzone, { FileRejection } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { ImageIcon, Loader2, PlusCircle, RotateCw, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/constants";
import Image from "next/image";
import { toast } from "sonner";
import { createRecipe } from "@/actions";
import { Body } from "@/types";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).max(300),
  imageUrl: z.string().min(1),
  category: z.string().min(1),
  ingredients: z
    .array(
      z.object({
        value: z.string().min(1),
      })
    )
    .min(1),
  instructions: z
    .array(
      z.object({
        value: z.string().min(1),
      })
    )
    .min(1),
});

export default function RecipeForm({
  createRecipe,
}: {
  createRecipe: (body: Body) => void;
}) {
  const { user } = useUser();
  const [imageAsset, setImageAsset] = useState<null | string>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      category: "",
      ingredients: [{ value: "" }],
      instructions: [{ value: "" }],
    },
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const url = data.serverData.url;
      setImageAsset(url);
      form.setValue("imageUrl", data.serverData.url);
    },
  });

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    toast.error(
      `${file.file.type} type is not supported. Please choose a PNG, JPG, or JPEG image instead.`
    );
  };
  const {
    fields: ings,
    append: addIng,
    remove: remIng,
  } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  const {
    fields: ins,
    append: addIns,
    remove: remIns,
  } = useFieldArray({
    name: "instructions",
    control: form.control,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const ingredients = form.getValues("ingredients").map((i) => i.value);
    const instructions = form.getValues("instructions").map((i) => i.value);

    const body: Body = {
      ...values,
      ingredients,
      instructions,
      clerkId: user?.id as string,
    };

    try {
      await createRecipe(body);
      form.reset();
      setImageAsset(null);
      toast.success("Recipe has been uploaded.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, try again.");
    }
  };
  return (
    <Form {...form}>
      <MaxWidthWrapper className="py-10 grid place-items-center">
        <form
          className="w-full lg:w-2/5 flex flex-col gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-[100px] resize-none" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full flex flex-col space-y-2">
            <FormLabel>Image</FormLabel>
            <Dropzone
              onDropAccepted={onDropAccepted}
              onDropRejected={onDropRejected}
            >
              {({ getInputProps, getRootProps }) => (
                <div
                  {...getRootProps()}
                  className="w-full h-full border rounded p-4 aspect-video grid place-items-center"
                >
                  <input {...getInputProps()} />
                  {!isUploading && !imageAsset ? (
                    <ImageIcon size={15} />
                  ) : isUploading ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    imageAsset && (
                      <div className="w-full h-full relative">
                        <div className="w-full h-full rounded-xl overflow-hidden relative">
                          <Image
                            src={imageAsset}
                            alt="uploaded image"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button
                          size="icon"
                          onClick={() => setImageAsset(null)}
                          className="absolute top-2 right-2 z-50"
                        >
                          <RotateCw size={15} />
                        </Button>
                      </div>
                    )
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category to add to the recipe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((i) => (
                      <SelectItem value={i.value} key={i.id}>
                        {i.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <FormLabel>Ingredients</FormLabel>
            {ings.map((field, index) => (
              <div className="w-full flex items-center gap-4" key={index}>
                <FormField
                  name={`ingredients.${index}.value`}
                  key={field.id}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button onClick={() => remIng(index)} size="icon">
                  <X size={15} />
                </Button>
              </div>
            ))}
            <Button onClick={() => addIng({ value: "" })} variant="outline">
              <PlusCircle size={15} />
              Add Ingredient
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Instructions</FormLabel>
            {ins.map((field, index) => (
              <div className="w-full flex items-start gap-4" key={index}>
                <FormField
                  name={`instructions.${index}.value`}
                  key={field.id}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Textarea
                          {...field}
                          className="w-full h-[100px] resize-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button onClick={() => remIns(index)} size="icon">
                  <X size={15} />
                </Button>
              </div>
            ))}
            <Button onClick={() => addIns({ value: "" })} variant="outline">
              <PlusCircle size={15} />
              Add Instruction
            </Button>
          </div>
          <Button type="submit">Post</Button>
        </form>
      </MaxWidthWrapper>
    </Form>
  );
}
