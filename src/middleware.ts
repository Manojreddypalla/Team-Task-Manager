import { defineMiddleware } from "astro:middleware";
import jwt from "jsonwebtoken";

export const onRequest = defineMiddleware((context, next) => {
  const token = context.cookies.get("auth_token")?.value;
  const isProtected = context.url.pathname.startsWith("/dashboard");

  if (isProtected && !token) {
    return context.redirect("/login");
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, import.meta.env.JWT_SECRET);
      context.locals.user = decoded; 
    } catch (err) {
      context.cookies.delete("auth_token");
      if (isProtected) return context.redirect("/login");
    }
  }

  return next();
});