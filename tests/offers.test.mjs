import test from 'node:test';
import assert from 'node:assert/strict';
import {validateOffer,publicOfferCount} from '../lib/offers.mjs';
test('only reviewed new reports increase historical baseline',()=>{assert.equal(publicOfferCount([{status:'pending',addToBaseline:true},{status:'rejected',addToBaseline:true},{status:'approved',addToBaseline:false},{status:'approved',addToBaseline:true}]),73);});
test('offer report validation rejects future dates and unsupported types',()=>{const valid={company:' Example ',role:'Engineer',type:'Internship',date:'2026-09-01'};assert.equal(validateOffer(valid).company,'Example');assert.throws(()=>validateOffer({...valid,date:'2099-01-01'}));assert.throws(()=>validateOffer({...valid,type:'Scholarship'}));assert.throws(()=>validateOffer({...valid,date:'2026-02-31'}));});
