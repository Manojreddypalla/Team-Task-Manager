import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';

export const POST: APIRoute = async ({ request }) => {

  try {

    const data = await request.json();

    await prisma.project.create({

      data: {

        name: data.name,

        description: data.description

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