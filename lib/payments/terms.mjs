export const TERMS = [
 {semester:'Fall 2026',starts:'2026-08-01',ends:'2026-12-31',followingSpring:'Spring 2027',annualEnds:'2027-05-31',annualCutoff:'2026-10-31'},
 {semester:'Spring 2027',starts:'2027-01-01',ends:'2027-05-31'},
];
export const chicagoDate=(date=new Date())=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
export const currentTerm=(date=new Date())=>TERMS.find(t=>chicagoDate(date)>=t.starts&&chicagoDate(date)<=t.ends)||null;
export const sessionTerm=session=>TERMS.find(t=>t.semester===session.metadata?.semester);
export function checkoutDeadline(term,plan){
 // These enrollment deadlines fall in standard time (semester) or daylight time (October).
 return Date.parse(plan==='annual'?`${term.annualCutoff}T23:59:59-05:00`:`${term.ends}T23:59:59${term.semester.startsWith('Spring')?'-05:00':'-06:00'}`);
}
export function annualAvailable(term,date=new Date()){
 return Boolean(term?.annualCutoff&&chicagoDate(date)<=term.annualCutoff&&checkoutDeadline(term,'annual')-date.getTime()>31*60000);
}
export function coverage(fields,term){
 return Boolean(term&&fields['Payment Status']==='Paid'&&!fields['Amount Refunded']&&fields['Covered Semesters']?.includes(term.semester)&&fields['Coverage End']>=term.ends);
}
