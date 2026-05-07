import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../lib/prisma';

export const POST: APIRoute = async ({ request }) => {

  try {

    const data = await request.json();

    const hashedPassword =
      await bcrypt.hash(data.password, 10);

    await prisma.user.create({

      data: {

        name: data.name,

        email: data.email,

        password: hashedPassword,

        role: data.role

      }

    });

    return new Response(

      JSON.stringify({
        success: true
      }),

      {
        status: 200
      }

    );

  } catch (err) {

    console.log(err);

    return new Response(

      JSON.stringify({
        error: 'Failed'
      }),

      {
        status: 500
      }

    );

  }

};