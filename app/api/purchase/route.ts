import getCurrentUser from "@/app/actions/get-current-user";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"

export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json();
    const { listingId } = body;
    if (!listingId) {
      return new NextResponse("listingId is required", { status: 400 })
    }

    const listingAndPurchase = await prisma.listing.update({
      where: {
        id: listingId
      },
      data: {
        purchases: {
          create: {
            userId: currentUser.id,
          }
        }
      }
    });

    return NextResponse.json(listingAndPurchase);
  } catch (error) {
    console.log(`[PURCHASE_POST]`, error);
    return new NextResponse("Internal error", { status: 500 })
  }
}
