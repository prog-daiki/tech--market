import Container from "@/components/container";
import ListingCard from "@/components/listings/listing-card";
import { Listing, User } from "@prisma/client";

type FavoritesClientProps = {
  listings: Listing[],
  currentUser?: User | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser
}) => {
  return (
    <div className="pt-2">
      <Container>
        <div>
          <h2 className="text-2xl font-bold my-2">お気に入り</h2>
          <p className="text-muted-foreground">お気に入りに登録した商品</p>
        </div>
        <div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </div>

  );
}

export default FavoritesClient;
