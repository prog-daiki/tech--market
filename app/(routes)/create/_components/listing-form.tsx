"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { categories } from "@/components/navbar/categories";
import ImageUpload from "@/components/image-upload";


const formSchema = z.object({
  title: z.string().min(1, { message: "タイトルは必須です", }),
  description: z.string().min(1, { message: "詳細分は必須です" }),
  brand: z.string().min(1, { message: "ブランド名は必須です", }),
  condition: z.string().min(1, { message: "コンディションは必須です", }),
  category: z.string().min(1, { message: "カテゴリーは必須です", }),
  price: z.coerce.number(),
  images: z.object({ url: z.string() }).array().min(1, { message: "画像は必須です" }),
});

export const ListingForm = () => {

  const options = categories.map((category) => ({
    label: category.label,
    value: category.label,
  }
  ))

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      brand: "",
      condition: "",
      category: "",
      price: 0,
      images: [],
    }
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/listings`, values);
      toast.success("商品を出品しました！");
      router.refresh();
    } catch {
      toast.error("おっと！もう一度お試しください");
    } finally {
      router.push("/")
    }
  }

  return (
    <div className="mt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-8 bg-gray-100 rounded-md p-4 space-y-4 md:space-y-0">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold pl-1">商品名</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        {...field}
                        className="focus-visible:ring-neutral-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold pl-1">商品の詳細</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        {...field}
                        className="focus-visible:ring-neutral-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold pl-1">商品のブランド名</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        {...field}
                        className="focus-visible:ring-neutral-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold pl-1">商品の状態</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        {...field}
                        className="focus-visible:ring-neutral-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold pl-1">商品のカテゴリー</FormLabel>
                    <FormControl>
                      <Combobox
                        options={options}
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold pl-1">商品の価格</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        {...field}
                        className="focus-visible:ring-neutral-200"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>商品の画像</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value.map((image) => image.url)}
                        disabled={isSubmitting}
                        onChange={(url) => field.onChange([...field.value, { url }])}
                        onRemove={(url) => field.onChange(...field.value.filter((current) => current.url !== url))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <hr />
              <Button disabled={isSubmitting} type="submit">
                出品する
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
