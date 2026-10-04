import { EBOARD, OFFICERS } from "./content";
export const ABOUT_LINKS = [["/about", "Our story"], ["/about/leadership", "Leadership"], ["/about/archive", "Archive"], ["/about/traditions", "Traditions"], ["/about/national", "National"]];
// Each record snapshots a role for one semester. Shared photo paths avoid duplicate assets.
const hierarchy = role => /president/i.test(role) && !/vice|vp/i.test(role) ? 0 : /vice|vp/i.test(role) ? 1 : /treasurer/i.test(role) ? 2 : /secretary/i.test(role) ? 3 : 4;
export const LEADERSHIP_RECORDS = [...EBOARD.map(person => ({ ...person, classification: "executive" })), ...OFFICERS.map(person => ({ ...person, classification: "director" }))].map((person, index) => ({
  ...person, id: `fall-2026-${index}`, semester: "Fall 2026", photoAlt: `Portrait of ${person.name}`, major: null, graduationYear: null, bio: null, linkedin: null, experience: null, companyLogo: null, displayOrder: hierarchy(person.role) * 100 + index,
}));
export const CURRENT_BOARD = { semester: "Fall 2026", executive: LEADERSHIP_RECORDS.filter(p => p.classification === "executive").sort((a,b) => a.displayOrder-b.displayOrder), directors: LEADERSHIP_RECORDS.filter(p => p.classification === "director").sort((a,b) => a.displayOrder-b.displayOrder) };
export const MILESTONES = [
  { year: "2023", semester: null, photo: null, photoCaption: null, photoAlt: null, title: "Chapter founded", body: "ColorStack UTA begins at The University of Texas at Arlington." },
  // TODO: Add confirmed 2024 and 2025 milestones with chapter records.
  { year: "2026", semester: null, photo: null, photoCaption: null, photoAlt: null, title: "400+ community", body: "72+ reported internship & full-time offers. A growing community, opening doors together." },
];
export const PILLARS = [
  { name: "Community", title: "Find your people.", body: "Build relationships with students navigating the same classrooms, interviews, opportunities, and questions." },
  { name: "Development", title: "Build your craft.", body: "Technical workshops, career preparation, mentorship, and experiences designed to help students keep getting better." },
  { name: "Opportunity", title: "Take the next step.", body: "Industry connections, internships, conferences, programs, and opportunities that can change what’s possible." },
];
// Historical semesters are intentional archival shells; add only verified records and dated assets.
export const SEMESTERS = ["Spring 2026", "Fall 2025"].map(semester => ({ semester, slug: semester.toLowerCase().replace(" ", "-"), groupPhoto: null, officers: [], accomplishments: [], metrics: [], eventPhotos: [], milestones: [], traditions: [], reflection: null }));
export const FOUNDING_CLASS = { year: 2023, officers: [], photos: [], story: null };
export const TRADITIONS = [{ number: "01", name: "Secured the Bag", tagline: "You got the offer. Now secure the bag.", nationalOrigin: "Spring 2022", origin: "Spring 2025", story: "Secured the Bag began as a ColorStack tradition celebrating members as they landed internships and full-time opportunities. ColorStack UTA brought the tradition to Arlington in Spring 2025, recognizing the work behind every offer and showing the next student what’s possible.", howItWorks: null,
  // Slides: { src, alt, memberName, company, role, semester, caption }. Preserve originals.
  photos: [] }];
export function aboutMetadata(title, description, path) { return { title, description, alternates: { canonical: `https://colorstackuta.org${path}` } }; }
