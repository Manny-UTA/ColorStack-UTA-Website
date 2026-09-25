import { identity } from "@/lib/server/auth";
import { canEdit, verifiedEmail } from "@/lib/server/access.mjs";
export const dynamic = "force-dynamic";
export async function GET() {
 try { const user = await identity();
 if(!user) return Response.json({error:"Please sign in with a verified email."},{status:401,headers:{"Cache-Control":"no-store"}});
 return Response.json({name:user.firstName || "",email:verifiedEmail(user),canEdit:canEdit(user)},{headers:{"Cache-Control":"no-store"}});
 } catch {return Response.json({error:"Account access is temporarily unavailable."},{status:503,headers:{"Cache-Control":"no-store"}});}
}
