import getCurrentUser from "@/app/actions/get-current-user";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"

export async function POST(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!params.listingId) {
      return new NextResponse("listingId is required", { status: 400 })
    }
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(params.listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        favoriteIds
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(`[FAVORITES_POST]`, error);
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!params.listingId) {
      return new NextResponse("listingId is required", { status: 400 })
    }
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== params.listingId);
    const user = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        favoriteIds
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(`[FAVORITES_DELETE]`, error);
    return new NextResponse("Internal error", { status: 500 })
  }
}
