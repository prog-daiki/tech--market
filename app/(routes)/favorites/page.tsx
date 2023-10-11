import getCurrentUser from "@/app/actions/get-current-user";
import getFavoriteListings from "@/app/actions/get-favorites-listings";
import EmptyState from "@/components/empty-state";
import FavoritesClient from "./_components/favorites-client";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="お気に入りに登録している商品はありません"
        subtitle=""
      />
    );
  }

  return (
    <FavoritesClient
      listings={listings}
      currentUser={currentUser}
    />
  );
}

export default ListingPage;
