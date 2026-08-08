"use client";

import { useState, useEffect, useRef } from "react";
import { Lock, Unlock, Upload, Trash2, ShieldCheck, Loader2 } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PhotoBlock from "@/components/PhotoBlock";
import { storage } from "@/lib/storage";
import { IMAGE_SLOTS, OFFICER_PASSCODE, MAX_IMAGE_BYTES } from "@/lib/content";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [siteImages, setSiteImages] = useState({});
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const fileInputRefs = useRef({});

  useEffect(() => {
    (async () => {
      try {
        const img = await storage.get("siteImages");
        setSiteImages(JSON.parse(img.value));
      } catch {
        setSiteImages({});
      }
    })();
  }, []);

  function handleAdminLogin(e) {
    e.preventDefault();
    if (passcodeInput.trim() === OFFICER_PASSCODE) {
      setAdminUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  }

  async function handleImageUpload(slotId, fileList) {
    const file = fileList?.[0];
    if (!file) return;
    setUploadError("");
    if (file.size > MAX_IMAGE_BYTES) {
      setUploadError(`That image is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Please use one under ~1.4MB.`);
      return;
    }
    setUploadingSlot(slotId);
    try {
      const dataUrl = await fileToDataUrl(file);
      const updated = { ...siteImages, [slotId]: dataUrl };
      const result = await storage.set("siteImages", JSON.stringify(updated));
      if (!result) throw new Error("Storage write failed");
      setSiteImages(updated);
    } catch {
      setUploadError("Upload failed — please try again with a smaller image.");
    } finally {
      setUploadingSlot(null);
    }
  }

  async function handleImageRemove(slotId) {
    setUploadingSlot(slotId);
    try {
      const updated = { ...siteImages };
      delete updated[slotId];
      await storage.set("siteImages", JSON.stringify(updated));
      setSiteImages(updated);
    } catch {
      setUploadError("Couldn't remove that image — please try again.");
    } finally {
      setUploadingSlot(null);
    }
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="text-orange-400" size={16} />
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase">Officer Admin</p>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase mb-8">Manage site photos.</h1>

        {!adminUnlocked ? (
          <form onSubmit={handleAdminLogin} className="max-w-sm">
            <p className="text-slate-400 text-sm mb-4">Officers can enter the admin passcode to upload or replace photos used across the site.</p>
            <div className="flex gap-3">
              <input
                type="password"
                value={passcodeInput}
                onChange={(e) => { setPasscodeInput(e.target.value); setPasscodeError(false); }}
                placeholder="Officer passcode"
                className={`flex-1 bg-[#111C4E] border rounded-full px-4 py-3 text-sm outline-none transition-colors ${passcodeError ? "border-red-500/60" : "border-white/15 focus:border-orange-500"}`}
              />
              <button type="submit" className="bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold px-5 py-3 rounded-full text-sm shrink-0">
                Unlock
              </button>
            </div>
            {passcodeError && <p className="text-red-400 text-xs mt-2">That passcode isn&apos;t right — check with your board for the current one.</p>}
            <p className="text-slate-600 text-[11px] mt-4">
              Demo note: this is a shared passcode for prototyping only, and photos only save to this browser until this is wired to a real database. Swap this for real per-officer accounts (e.g. Clerk auth) before handling real member data.
            </p>
          </form>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-6">
              <Unlock size={15} /> Admin unlocked.
            </div>
            {uploadError && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg p-3 max-w-lg">{uploadError}</div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {IMAGE_SLOTS.map((slot) => (
                <div key={slot.id} className="bg-[#111C4E] border border-white/10 rounded-xl p-4">
                  <div className="relative rounded-lg overflow-hidden aspect-[4/3] mb-3 border border-white/10">
                    <PhotoBlock src={siteImages[slot.id]} alt={slot.label} className="absolute inset-0 w-full h-full" />
                    {uploadingSlot === slot.id && (
                      <div className="absolute inset-0 bg-[#0A1240]/70 flex items-center justify-center">
                        <Loader2 className="animate-spin text-orange-400" size={22} />
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-semibold mb-3 leading-snug">{slot.label}</p>
                  <input
                    ref={(el) => (fileInputRefs.current[slot.id] = el)}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(slot.id, e.target.files)}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[slot.id]?.click()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-400 transition-colors text-[#0A1240] font-bold text-xs px-3 py-2 rounded-full"
                    >
                      <Upload size={13} /> {siteImages[slot.id] ? "Replace" : "Upload"}
                    </button>
                    {siteImages[slot.id] && (
                      <button
                        type="button"
                        onClick={() => handleImageRemove(slot.id)}
                        className="inline-flex items-center justify-center gap-1 border border-white/15 hover:border-red-500/50 hover:text-red-400 transition-colors text-xs px-3 py-2 rounded-full"
                        aria-label={`Remove photo for ${slot.label}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-[11px] mt-6 max-w-lg">
              Keep photos under ~1.4MB each (compress at squoosh.app if needed).
            </p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
