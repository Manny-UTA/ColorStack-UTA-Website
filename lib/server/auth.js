import "server-only";
import { currentUser } from "@clerk/nextjs/server";
import { canEdit, verifiedEmail } from "./access.mjs";
export const configured = () => Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
export async function identity() {
  if (!configured()) return null;
  const user = await currentUser();
  return verifiedEmail(user) ? user : null;
}
export async function officer() { const user = await identity(); return canEdit(user) ? user : null; }
export function sameOrigin(request) {
  return request.headers.get("origin") === new URL(request.url).origin;
}
