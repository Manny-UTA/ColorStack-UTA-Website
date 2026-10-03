export function validateOffer(body) {
 const text=(key,max)=>{const value=typeof body[key]==='string'?body[key].trim():'';if(!value||value.length>max)throw Error('Complete the company, role, offer type and date.');return value;};
 const company=text('company',100),role=text('role',150),type=text('type',20),date=text('date',10);
 if(!['Internship','Full-time'].includes(type)||!/^\d{4}-\d{2}-\d{2}$/.test(date)||new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date||date>new Date().toISOString().slice(0,10)||date<'2023-01-01')throw Error('Choose a valid offer date from 2023 through today.');
 return {company,role,type,date};
}
export function publicOfferCount(records){return 72+records.filter(r=>r.status==='approved'&&r.addToBaseline===true).length;}
