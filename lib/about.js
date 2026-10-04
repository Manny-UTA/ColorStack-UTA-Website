import { EBOARD, OFFICERS } from "./content";
export const ABOUT_LINKS = [["/about", "Our story"], ["/about/leadership", "Leadership"], ["/about/archive", "Archive"], ["/about/traditions", "Traditions"], ["/about/national", "National"]];
const unique = people => [...new Map(people.map(person => [person.name, person])).values()];
export const CURRENT_BOARD = { semester: "Fall 2026", executive: unique(EBOARD), directors: unique(OFFICERS).filter(person => !EBOARD.some(board => board.name === person.name)) };
export const MILESTONES = [
  { year: "2023", title: "Chapter founded", body: "ColorStack UTA begins at The University of Texas at Arlington." },
  // TODO: Add confirmed 2024 and 2025 milestones with chapter records.
  { year: "2026", title: "400+ community", body: "72+ reported internship & full-time offers. A growing community, opening doors together." },
];
export const PILLARS = [
  { name: "Community", title: "Find your people.", body: "Build relationships with students navigating the same classrooms, interviews, opportunities, and questions." },
  { name: "Development", title: "Build your craft.", body: "Technical workshops, career preparation, mentorship, and experiences designed to help students keep getting better." },
  { name: "Opportunity", title: "Take the next step.", body: "Industry connections, internships, conferences, programs, and opportunities that can change what’s possible." },
];
// Populate from verified chapter records; never reuse current portraits as historical rosters.
export const SEMESTERS = ["Spring 2026", "Fall 2025"].map(semester => ({ semester, groupPhoto: null, officers: [], accomplishments: [], metrics: [], eventPhotos: [], reflection: null, status: "Archive in progress" }));
export const TRADITIONS = [{ number: "01", name: "Secured the Bag", tagline: "You got the offer. Now secure the bag.", origin: "2026", story: null, howItWorks: null, photos: [], photoPlaceholder: "secured-the-bag" }];
export function aboutMetadata(title, description, path) { return { title, description, alternates: { canonical: `https://colorstackuta.org${path}` } }; }
