import { notFound } from "next/navigation";
import AboutFrame from "@/components/AboutFrame";
import Leadership from "@/components/Leadership";
import { SEMESTERS, getSemester, sortOfficers, aboutMetadata } from "@/lib/about";
import "../../about.css";
export const dynamicParams = false;
export function generateStaticParams() { return SEMESTERS.map(({slug}) => ({semester:slug})); }
export async function generateMetadata({params}) {
  const record = getSemester((await params).semester);
  return record ? aboutMetadata(`${record.semester} Archive | ColorStack UTA`, record.summary || `The ColorStack UTA chapter record for ${record.semester}.`, `/about/archive/${record.slug}`) : {};
}
export default async function SemesterPage({params}) {
  const record = getSemester((await params).semester);
  if (!record) notFound();
  return <AboutFrame current="/about/archive"><article className="cs-shell cs-section semester-record">
    <a className="cs-text-link" href="/about/archive">← All semesters</a>
    <header className="semester-heading"><p className="cs-eyebrow">THE CHAPTER RECORD</p><h1 className="cs-display">{record.semester}</h1></header>
    {record.cover && <figure className="semester-cover"><img src={record.cover.src} alt={record.cover.alt}/>{record.cover.caption && <figcaption className="about-caption">{record.cover.caption}</figcaption>}</figure>}
    {record.summary && <p className="about-body semester-summary">{record.summary}</p>}
    {!!record.highlights?.length && <section className="semester-section"><h2>Semester highlights</h2><ul className="semester-highlights">{record.highlights.map(item=><li key={item}>{item}</li>)}</ul></section>}
    {!!record.leadership?.length && <section className="semester-section"><h2>Semester leadership</h2><Leadership people={sortOfficers(record.leadership)} historical/></section>}
    {!!record.gallery?.length && <section className="semester-section"><h2>From the semester</h2><div className="semester-gallery">{record.gallery.map(photo=><figure key={photo.src} className={photo.featured ? "semester-photo-featured" : undefined}><img src={photo.src} alt={photo.alt} loading="lazy"/>{photo.caption && <figcaption className="about-caption">{photo.caption}</figcaption>}</figure>)}</div></section>}
    {!!record.milestones?.length && <section className="semester-section"><h2>Milestones &amp; events</h2>{record.milestones.map(item=><div className="semester-milestone" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}</section>}
    {!!record.sources?.length && <section className="semester-section"><h2>From the archive</h2><ul className="semester-sources">{record.sources.map(source=><li key={source.href}><a className="cs-text-link" href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></section>}
    <div className="semester-memory"><a className="cs-text-link" href={`mailto:colorstackuta@gmail.com?subject=${encodeURIComponent("Chapter archive: " + record.semester)}`}>Share a memory from this semester ↗</a></div>
  </article></AboutFrame>;
}
