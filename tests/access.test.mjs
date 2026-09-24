import test from 'node:test';
import assert from 'node:assert/strict';
import {canEdit,verifiedEmail,OFFICER_ROLES} from '../lib/server/access.mjs';
const member = {primaryEmailAddressId:'email1',emailAddresses:[{id:'email1',emailAddress:'Member@UTA.edu',verification:{status:'verified'}}],privateMetadata:{}};
test('ordinary members cannot edit, even with user-controlled metadata',()=>{
 assert.equal(canEdit({...member,unsafeMetadata:{colorstackRole:'president'},publicMetadata:{colorstackRole:'president'}}),false);
 assert.equal(canEdit(null),false);
});
test('all six approved roles require verified primary email',()=>{
 for(const role of OFFICER_ROLES) assert.equal(canEdit({...member,privateMetadata:{colorstackRole:role}}),true);
 assert.equal(canEdit({...member,privateMetadata:{colorstackRole:'president'},primaryEmailAddressId:'missing'}),false);
 assert.equal(verifiedEmail(member),'member@uta.edu');
});
test('removing or changing a grant denies the next check',()=>{
 const user = {...member,privateMetadata:{colorstackRole:'treasurer'}};
 assert.equal(canEdit(user),true); user.privateMetadata={}; assert.equal(canEdit(user),false);
 user.privateMetadata={colorstackRole:'admin'}; assert.equal(canEdit(user),false);
});
