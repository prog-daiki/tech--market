"use client"

import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

const Logo = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  return (
    <>
      {isMainPage ? (
        <Image
          onClick={() => router.push("/")}
          className="hidden md:block cursor-pointer"
          src="/images/logo.png"
          width="100"
          height="100"
          alt="logo"
        />
      ) : (
        <div
          className="flex items-center gap-x-2 hover:bg-slate-100 transition-all cursor-pointer p-2 rounded-lg"
          onClick={() => router.push("/")}
        >
          <ArrowLeftCircle size={24} className="text-gray-700" />
          <p>トップに戻る</p>
        </div>

      )}
    </>
  )
}

export default Logo
