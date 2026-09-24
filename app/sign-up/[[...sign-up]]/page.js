import { SignUp } from "@clerk/nextjs";
import { configured } from "@/lib/server/auth";
import Nav from "@/components/Nav";
export default function Page() { return <><Nav /><main className="min-h-screen flex justify-center px-5 py-20">{configured() ? <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" signUpUrl="/sign-up" fallbackRedirectUrl="/portal" /> : <p>Member sign-in is being prepared. Please check back soon.</p>}</main></>; }
