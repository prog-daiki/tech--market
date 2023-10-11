'use client';

import Container from "@/components/container";
import ListingCard from "@/components/listings/listing-card";
import { Listing, User } from "@prisma/client";

interface PropertiesClientProps {
  listings: Listing[],
  currentUser?: User | null,
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  return (
    <Container>
      <div className="pt-2">
        <div>
          <h2 className="text-2xl font-bold my-2">出品リスト</h2>
          <p className="text-muted-foreground">出品した商品</p>
        </div>
      </div>
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 pb-4">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            edit
          />
        ))}
      </div>
    </Container>
  );
}

export default PropertiesClient;
