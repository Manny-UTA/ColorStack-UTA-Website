import { officer } from "@/lib/server/auth";
import OfficerPhotos from "@/components/OfficerPhotos";
import Nav from "@/components/Nav";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function Page() {
  if (await officer()) return <OfficerPhotos />;
  return <><Nav /><main className="max-w-xl mx-auto px-6 py-20"><p className="text-brass uppercase tracking-widest text-xs">Officer access</p><h1 className="font-serif text-4xl mt-4">Sign in to manage the chapter.</h1><p className="my-6">Only individually approved officers can edit photos and flyers. If you are already signed in, ask the chapter administrator to approve your account.</p><Link href="/sign-in" className="inline-block bg-navy text-cream px-6 py-3 rounded-sm whitespace-nowrap">Sign in</Link></main></>;
}
