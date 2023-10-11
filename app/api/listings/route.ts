import getCurrentUser from "@/app/actions/get-current-user";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"

export async function POST(
  req: Request,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json();
    const { title, description, price, category, brand, condition, images } = body;

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

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price,
        category,
        brand,
        condition,
        userId: currentUser.id,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image)
            ]
          }
        }
      }
    })

    return NextResponse.json(listing);

  } catch (error) {
    console.log(`[LISTINGS_POST]`, error);
    return new NextResponse("Internal error", { status: 500 })
  }
}
