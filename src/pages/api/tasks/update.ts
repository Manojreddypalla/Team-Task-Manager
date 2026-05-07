import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';

export const POST: APIRoute = async ({ request }) => {

  try {

    const {
      taskId,
      status
    } = await request.json();

    await prisma.task.update({

      where: {
        id: taskId
      },

      data: {
        status
      }

    });

    return new Response('Updated');

  } catch (err) {

    console.log(err);

    return new Response('Error', {
      status: 500
    });

  }

};