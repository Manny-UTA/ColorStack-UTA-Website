import {offers} from '@/lib/server/offers';
import {publicOfferCount} from '@/lib/offers.mjs';
export const dynamic='force-dynamic';
export async function GET(){try{return Response.json({offers:publicOfferCount(await offers())},{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({offers:87},{headers:{'Cache-Control':'no-store'}});}}
