
import { defineMiddleware } from 'astro:middleware';
import jwt from 'jsonwebtoken';

export const onRequest = defineMiddleware(async (context, next) => {

  const token =
    context.cookies.get('token')?.value;

  const path =
    context.url.pathname;

  // Public routes
  if (
    path === '/login' ||
    path.startsWith('/api/auth')
  ) {
    return next();
  }

  // Protected routes
  if (
    path.startsWith('/dashboard') ||
    path.startsWith('/admin') ||
    path.startsWith('/member')
  ) {

    if (!token) {
      return context.redirect('/login');
    }

    try {

      const user = jwt.verify(
        token,
        import.meta.env.JWT_SECRET
      );

      context.locals.user = user;

    } catch {

      context.cookies.delete('token');

      return context.redirect('/login');
    }
  }

  return next();
});

