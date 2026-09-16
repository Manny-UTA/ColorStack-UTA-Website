"use client";

import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { officerPhotoId } from "@/lib/content";

export default function Leadership({ people }) {
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
    {people.map(({ name, role, photo, career }) => <article key={name} className="cs-person">
      {(images[officerPhotoId(name)] || photo) ? <img src={images[officerPhotoId(name)] || photo} alt={name} className="cs-person-photo" /> : <div aria-hidden="true" className="cs-person-photo cs-person-initials">{name.split(" ").map(part => part[0]).slice(0,2).join("")}</div>}
      <h3>{name}</h3><p className="cs-person-role">{role}</p>{career && <p className="cs-person-career">{career}</p>}
    </article>)}
  </div>;
}
