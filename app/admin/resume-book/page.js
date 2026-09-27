import {officer} from '@/lib/server/auth';
import Nav from '@/components/Nav';
import ResumeBook from '@/components/ResumeBook';
import Link from 'next/link';
export const dynamic='force-dynamic';
export default async function Page(){const user=await officer();return <><Nav/><main className="max-w-4xl mx-auto px-6 py-16"><p className="text-brass uppercase tracking-widest text-xs">Officer access</p><h1 className="font-serif text-4xl my-5">Resume book releases.</h1>{user?<ResumeBook/>:<><p>Sign in with an individually approved officer account.</p><Link href="/sign-in" className="underline">Sign in</Link></>}</main></>;}
