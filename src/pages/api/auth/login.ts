
import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../lib/prisma';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          error: 'Invalid credentials'
        }),
        {
          status: 401
        }
      );
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return new Response(
        JSON.stringify({
          error: 'Invalid credentials'
        }),
        {
          status: 401
        }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role
      },
      import.meta.env.JWT_SECRET
    );

    cookies.set('token', token, {
      path: '/',
      httpOnly: true
    });

    return new Response(
      JSON.stringify({
        success: true
      }),
      {
        status: 200
      }
    );

  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: 'Server error'
      }),
      {
        status: 500
      }
    );
  }
};
