"use client"

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import { usePathname, useRouter } from "next/navigation";
import { useLoginModal } from "@/hooks/use-login-modal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { useCallback } from "react";

type UserMenuProps = {
  currentUser?: User;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  const handleClick = useCallback(() => {
    if (currentUser) {
      router.push("/create");
    } else {
      loginModal.onOpen();
    }
  }, [currentUser])

  return (
    <div className='ml-auto md:ml-0'>
      <div className='flex gap-3 items-center'>
        {isMainPage ? (
          <div
            onClick={handleClick}
            className='hidden md:block text-sm font-semibold p-4 rounded-full hover:bg-neutral-100
          transition-all cursor-pointer'
          >
            出品する
          </div>
        ) : (
          null
        )}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex items-center gap-3
              rounded-xl cursor-pointer hover:shadow-md transition-all"
            >
              <AiOutlineMenu />
              <div className="hidden md:block">
                <Avatar />
              </div>
            </div>
          </DropdownMenuTrigger>
          {currentUser ? (
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => router.push("/favorites")}>お気に入り</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/properties")}>出品リスト</DropdownMenuItem>
              <DropdownMenuItem onClick={handleClick}>出品する</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>ログアウト</DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent>
              <DropdownMenuLabel>ログインが必要です</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={registerModal.onOpen}>会員登録</DropdownMenuItem>
              <DropdownMenuItem onClick={loginModal.onOpen}>ログイン</DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </div>
  )
}

export default UserMenu
