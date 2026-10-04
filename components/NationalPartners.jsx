"use client";
import { useState } from "react";
export default function NationalPartners({ partners }) {
  const [paused, setPaused] = useState(false);
  const middle = Math.ceil(partners.length / 2);
  return <div className={`national-marquees${paused ? " is-paused" : ""}`}>
    <button type="button" className="national-motion-control" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused ? "Resume logo motion" : "Pause logo motion"}</button>
    {[partners.slice(0,middle), partners.slice(middle)].map((band,index)=><div className="national-marquee" key={index} tabIndex={0} role="group" aria-label={`National partners, row ${index+1}. Focus to pause motion.`}>
      <div className={`national-track${index ? " national-track-reverse" : ""}`}>
        {[0,1].map(copy=><ul className="national-logo-group" key={copy} aria-hidden={copy ? true : undefined}>{band.map(partner=><li className="national-logo" key={partner.name}><svg viewBox={partner.viewBox} role="img" aria-label={partner.name} style={{width:`${partner.opticalWidth}%`}}><image href={partner.logo} width={partner.imageWidth} height={partner.imageHeight}/></svg></li>)}</ul>)}
      </div>
    </div>)}
  </div>;
}
