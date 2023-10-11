"use client"

import { Button } from '@/components/ui/button'
import { useLoginModal } from '@/hooks/use-login-modal';
import { Listing, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

type PurchaseButtonProps = {
  listing: Listing;
  currentUser: User;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  listing,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onPurchase = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      setIsLoading(true);
      console.log(listing)
      // await axios.post('/api/purchase', { listingId: listing.id });
      toast.success("商品を購入しました！");
      router.refresh();
    } catch (error) {
      toast.error("おっと！もう一度お試しください")
    } finally {
      setIsLoading(false)
      router.push("/")
    }
  }
  return (
    <Button className='w-full p-8 text-xl font-bold' disabled={isLoading} onClick={() => onPurchase()}>
      購入する
    </Button>)
}

export default PurchaseButton
