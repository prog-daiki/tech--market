import getCurrentUser from "@/app/actions/get-current-user";
import getListings from "@/app/actions/get-listings";
import EmptyState from "@/components/empty-state";
import { redirect } from "next/navigation";
import PropertiesClient from "./_components/properties-client";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/")
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="出品した商品はまだありません！"
        subtitle="Tech Marketに商品を出品してみよう！"
      />
    );
  }

  return (
    <PropertiesClient
      listings={listings}
      currentUser={currentUser}
    />
  );
}

export default PropertiesPage;
