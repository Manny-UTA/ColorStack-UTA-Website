import test from 'node:test';
import assert from 'node:assert/strict';
import {validateProfile,memberFields,assertOwned,EMPTY_PROFILE} from '../lib/profile-fields.mjs';
const valid={...EMPTY_PROFILE,name:'Test Member',major:'Computer Science',graduationMonth:'May',graduationYear:2027,standing:'Junior'};
test('profile normalizes fields and allows omitted demographics',()=>{const p=validateProfile(valid,2026);assert.deepEqual(p.ethnicity,[]);assert.equal(p.shareResume,false);assert.equal(p.graduationYear,2027);});
test('rejects browser-supplied ownership, dues, or permission fields',()=>{for(const key of ['id','recordId','Clerk User ID','Membership Status','duesPaid','colorstackRole'])assert.throws(()=>validateProfile({...valid,[key]:'attacker'},2026));});
test('server mapping supplies trusted ID and email without dues status',()=>{const fields=memberFields(validateProfile(valid,2026),'user_trusted','verified@example.com');assert.equal(fields['Clerk User ID'],'user_trusted');assert.equal(fields.Email,'verified@example.com');assert.equal(Object.hasOwn(fields,'Membership Status'),false);});
test('record ownership requires both Clerk identity and exact linked member',()=>{const r={fields:{'Clerk User ID':'user_a',Member:['rec_a']}};assert.equal(assertOwned(r,'user_a','rec_a'),r);assert.throws(()=>assertOwned(r,'user_b','rec_a'));assert.throws(()=>assertOwned(r,'user_a','rec_b'));assert.throws(()=>assertOwned({fields:{...r.fields,Member:['rec_a','rec_b']}},'user_a','rec_a'));});
test('rejects executable URLs and invalid demographic choices',()=>{for(const p of [{portfolio:'javascript:alert(1)'},{linkedin:'https://user:password@example.com'},{ethnicity:['Prefer not to say','Asian']},{gender:'unbounded'},{shareResume:'true'},{graduationYear:9999},{interests:['Internship','Internship']}])assert.throws(()=>validateProfile({...valid,...p},2026));});
test('allows clearing prior optional answers',()=>{const p=validateProfile({...valid,gender:'',ethnicity:[],lgbtq:'',international:'',shareResume:false},2026);assert.equal(p.gender,'');assert.deepEqual(p.ethnicity,[]);});

test('major categories normalize aliases and require explicit other',()=>{
 for(const major of ['CS','computer science',' Computer   Science '])assert.equal(validateProfile({...valid,major},2026).major,'Computer Science');
 assert.equal(validateProfile({...valid,major:'Other: Biology'},2026).major,'Other: Biology');
 assert.equal(validateProfile({...valid,major:'Other: CS'},2026).major,'Computer Science');
 for(const major of ['anything','Other: ','Other'])assert.throws(()=>validateProfile({...valid,major},2026));
});
test('separates opportunity, career interest and availability',()=>{const p=validateProfile({...valid,interests:['Internship'],careerInterests:['Software Engineering','Data / AI'],availability:'May 2027'},2026);assert.deepEqual(p.interests,['Internship']);assert.equal(p.availability,'May 2027');assert.equal(p.careerInterests.length,2);assert.throws(()=>validateProfile({...valid,careerInterests:['Internship']},2026));assert.throws(()=>validateProfile({...valid,availability:'whenever'},2026));});
