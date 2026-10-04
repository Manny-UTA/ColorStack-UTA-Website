"use client";

import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { officerPhotoId } from "@/lib/content";

export default function Leadership({ people, historical = false }) {
  const [images, setImages] = useState({});
  useEffect(() => {
    let active = true;
    storage.get("siteImages").then(({ value }) => {
      const parsed = typeof value === "string" ? JSON.parse(value) : value;
      if (active) setImages(parsed || {});
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  return <div className="cs-leadership">
    {people.map(({ name, role, photo, photoAlt, career, major, graduationYear, bio, linkedin, experience }) => <article key={name} className="cs-person">
      {((!historical && images[officerPhotoId(name)]) || photo) ? <img src={(!historical && images[officerPhotoId(name)]) || photo} alt={photoAlt || `Portrait of ${name}`} loading="lazy" className="cs-person-photo" /> : <div aria-hidden="true" className="cs-person-photo cs-person-initials">{name.split(" ").map(part => part[0]).slice(0,2).join("")}</div>}
      <h3>{name}</h3><p className="cs-person-role">{role}</p>{(career || major || graduationYear || experience) && <p className="cs-person-career">{[career, major, graduationYear, experience].filter(Boolean).join(" · ")}</p>}{bio && <details className="about-bio"><summary>View bio</summary><p>{bio}</p></details>}{linkedin && <a className="cs-text-link about-profile-link" href={linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
    </article>)}
  </div>;
}
