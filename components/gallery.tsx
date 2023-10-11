"use client"

import { Tab } from "@headlessui/react";
import NextImage from 'next/image';
import { Image, Listing, User } from "@prisma/client";
import GalleryTab from "./gellery-tab";
import HeartButton from "./heart-button";

type GalleryProps = {
  images: Image[];
  listing: Listing;
  currentUser?: User;
}

const Gallery: React.FC<GalleryProps> = ({
  images = [],
  listing,
  currentUser
}) => {
  return (
    <>
      <Tab.Group as="div" className="flex flex-col-reverse">
        <div className="mx-auto mt-4 w-full max-w-2xl sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {images.map((image) => (
              <GalleryTab key={image.id} image={image} />
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className="aspect-square w-full">
          {images.map((image) => (
            <Tab.Panel key={image.id}>
              <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                <NextImage
                  fill
                  src={image.url}
                  alt="Image"
                  className="object-cover object-center"
                />
                <div className="absolute top-3 right-3">
                  <HeartButton
                    listingId={listing.id}
                    currentUser={currentUser}
                  />
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

export default Gallery
