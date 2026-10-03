import {verifyStripeEvent,paymentConfiguration} from '@/lib/payments/stripe.mjs';
import {reconcilePaymentEvent} from '@/lib/server/dues';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const maxDuration=60;
const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request){
 try{paymentConfiguration(process.env);if(!process.env.STRIPE_WEBHOOK_SECRET?.startsWith('whsec_'))throw Error();}catch{return reply({error:'Payment webhook is not configured.'},503);}
 const raw=await request.text();if(Buffer.byteLength(raw)>262144)return reply({error:'Payload too large'},413);
 let event;try{event=verifyStripeEvent(raw,request.headers.get('stripe-signature'),process.env.STRIPE_WEBHOOK_SECRET);}catch{return reply({error:'Invalid signature'},400);}
 if(event.livemode!==paymentConfiguration(process.env).live)return reply({error:'Wrong payment environment'},400);
 try{await reconcilePaymentEvent(event);return reply({received:true});}catch{return reply({error:'Payment processing incomplete; retry required.'},500);}
}
