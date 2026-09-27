import {INTERESTS} from './profile-fields.mjs';
export function recruitingFields(fields){const legacy=(fields['Career Interests']||'').split(', ').filter(Boolean);return {opportunity:fields['Opportunity Type']||legacy.filter(v=>INTERESTS.includes(v)).join(', '),careers:legacy.filter(v=>!INTERESTS.includes(v)).join(', ')};}
export function eligibleResumes(members,resumes){
 const userCounts=new Map();for(const r of resumes){const u=r.fields?.['Clerk User ID'];if(u)userCounts.set(u,(userCounts.get(u)||0)+1);}
 const memberCounts=new Map();for(const m of members){const u=m.fields?.['Clerk User ID'];if(u)memberCounts.set(u,(memberCounts.get(u)||0)+1);}
 const byId=new Map(members.map(m=>[m.id,m]));
 return resumes.flatMap(r=>{const f=r.fields||{},u=f['Clerk User ID'];const m=byId.get(f.Member?.[0]);if(!u||userCounts.get(u)!==1||memberCounts.get(u)!==1||f.Member?.length!==1||m?.fields?.['Clerk User ID']!==u||!m.fields.Name||!m.fields.Email||f['Resume Book Opt-in']!==true||f['Explicit Resume Sharing Consent']!==true||f['Resume File']?.length!==1)return [];
 const file=f['Resume File'][0];if(!file.id||!file.url||!file.filename?.toLowerCase().endsWith('.pdf'))return [];return [{resume:r,member:m,file}];});
}
export function csvCell(value){let s=String(value??'');if(/^[\s]*[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
export function csvIndex(entries){const rows=[['Name','Email','Major','Academic Standing','Graduation','Opportunity Type','Career Interests','Availability','Preferred Locations','LinkedIn','Portfolio','Resume File']];for(const {member:m,resume:r,filename} of entries){const f=m.fields,g=r.fields,career=recruitingFields(g);rows.push([f.Name,f.Email,f.Major,f['Academic Standing'],g['Graduation Month/Year'],career.opportunity,career.careers,g.Availability,g['Preferred Work Locations'],f['LinkedIn URL'],f['Portfolio URL'],filename]);}return '\uFEFF'+rows.map(row=>row.map(csvCell).join(',')).join('\r\n');}
