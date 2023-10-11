import prisma from "@/lib/db";

export interface IListingsParams {
  title?: string;
  category?: string;
  userId: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const { title, category, userId } = params;

    const listings = await prisma.listing.findMany({
      where: {
        title: {
          contains: title,
        },
        category,
        userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        images: true,
      }
    });
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
