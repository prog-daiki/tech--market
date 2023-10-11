"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Image as ListingImage, Listing, User } from "@prisma/client";
import HeartButton from "../heart-button";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";

interface ListingCardProps {
  data: Listing & {
    images: ListingImage[]
  };
  currentUser?: User | null;
  edit?: boolean;
};


const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  edit,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/listings/${data.id}`);
      toast.success("商品を削除しました！");
      router.refresh();
    } catch {
      toast.error("おっと！もう一度お試しください");
    } finally {
      setLoading(false);
    }
  }

  const handleClick = useCallback(() => {
    if (loading) {
      return null
    } else {
      router.push(`/listings/${data.id}`)
    }
  }, [loading])

  return (
    <div className="flex flex-col space-y-2">
      <div
        onClick={handleClick}
        className="col-span-1 cursor-pointer group pb-2">
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image
              fill
              className="object-cover h-full w-full group-hover:scale-110 transition"
              src={data.images[0].url}
              alt="Listing"
            />
            <div className="absolute top-3 right-3">
              <HeartButton
                listingId={data.id}
                currentUser={currentUser}
              />
            </div>
          </div>
          <div className="font-semibold text-lg">
            {data.title}
          </div>
          <div className="font-light text-neutral-500 flex flex-col gap-1">
            <div className="font-semibold">
              {data.category}
            </div>
            <div>
              状態：{data.condition}
            </div>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
              ¥ {data.price}
            </div>
          </div>
        </div>
      </div>
      {edit ? (
        <div className="flex justify-start space-x-2">
          <Button onClick={() => router.push(`/edit/${data.id}`)} disabled={loading}>
            編集する
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={loading}>削除する</Button>
        </div>
      ) : (null)}
    </div>
  )
}

export default ListingCard
