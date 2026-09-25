import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { configured } from "@/lib/server/auth";
import MemberAccount from "@/components/MemberAccount";
export default function PortalPage() { return <><Nav /><main className="max-w-5xl mx-auto px-6 py-16"><p className="text-brass uppercase tracking-widest text-xs font-bold">Member portal</p><h1 className="font-serif text-4xl sm:text-5xl mt-4 mb-8">Your place in ColorStack.</h1>{configured() ? <MemberAccount /> : <p>Member sign-in is being prepared. Please check back soon.</p>}</main><Footer /></>; }
