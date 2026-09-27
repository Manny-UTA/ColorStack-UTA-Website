import {verifyStripeEvent,requireTestConfiguration} from '@/lib/payments/stripe.mjs';
import {getSession,fulfill} from '@/lib/server/dues';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const maxDuration=60;
const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request){
 try{requireTestConfiguration(process.env);if(!process.env.STRIPE_WEBHOOK_SECRET?.startsWith('whsec_'))throw Error();}catch{return reply({error:'Sandbox webhook is not configured.'},503);}
 const raw=await request.text();if(Buffer.byteLength(raw)>262144)return reply({error:'Payload too large'},413);
 let event;try{event=verifyStripeEvent(raw,request.headers.get('stripe-signature'),process.env.STRIPE_WEBHOOK_SECRET);}catch{return reply({error:'Invalid signature'},400);}
 if(event.livemode!==false)return reply({error:'Test events only'},400);
 if(!['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(event.type))return reply({received:true});
 try{await fulfill(await getSession(event.data?.object?.id));return reply({received:true});}catch{return reply({error:'Payment processing incomplete; retry required.'},500);}
}
