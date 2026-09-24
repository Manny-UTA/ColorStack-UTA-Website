"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SEED_EVENTS } from "@/lib/content";
import { storage } from "@/lib/storage";
export default function MemberAccount() {
 const { isLoaded, isSignedIn } = useUser();
 const [account, setAccount] = useState(null);
 const [error, setError] = useState("");
 const [events, setEvents] = useState(SEED_EVENTS);
 useEffect(() => { storage.get("events").then(({value}) => {const data = typeof value === "string" ? JSON.parse(value) : value; if(Array.isArray(data)) setEvents(data);}).catch(() => {}); }, []);
 useEffect(() => { if (!isSignedIn) {setAccount(null);return;} let active = true; fetch("/api/account",{cache:"no-store"}).then(async res => { const data = await res.json(); if(!res.ok) throw Error(data.error); if(active) setAccount(data); }).catch(e => {if(active) setError(e.message);}); return () => {active=false;}; }, [isSignedIn]);
 return <><section className="bg-white border border-navy/15 p-6 sm:p-8">{!isLoaded ? <p>Loading…</p> : !isSignedIn ? <><p className="mb-6">Sign in with your verified email to access your membership.</p><div className="flex flex-wrap gap-3"><Link href="/sign-in" className="bg-navy text-cream px-6 py-3 rounded-sm uppercase text-xs tracking-widest font-bold whitespace-nowrap">Sign in</Link><Link href="/sign-up" className="border border-navy/20 px-6 py-3 rounded-sm uppercase text-xs tracking-widest font-bold whitespace-nowrap">Create account</Link></div></> : <><div className="flex justify-between items-center gap-4"><h2 className="font-serif text-2xl">Welcome{account?.name ? `, ${account.name}` : ""}.</h2><UserButton /></div>{error ? <p role="alert" className="mt-5">{error}</p> : !account ? <p className="mt-5">Loading your account…</p> : <><p className="mt-4 text-sm">{account.email}</p><p className="mt-4">Your email is verified. Membership registration and dues checkout are being connected.</p>{account.canEdit && <Link href="/admin" className="inline-block mt-6 border border-navy/20 px-5 py-3 rounded-sm whitespace-nowrap">Manage photos & flyers</Link>}</>}</>}</section><section id="events" className="mt-14"><h2 className="font-serif text-3xl mb-6">Chapter events</h2><div className="grid sm:grid-cols-2 gap-4">{[...events].sort((a,b)=>String(a.date).localeCompare(String(b.date))).map(event=><article key={event.id} className="border border-navy/10 bg-white p-5"><p className="text-brass uppercase text-xs tracking-widest">{event.type}</p><h3 className="font-serif text-xl my-2">{event.title}</h3><p className="text-sm">{event.date} · {event.time}</p><p className="text-sm mt-2">{event.location}</p></article>)}</div></section></>;
}
