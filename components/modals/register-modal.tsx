"use client"

import { useLoginModal } from "@/hooks/use-login-modal"
import { useRouter } from "next/navigation";
import Modal from "./modal";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(4, { message: "名前は4文字以上で入力してください" }),
  email: z.string().min(2, { message: "メールアドレスを入力してください" }),
  password: z.string().min(8, { message: "パスワードは8文字以上入力してください" }),
});

export const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const toggleModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
  }


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post('/api/register', values)
        .then(() => signIn('credentials', {
          ...values,
          redirect: false,
        }))
      toast.success("会員登録が成功しました！");
    } catch (error) {
      toast.error("おっと！もう一度ログインしてください")
    } finally {
      setLoading(false)
      router.refresh();
      registerModal.onClose();
    }
  }

  return (
    <>
      <Modal
        title="tech marketへようこそ！"
        description="アカウントを作成しよう！"
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ユーザーネーム</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading} placeholder="ユーザーネーム" {...field}
                            className="focus-visible:ring-neutral-200 "
                          />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>メールアドレス</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading} placeholder="メールアドレス" {...field}
                            className="focus-visible:ring-neutral-200 "
                            type="email"
                          />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>パスワード</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading} placeholder="パスワード" {...field}
                            className="focus-visible:ring-neutral-200 "
                            type="password"
                          />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-6 space-x-2 flex items-center justify-end">
                  <Button disabled={loading} variant="outline" onClick={registerModal.onClose}>キャンセル</Button>
                  <Button disabled={loading} type="submit">会員登録</Button>
                </div>
              </form>
            </Form>
            <hr />
            <div className="text-center text-muted-foreground">
              <p >
                アカウントをすでに持っていますか？
                <span
                  className="hover:border-b-[1px] cursor-pointer border-gray-500 transition-all"
                  onClick={toggleModal}
                >
                  ログイン
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
