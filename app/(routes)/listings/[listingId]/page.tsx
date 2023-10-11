import Container from '@/components/container'
import React from 'react'
import prisma from "@/lib/db"
import Gallery from '@/components/gallery'
import getCurrentUser from '@/app/actions/get-current-user'
import Avatar from '@/components/avatar'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import PurchaseButton from './_components/purchase-button'

const ListingPage = async ({ params }: { params: { listingId: string } }) => {
  const currentUser = await getCurrentUser();
  const listing = await prisma.listing.findUnique({
    where: {
      id: params.listingId,
    },
    include: {
      images: true,
      user: true,
    }
  });

  if (!listing) {
    redirect("/")
  }

  return (
    <Container>
      <div className='p-4 lg:px-16'>
        <div className='flex space-x-2 items-center mb-2'>
          <h1 className='text-2xl font-bold '>{listing?.title}</h1>
          <p className='font-semibold text-muted-foreground'>{listing.brand}</p>
        </div>
        <div className='flex space-x-2 mb-4'>
          <p className='font-semibold text-muted-foreground'>{listing.category}</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-8'>
          <Gallery images={listing?.images!} listing={listing!} currentUser={currentUser!} />
          <div>
            <div className='text-xl font-semibold text-gray-700 flex space-x-2 p-4'>
              <p>出品者：{listing?.user.name}</p>
              <Avatar />
            </div>
            <hr />
            <div className='p-4'>
              <p className='text-lg font-semibold text-black'>商品の状態：{listing.condition}</p>
            </div>
            <hr />
            <div className='p-4'>
              <p className='text-lg font-semibold text-black'>{listing.description}</p>
            </div>
            <div className='p-4 border-[1px] rounded-lg'>
              <div className='p-4 border-b-2 text-xl font-bold'>¥ {listing.price}</div>
              <div className='p-4'>
                <PurchaseButton listing={listing} currentUser={currentUser!} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingPage
