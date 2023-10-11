import getCurrentUser from "@/app/actions/get-current-user";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { listingId: string; } }
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { title, description, price, category, brand, condition, images } = body;

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    if (!title) {
      return new NextResponse("Name is required", { status: 400 })
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 })
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 })
    }
    if (!category) {
      return new NextResponse("Category is required", { status: 400 })
    }
    if (!brand) {
      return new NextResponse("Brand is required", { status: 400 })
    }
    if (!condition) {
      return new NextResponse("Brand is required", { status: 400 })
    }
    if (!images || !images.length) {
      return new NextResponse("Images is required", { status: 400 })
    }

    await prisma.listing.update({
      where: {
        id: params.listingId,
      },
      data: {
        title,
        description,
        price,
        category,
        brand,
        condition,
        images: {
          deleteMany: {},
        },
      }
    })

    const listing = await prisma.listing.update({
      where: {
        id: params.listingId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.log(`[LISTING_PATCH]`, error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.listingId) {
      return new NextResponse("Billboard id is required", { status: 400 })
    }

    const listing = await prisma.listing.delete({
      where: {
        id: params.listingId
      }
    })

    return NextResponse.json(listing)

  } catch (error) {
    console.log(`[LISTING_DELETE]`, error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
