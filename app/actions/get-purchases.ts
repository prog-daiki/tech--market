import prisma from "@/lib/db";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getPurchases(
  params: IParams
) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const listing = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        images: true,
      }
    })

    const purchases = await prisma.purchase.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return purchases;
  } catch (error: any) {
    throw new Error(error);
  }
}
