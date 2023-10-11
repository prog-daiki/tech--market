import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 })
    }

    if (!password) {
      return new NextResponse("Password is required", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(`[REGISTER_POST]`, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
