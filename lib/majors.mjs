// https://catalog.uta.edu/liberalarts/communication/undergraduate/comm-tech-ba/
// UTA official program listings, verified 2026-09-26. Curated, not enrollment-ranked.
// https://www.uta.edu/academics/schools-colleges/engineering/academics/undergraduate
// https://www.uta.edu/academics/programs/data-science-bs
// https://www.uta.edu/academics/programs/information-systems-bba-bs
// https://www.uta.edu/academics/programs/business-analytics-bs
export const MAJORS = ['Computer Science','Software Engineering','Computer Engineering','Data Science','Information Systems','Communication Technology','Business Analytics','Electrical Engineering','Mechanical Engineering','Industrial Engineering','Biomedical Engineering','Aerospace Engineering','Civil Engineering'];
export function canonicalMajor(value) {
 const clean=value.trim().replace(/\s+/g,' ');
 const aliases={cs:'Computer Science',cse:'Computer Science',swe:'Software Engineering',insy:'Information Systems'};
 return MAJORS.find(m=>m.toLowerCase()===clean.toLowerCase()) || aliases[clean.toLowerCase()] || null;
}