"use client";
import {MAJORS,canonicalMajor} from '@/lib/majors.mjs';
const inputClass='w-full bg-cream border border-navy/20 rounded-sm px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brass/50';
export default function MajorField({value,onChange}) {
 const canonical=canonicalMajor(value);
 const other=!!value&&!canonical;
 const selected=other?'Other':canonical||'';
 return <div className="space-y-2">
 <label className="block text-sm font-semibold" htmlFor="major-choice">Major *</label>
 <select id="major-choice" required className={inputClass} value={selected} onChange={e=>{onChange(e.target.value==='Other'?'Other: ':e.target.value);}}>
 <option value="">Select your major…</option>{MAJORS.map(m=><option key={m}>{m}</option>)}<option value="Other">Other — enter your major</option>
 </select>
 {other&&<label className="block text-sm">Your major *<input required maxLength={143} className={inputClass+' mt-2'} value={value.startsWith('Other: ')?value.slice(7):value} onChange={e=>onChange('Other: '+e.target.value)}/></label>}
 <p className="text-xs text-navy/60">Select your primary major. All majors are welcome.</p>
 </div>;
}

