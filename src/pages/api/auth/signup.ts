import type { APIRoute } from "astro";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { name, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "ADMIN" },
    });

    const token = jwt.sign({ id: user.id, email: user.email }, import.meta.env.JWT_SECRET, { expiresIn: "24h" });

    cookies.set("auth_token", token, { path: "/", httpOnly: true });
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};