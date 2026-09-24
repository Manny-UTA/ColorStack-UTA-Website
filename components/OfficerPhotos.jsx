"use client";

import { useState, useEffect, useRef } from "react";
import { Lock, Unlock, Upload, Trash2, ShieldCheck, Loader2 } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PhotoBlock from "@/components/PhotoBlock";
import { storage } from "@/lib/storage";
import { IMAGE_SLOTS, FLYER_SLOTS, OFFICER_PHOTO_SLOTS, MAX_IMAGE_BYTES } from "@/lib/content";

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
  const [uploadingSlot, setUploadingSlot] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const fileInputRefs = useRef({});

  useEffect(() => {
    (async () => {
      try {
        const img = await storage.get("siteImages");
        setSiteImages(typeof img.value === "string" ? JSON.parse(img.value) : img.value);
      } catch {
        setSiteImages({});
      }
    })();
  }, []);

  async function handleImageUpload(slotId, fileList) {
    const file = fileList?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setUploadError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
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
    <div className="min-h-screen font-sans">
      <Nav />
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="text-brass" size={16} />
          <p className="text-brass text-[11px] font-bold tracking-[0.24em] uppercase">Officer Admin</p>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl mb-8 text-navy">Photos, flyers, and leadership.</h1>

          <div>
            <div className="flex items-center gap-2 text-green-800 text-sm font-semibold mb-6">
              <Unlock size={15} /> Officer access verified.
            </div>
            {uploadError && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm p-3 max-w-lg">{uploadError}</div>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...IMAGE_SLOTS, ...FLYER_SLOTS, ...OFFICER_PHOTO_SLOTS].map((slot) => (
                <div key={slot.id} className="bg-white border border-navy/10 rounded-sm p-4" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); handleImageUpload(slot.id, e.dataTransfer.files); }}>
                  <div className={`relative rounded-sm overflow-hidden mb-3 border border-navy/10 ${slot.id.startsWith("flyer") ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                    <PhotoBlock src={siteImages[slot.id] || slot.src} alt={slot.label} className="absolute inset-0 w-full h-full" />
                    {uploadingSlot === slot.id && (
                      <div className="absolute inset-0 bg-navy/60 flex items-center justify-center">
                        <Loader2 className="animate-spin text-cream" size={22} />
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-semibold mb-3 leading-snug text-navy">{slot.label}</p>
                  <input ref={(el) => (fileInputRefs.current[slot.id] = el)} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => handleImageUpload(slot.id, e.target.files)} />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => fileInputRefs.current[slot.id]?.click()} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-navy text-cream font-bold text-xs px-3 py-2 rounded-sm whitespace-nowrap">
                      <Upload size={13} /> {siteImages[slot.id] ? "Replace" : "Upload"}
                    </button>
                    {siteImages[slot.id] && (
                      <button type="button" aria-label={`Remove ${slot.label}`} onClick={() => handleImageRemove(slot.id)} className="inline-flex items-center justify-center gap-1 border border-navy/20 hover:border-red-400 hover:text-red-700 text-xs px-3 py-2 rounded-sm whitespace-nowrap">
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>
      <Footer />
    </div>
  );
}
