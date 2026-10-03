import {officer} from '@/lib/server/auth';
import Nav from '@/components/Nav';
import OfferReports from '@/components/OfferReports';
export const dynamic='force-dynamic';
export default async function Page(){return <><Nav/><main className="max-w-4xl mx-auto px-6 py-16">{await officer()?<OfferReports review/>:<p>Sign in with an approved officer account to review offer reports.</p>}</main></>;}
