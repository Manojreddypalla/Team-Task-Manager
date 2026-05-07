import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';

export const POST: APIRoute = async ({ request, locals }) => {

  const user = locals.user;

  if (!user) {

    return new Response('Unauthorized', {
      status: 401
    });

  }

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

};