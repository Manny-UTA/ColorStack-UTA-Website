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
  { href: "/#portal", label: "Portal" },
  { href: "/sponsors", label: "Sponsors" },
];

export const PARTNERS = ["Google", "Microsoft", "JPMorgan Chase & Co.", "Bloomberg", "Adobe", "Capital One", "Samsung", "Fidelity"];

export const IMAGE_SLOTS = [
  { id: "hero", label: "Hero photo (homepage top)" },
  { id: "highlight1", label: "Highlight — JPMorgan Day in the Life", tag: "Company Visit", title: "JPMorgan Day in the Life", blurb: "Members got an inside look at JPMorgan's Dallas office." },
  { id: "highlight2", label: "Highlight — Bloomberg x ColorStack", tag: "Workshop", title: "Bloomberg x ColorStack", blurb: "Technical skills, real-world insights, real impact." },
  { id: "highlight3", label: "Highlight — Spring GBM", tag: "Chapter Event", title: "Spring GBM", blurb: "Great conversations, new faces, stronger community." },
  { id: "highlight4", label: "Highlight — Stacked Up Summit '26", tag: "Conference", title: "Stacked Up Summit '26", blurb: "Six members. One chapter. San Francisco." },
];

export const EBOARD = [
  { name: "Manuel Arellano Jr.", role: "Co-President" },
  { name: "Diana Rios", role: "Co-President" },
  { name: "Farrukh Hayat", role: "Co-Vice President" },
  { name: "Karla Reyes", role: "Treasurer" },
];

export const OFFICERS = [
  { name: "Genesis Tapia", role: "Women of ColorStack Director" },
  { name: "Jocelyn Vazquez", role: "Socials & Graphics Director" },
  { name: "Mofoluwatele Olagbami", role: "Recruitment Director" },
  { name: "Aleida Ramirez", role: "Corporate Outreach Director" },
];

export const SPONSORED_EVENTS = [
  { title: "ColorStack UTA Hackathon", blurb: "A 24-hour coding marathon where student teams build projects from scratch — complete with industry-sponsored challenges, mentorship, and cash prizes." },
  { title: "ColorStack UTA Summit", blurb: "Our annual flagship conference featuring keynote talks, breakout workshops, and networking sessions with top tech companies like Duolingo and Google." },
  { title: "Diversity in Tech Panel", blurb: "A special session at SHPE / AfroTech conventions spotlighting Black and Latinx engineers, with Q&A and recruiting tips from our corporate partners." },
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

export const STRIPE_BG = {
  backgroundImage: "repeating-linear-gradient(135deg, #F97316 0px, #F97316 6px, #FB923C 6px, #FB923C 12px)",
};

export const OFFICER_PASSCODE = "COLORSTACK2026";
export const MAX_IMAGE_BYTES = 1.4 * 1024 * 1024;
