import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete('token')

  return new Response('Logged out')
}