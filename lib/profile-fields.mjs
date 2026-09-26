export const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
export const STANDINGS=['Freshman','Sophomore','Junior','Senior','Graduate','Other'];
export const INTERESTS=['Internship','Full-time','Research','Exploring'];
export const ETHNICITIES=['Asian','Black or African American','Hispanic or Latino','Middle Eastern','Native American','Pacific Islander','White','Another identity','Prefer not to say'];
export const GENDERS=['Female','Male','Non-binary','Another identity','Prefer not to say'];
export const LGBTQ=['Yes','No','Prefer not to say'];
export const INTERNATIONAL=['International','Domestic','Prefer not to say'];
export const CONSENT_VERSION='2026-09-24-v1';
export const CONSENT_TEXT='I authorize ColorStack UTA to share my resume, name, email, academic information, and career preferences with eligible recruiting partners through resume books. Optional demographic answers are excluded. I may withdraw consent for future sharing; copies already provided cannot be recalled.';
export const EMPTY_PROFILE={name:'',major:'',graduationMonth:'',graduationYear:'',standing:'',linkedin:'',portfolio:'',interests:[],locations:'',ethnicity:[],gender:'',lgbtq:'',international:'',shareResume:false};
export class ProfileError extends Error {constructor(message,status=400,code='PROFILE_ERROR'){super(message);this.status=status;this.code=code;}}
export function validateProfile(input,year=new Date().getUTCFullYear()) {
 if(!input||typeof input!=='object'||Array.isArray(input)) throw new ProfileError('Invalid profile.');
 if(Object.keys(input).some(k=>!Object.hasOwn(EMPTY_PROFILE,k))) throw new ProfileError('The profile contains unsupported fields. Refresh and try again.');
 const text=(key,max,required=false)=>{const v=input[key];if(typeof v!=='string'||v.length>max||(required&&!v.trim())) throw new ProfileError(`Check your ${key}.`);return v.trim();};
 const option=(key,list,required=false)=>{const v=text(key,100,required);if(v&&!list.includes(v))throw new ProfileError(`Choose a valid ${key}.`);return v;};
 const multi=(key,list)=>{const v=input[key];if(!Array.isArray(v)||v.length>list.length||v.some(x=>!list.includes(x))||new Set(v).size!==v.length)throw new ProfileError(`Check your ${key}.`);if(v.includes('Prefer not to say')&&v.length>1)throw new ProfileError('Choose Prefer not to say on its own.');return v;};
 const url=(key)=>{const v=text(key,500);if(!v)return '';let u;try{u=new URL(v);}catch{throw new ProfileError(`Use a full https:// URL for ${key}.`);}if(!['https:','http:'].includes(u.protocol)||u.username||u.password)throw new ProfileError(`Use a public web URL for ${key}.`);return u.href;};
 const grad=Number(input.graduationYear);if(!Number.isInteger(grad)||grad<year-10||grad>year+12)throw new ProfileError('Choose a valid graduation year.');
 if(typeof input.shareResume!=='boolean')throw new ProfileError('Check your resume-sharing preference.');
 return {name:text('name',120,true),major:text('major',150,true),graduationMonth:option('graduationMonth',MONTHS,true),graduationYear:grad,standing:option('standing',STANDINGS,true),linkedin:url('linkedin'),portfolio:url('portfolio'),interests:multi('interests',INTERESTS),locations:text('locations',500),ethnicity:multi('ethnicity',ETHNICITIES),gender:option('gender',GENDERS),lgbtq:option('lgbtq',LGBTQ),international:option('international',INTERNATIONAL),shareResume:input.shareResume};
}
export function assertOwned(record,userId,memberId) {
 if(record && (record.fields?.['Clerk User ID']!==userId || (memberId && (record.fields?.Member?.length!==1 || record.fields.Member[0]!==memberId)))) throw new ProfileError('This record needs an officer to review its account link.',409,'PROFILE_OWNERSHIP');
 return record;
}
export function memberFields(profile,userId,email) {return {'Clerk User ID':userId,Name:profile.name,Email:email,Major:profile.major,'Graduation Year':profile.graduationYear,'Academic Standing':profile.standing,'LinkedIn URL':profile.linkedin,'Portfolio URL':profile.portfolio};}
