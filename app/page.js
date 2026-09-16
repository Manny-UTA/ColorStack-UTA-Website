"use client";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Calendar, MapPin } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SponsorBanner from "@/components/SponsorBanner";
import { storage } from "@/lib/storage";
import { SEED_EVENTS, FLYER_SLOTS, TRACKS } from "@/lib/content";
import { upcomingEvents } from "@/lib/events.mjs";

export default function Home() {
  const [events, setEvents] = useState(SEED_EVENTS);
  const [images, setImages] = useState({});
  useEffect(() => {
    let active = true;
    Promise.allSettled([storage.get("events"), storage.get("siteImages")]).then(results => {
      if (!active) return;
      results.forEach((result, index) => {
        if (result.status !== "fulfilled") return;
        try {
          const value = typeof result.value.value === "string" ? JSON.parse(result.value.value) : result.value.value;
          if (index === 0 && Array.isArray(value)) setEvents(value);
          if (index === 1 && value && typeof value === "object") setImages(value);
        } catch {}
      });
    });
    return () => { active = false; };
  }, []);
  const nextEvents = upcomingEvents(events).slice(0, 3);
  const flyers = FLYER_SLOTS.filter(f => images[f.id]);
  return <>
    <Nav />
    <main>
      <section className="cs-hero cs-shell">
        <div className="cs-hero-copy cs-enter">
          <p className="cs-eyebrow"><span className="cs-status" /> COLORSTACK / UT ARLINGTON</p>
          <h1 className="cs-display">Your people.<br />Your next<br /><em>possibility.</em></h1>
          <p className="cs-intro">A community for Black and Latinx students building their future in tech. Find your people. Develop your craft. Take the next step together.</p>
          <div className="cs-actions"><a className="cs-button" href="https://linktr.ee/colorstack_uta">Join the chapter <ArrowUpRight size={16} /></a><a className="cs-text-link" href="/sponsors">Partner with us <ArrowRight size={16} /></a></div>
          <div className="cs-hero-foot"><span>STUDENT LED. FUTURE FOCUSED.</span><span>ARLINGTON, TX · SINCE 2023</span></div>
        </div>
        <div className="cs-hero-visual cs-enter">
          <div className="cs-image-label"><span>01 / THE PEOPLE BEHIND IT</span><span>UTA ↗</span></div>
          <img src={images.chapterHero || "/images/chapter-campus.png"} alt="ColorStack UTA members gathered by the campus A landmark" className="cs-hero-photo" />
          <div className="cs-photo-caption"><span>We build. We connect.<br /><strong>We ColorStack.</strong></span><a href="/about" aria-label="Meet the ColorStack UTA team"><ArrowUpRight size={25} /></a></div>
        </div>
      </section>

      <section className="cs-outcomes" aria-labelledby="outcomes-title">
        <div className="cs-shell cs-outcomes-grid">
          <div><p className="cs-eyebrow">THE WORK LEADS SOMEWHERE</p><h2 id="outcomes-title">Ambition, with<br /><em>something to show.</em></h2><p>Real opportunities earned by members of our community.</p></div>
          <div className="cs-main-stat"><span>72</span><h3>Internship or FT Offers</h3><p>Across our chapter community</p></div>
          <div className="cs-secondary-stats"><div><strong>400+</strong><span>Members</span></div><div><strong>2023</strong><span>Our chapter began</span></div></div>
        </div>
      </section>

      <SponsorBanner />

      <section className="cs-shell cs-section" id="chapter-life">
        <div className="cs-section-heading"><div><p className="cs-eyebrow">MORE THAN A MEETING</p><h2>A community<br /><em>in motion.</em></h2></div><p>On campus. In competition. In conversation with the people working in tech.</p></div>
        <div className="cs-stories">
          <article className="cs-story cs-story-feature"><div className="cs-story-image"><img src={images.verizonWorkshop || "/images/verizon-workshop.png"} alt="ColorStack UTA members at the Verizon corporate workshop" /><span className="cs-tag">Industry / Verizon</span></div><div className="cs-story-copy"><span className="cs-index">01</span><div><h3>Bring industry into the room.</h3><p>Our Verizon corporate workshop brought the chapter together around careers in tech.</p></div></div></article>
          <article className="cs-story"><div className="cs-story-image"><img src={images.codeathonCharlotte || "/images/codeathon-charlotte.png"} alt="The competitive Codeathon team in Charlotte" /><span className="cs-tag">Competition / Charlotte</span></div><div className="cs-story-copy"><span className="cs-index">02</span><div><h3>Take the team further.</h3><p>Representing ColorStack UTA at Codeathon in Charlotte.</p></div></div></article>
          <article className="cs-story"><div className="cs-story-image"><img src={images.breakThroughTech || "/images/break-through-tech.png"} alt="Students attending the Break Through Tech Sprinternship workshop" /><span className="cs-tag">GBM / Break Through Tech</span></div><div className="cs-story-copy"><span className="cs-index">03</span><div><h3>Find your next opening.</h3><p>A chapter workshop exploring the Sprinternship program.</p></div></div></article>
        </div>
      </section>

      <section className="cs-workshop-band"><div className="cs-shell cs-workshop-grid"><div><p className="cs-eyebrow">IN THE ROOM / SOUTHWEST AIRLINES</p><h2>Good questions.<br /><em>New perspectives.</em></h2><p>A corporate workshop on early-career technology opportunities—and a community to share it with.</p><a className="cs-text-link" href="/sponsors">Bring your team to campus <ArrowUpRight size={16} /></a></div><figure><img src="/images/southwest-group.png" alt="ColorStack UTA members together at the Southwest Airlines workshop" /><figcaption>Southwest Airlines × ColorStack UTA</figcaption></figure></div></section>

      <section id="events" className="cs-shell cs-section">
        <div className="cs-section-heading"><div><p className="cs-eyebrow">MAKE ROOM ON YOUR CALENDAR</p><h2>See you <em>there.</em></h2></div><a className="cs-text-link" href="/portal#events">All chapter events <ArrowUpRight size={16} /></a></div>
        <div className="cs-event-list">{nextEvents.length ? nextEvents.map(event => <article className="cs-event" key={event.id}><time dateTime={event.date}><strong>{event.date.slice(8)}</strong><span>{new Date(event.date + "T12:00:00").toLocaleDateString("en-US", {month:"short"})}</span></time><div><span className="cs-eyebrow">{event.type}</span><h3>{event.title}</h3><p><Calendar size={13} />{event.time}<span aria-hidden="true">·</span><MapPin size={13} />{event.location}</p></div><a href="/portal#events" className="cs-event-arrow" aria-label={`View chapter event list for ${event.title}`}><ArrowUpRight size={22} /></a></article>) : <p className="cs-empty">More chapter events are on the way. <a href="https://linktr.ee/colorstack_uta">Follow our chapter announcements ↗</a></p>}</div>
      </section>

      {flyers.length > 0 && <section className="cs-shell cs-section"><div className="cs-section-heading"><div><p className="cs-eyebrow">FROM THE CHAPTER</p><h2>The <em>noticeboard.</em></h2></div></div><div className="cs-flyers">{flyers.map(f => <figure key={f.id}><a href={images[f.id]} target="_blank" rel="noreferrer"><img src={images[f.id]} alt={f.title} /></a><figcaption>{f.title}</figcaption></figure>)}</div></section>}

      <section className="cs-pathways"><div className="cs-shell cs-section"><div className="cs-section-heading"><div><p className="cs-eyebrow">A PLACE TO CONTRIBUTE</p><h2>Find your <em>people.</em></h2></div><p>Make connections. Bring your ideas. Help shape what the chapter does next.</p></div><div className="cs-path-grid">{TRACKS.map(track => <a href="/about#officers" className="cs-path" key={track.num}><span className="cs-index">{track.num} /</span><ArrowUpRight className="cs-path-arrow" size={22} /><h3>{track.title}</h3><p>{track.blurb}</p><span className="cs-path-lead">{track.lead}</span></a>)}</div></div></section>

      <section className="cs-shell cs-section cs-final-cta"><p className="cs-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Build a future.<br /><em>Bring your people.</em></h2><div className="cs-actions"><a href="https://linktr.ee/colorstack_uta" className="cs-button">Join ColorStack UTA <ArrowUpRight size={17} /></a><a href="/sponsors#sponsor-form" className="cs-text-link">Let’s work together <ArrowRight size={16} /></a></div></section>
    </main>
    <Footer />
  </>;
}
