import prisma from "@/lib/db";
import getCurrentUser from "./get-current-user";
import { redirect } from "next/navigation";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      redirect("/");
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        images: true,
      }
    });
    return favorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
