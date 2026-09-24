export const FOUNDED_YEAR = 2023;

export const SEED_MEMBERS = [
  { email: "manny@uta.edu", name: "Manuel Arellano Jr.", role: "Co-President", duesPaid: true, since: "Fall 2023" },
  { email: "jane.doe@uta.edu", name: "Jane Doe", role: "Member", duesPaid: true, since: "Spring 2025" },
  { email: "alex.rios@uta.edu", name: "Alex Rios", role: "Member", duesPaid: false, since: "Fall 2024" },
];

export const SEED_EVENTS = [
  { id: "e1", title: "Fall GBM #1", type: "Chapter Event", date: "2026-09-03", time: "6:00 PM", location: "ERB 125" },
  { id: "e2", title: "Resume Workshop w/ Capital One", type: "Workshop", date: "2026-09-17", time: "5:30 PM", location: "SEIR Auditorium" },
  { id: "e3", title: "JPMorgan Chase Office Tour", type: "Company Visit", date: "2026-10-02", time: "10:00 AM", location: "Dallas, TX" },
  { id: "e4", title: "Mock Technical Interviews", type: "Career Prep", date: "2026-10-15", time: "6:00 PM", location: "ERB 125" },
  { id: "e5", title: "Stacked Up Summit Recap Night", type: "Social", date: "2026-10-28", time: "7:00 PM", location: "Central Library" },
];

export const NAV_PAGES = [
  { href: "/about", label: "About" },
  { href: "/#events", label: "Events" },
  { href: "/portal", label: "Portal" },
  { href: "/sponsors", label: "Sponsors" },
];

export const PARTNERS = ["Google", "Microsoft", "JPMorgan Chase & Co.", "Bloomberg", "Adobe", "Capital One", "Samsung", "Fidelity"];

export const IMAGE_SLOTS = [
  { id: "chapterHero", label: "Hero — chapter members on campus", src: "/images/chapter-campus.png" },
  { id: "codeathonCharlotte", label: "Codeathon — Charlotte", src: "/images/codeathon-charlotte.png", tag: "Competition", title: "Codeathon in Charlotte", blurb: "Our competitive team representing the chapter in Charlotte." },
  { id: "breakThroughTech", label: "GBM — Break Through Tech", src: "/images/break-through-tech.png", tag: "Chapter Workshop", title: "Break Through Tech", blurb: "A GBM workshop on the Sprinternship program." },
  { id: "verizonWorkshop", label: "Verizon — corporate workshop", src: "/images/verizon-workshop.png", tag: "Corporate Workshop", title: "Verizon", blurb: "Chapter members together at our Verizon workshop." },
  { id: "southwestWorkshop", label: "Southwest Airlines — corporate workshop", src: "/images/southwest-workshop.png", tag: "Corporate Workshop", title: "Southwest Airlines", blurb: "A corporate workshop exploring early-career technology opportunities." },
];

export const FLYER_SLOTS = [
  { id: "flyer1", label: "Flyer — AT&T Tech Development Program", title: "AT&T Technology Development Program", blurb: "AT&T Recruiter + Advanced Analytics Leader" },
  { id: "flyer2", label: "Flyer — JPMorgan Chase Teaser", title: "Something's Coming", blurb: "JPMorgan Chase · Engineers behind the bank." },
  { id: "flyer3", label: "Flyer — JPMorgan Chase Technology Panel", title: "JPMorgan Chase Technology Panel", blurb: "Real conversations. Real impact." },
  { id: "flyer4", label: "Flyer — Intern Panel w/ NSBE", title: "Intern Panel", blurb: "The students behind the internships." },
];

export const EBOARD = [
  { name: "Manuel Arellano", role: "External VP", photo: "/images/officer-11.png" },
  { name: "Noe Chairez", role: "Internal VP", photo: "/images/officer-07.png" },
  { name: "Diana Rios", role: "Co-President" },
  { name: "Farrukh Hayat", role: "Co-Vice President" },
  { name: "Karla Reyes", role: "Treasurer" },
];

export const OFFICERS = [
  { name: "Genesis Tapia", role: "Women of ColorStack Director", photo: "/images/officer-09.png" },
  { name: "Jocelyn Vazquez", role: "Socials & Graphics Director" },
  { name: "Mofoluwatele Olagbami", role: "Recruitment Director" },
  { name: "Alexander Escobar", role: "Corporate Outreach Director", photo: "/images/officer-10.png" },
];

export const SPONSORED_EVENTS = [
  { title: "Lead a workshop", blurb: "Propose a practical session on your team’s tools, technical interview preparation, or the skills students use on the job." },
  { title: "Share a career perspective", blurb: "Bring engineers and recruiters into a conversation about career paths, day-to-day work, and entering the industry." },
  { title: "Support chapter programming", blurb: "Discuss support for student events, learning resources, or conference participation with our corporate outreach team." },
];

export const PARTNER_WORKSHOPS = [
  { company: "JPMorgan Chase", title: "Day in the Life of a JPMorgan Software Engineer", date: "March 2025", blurb: "An insider's look at life as a JPMorgan software engineer: alumni panelists shared daily workflows and development methodologies, while recruiters outlined internship application best practices and interview tips." },
  { company: "Fidelity", title: "Internship Insights Session", date: "November 2024", blurb: "A Fidelity recruiter walked us through the company's culture, explained their summer internship pipeline, and shared resume- and interview-tips, finishing with an open Q&A." },
];

export const SPONSOR_BENEFITS = [
  "Host engaging workshops and connect with talented students.",
  "Sponsor events that showcase your brand and values.",
  "Access exclusive networking opportunities with our community.",
  "Support diversity and inclusion in tech through meaningful partnerships.",
];

export const TRACKS = [
  { num: "01", title: "Corporate Outreach", lead: "Alexander Escobar", blurb: "Sponsorships, industry relationships, and partner-led events." },
  { num: "02", title: "Recruitment", lead: "Mofoluwatele Olagbami", blurb: "Growing the chapter and building our campus pipeline." },
  { num: "03", title: "Women of ColorStack", lead: "Genesis Tapia", blurb: "A dedicated space and programming for women in the chapter." },
  { num: "04", title: "Socials & Graphics", lead: "Jocelyn Vazquez", blurb: "Brand, design, and the events that keep us connected." },
];

export const MAX_IMAGE_BYTES = 1.4 * 1024 * 1024;

export function officerPhotoId(name) {
  return `officer-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;
}
export const OFFICER_PHOTO_SLOTS = [...EBOARD, ...OFFICERS].map(({ name, role, photo }) => ({
  id: officerPhotoId(name), label: `${name} — ${role}`, src: photo,
}));
