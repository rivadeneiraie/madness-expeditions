"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { type Trip } from "@/lib/trips/types";
import GalleryModal from "@/components/gallery/GalleryModal";
import { tripImagesToGallery } from "@/components/gallery/utils";

const LEVEL_BADGE: Record<string, string> = {
    Principiante: "bg-green-500 text-white",
    Intermedio: "bg-yellow-500 text-black",
    Avanzado: "bg-mx-red text-white",
};

function DifficultyDots({ filled }: { filled: number }) {
    return (
        <span className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <span
                    key={i}
                    className={`inline-block w-2 h-2 rounded-full ${
                        i < filled ? "bg-white" : "bg-white/20"
                    }`}
                />
            ))}
        </span>
    );
}

function AccordionDay({ day }: { day: Trip["itinerary"][number] }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="mb-3 rounded-xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)" }}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-4 text-left cursor-pointer touch-manipulation"
                aria-expanded={open}
            >
                <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-mx-red flex items-center justify-center text-xs font-black shrink-0">
                        {day.day}
                    </span>
                    <div>
                        <div className="text-sm font-bold">{day.title}</div>
                        <div
                            className="text-xs mt-0.5"
                            style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                            {day.summary}
                        </div>
                    </div>
                </div>
                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>
            {open && (
                <div
                    className="px-4 pb-4 text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                >
                    {day.detail}
                </div>
            )}
        </div>
    );
}

/* ── Desktop sidebar card ── */
function SidebarCard({ trip, waUrl }: { trip: Trip; waUrl: string }) {
    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(255,255,255,0.03)",
            }}
        >
            {/* Trip name + level */}
            <div
                className="px-6 pt-6 pb-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
                <div className="flex items-center gap-2 mb-3">
                    <span
                        className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide ${LEVEL_BADGE[trip.level] ?? "bg-mx-blue text-white"}`}
                    >
                        ✓ {trip.level}
                    </span>
                    <DifficultyDots filled={trip.difficulty} />
                </div>
                <h2 className="text-xl font-black leading-tight mb-1">{trip.name}</h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {trip.location} · {trip.region}
                </p>
            </div>

            {/* Stats */}
            <div
                className="grid grid-cols-3 gap-2 px-6 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
                <div className="bg-mx-gray rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-mx-red">{trip.altitudeValue}</div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                        msnm
                    </div>
                </div>
                <div className="bg-mx-gray rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-white">{trip.days}</div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                        días
                    </div>
                </div>
                <div className="bg-mx-gray rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-white">{trip.maxPersons}</div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                        máx. pers.
                    </div>
                </div>
            </div>

            {/* Upcoming dates */}
            <div
                className="px-6 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
                <p
                    className="text-xs font-black uppercase tracking-widest mb-3"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                >
                    Próximas salidas
                </p>
                <div className="flex flex-col gap-2">
                    {trip.dates.map((d, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-2.5 px-3 rounded-xl"
                            style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                            <div>
                                <div className="text-sm font-semibold">{d.date}</div>
                                <div
                                    className="text-xs mt-0.5"
                                    style={{ color: "rgba(255,255,255,0.45)" }}
                                >
                                    {d.spots === "completo"
                                        ? "Completo"
                                        : `${d.spots} lugar${d.spots !== 1 ? "es" : ""} disponible${d.spots !== 1 ? "s" : ""}`}
                                </div>
                            </div>
                            {d.spots === "completo" ? (
                                <span
                                    className="text-xs font-bold"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    Completo
                                </span>
                            ) : (
                                <span className="text-xs font-bold text-green-400 bg-green-900/40 px-2 py-0.5 rounded-full">
                                    Libre
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="px-6 py-5">
                <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-base transition-opacity hover:opacity-90"
                    style={{ background: "#25D366", color: "#fff" }}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.528 5.855L0 24l6.335-1.508A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6c-1.925 0-3.726-.534-5.263-1.458l-.377-.224-3.762.895.951-3.676-.246-.395A9.575 9.575 0 012.4 12C2.4 6.699 6.699 2.4 12 2.4S21.6 6.699 21.6 12 17.301 21.6 12 21.6z" />
                    </svg>
                    Consultar por WhatsApp
                </a>
            </div>
        </div>
    );
}


/* ── Photo gallery ── */
const POSITIONS = ["center top", "center", "center bottom", "40% center"];

function Gallery({ trip, desktopHeight = 260, onMobileGalleryChange }: { trip: Trip; desktopHeight?: number; onMobileGalleryChange?: (open: boolean) => void }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

    const openGallery = (index: number) => {
        setGalleryIndex(index);
        onMobileGalleryChange?.(true);
    };
    const closeGallery = () => {
        setGalleryIndex(null);
        onMobileGalleryChange?.(false);
    };

    const images = trip.images.map((src, i) => ({
        src,
        alt: `${trip.name} foto ${i + 1}`,
    }));

    const scroll = (dir: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
    };

    return (
        <>
            {galleryIndex !== null && (
                <GalleryModal
                    images={tripImagesToGallery(trip.images)}
                    initialIndex={galleryIndex}
                    onClose={closeGallery}
                />
            )}

            <section className="py-2 pb-6 lg:py-0">

                {/* Mobile: big carousel only — no lightbox */}
                <div className="lg:hidden">
                    <div
                        className="flex gap-3 overflow-x-auto pb-3"
                        style={{
                            WebkitOverflowScrolling: "touch",
                            scrollbarWidth: "none",
                            paddingLeft: "1.25rem",
                            paddingRight: "3.5rem", /* peek of next card */
                            scrollSnapType: "x mandatory",
                        }}
                    >
                        {images.map((img, i) => (
                            <div
                                key={i}
                                className="relative rounded-2xl overflow-hidden shrink-0"
                                style={{
                                    width: "calc(100vw - 5rem)",
                                    height: 240,
                                    scrollSnapAlign: "start",
                                }}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover"
                                    sizes="calc(100vw - 5rem)"
                                    style={{ objectPosition: POSITIONS[i] }}
                                />
                            </div>
                        ))}
                    </div>
                    {/* Button to open gallery modal */}
                    <div className="px-5 pt-2">
                        <button
                            onClick={() => openGallery(0)}
                            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold"
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.85)",
                                cursor: "pointer",
                                touchAction: "manipulation",
                            }}
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                            </svg>
                            Ver todas las fotos ({images.length})
                        </button>
                    </div>
                </div>

                {/* Desktop: scrollable strip — click opens GalleryModal */}
                <div className="hidden lg:block relative group/gallery">
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-opacity opacity-0 group-hover/gallery:opacity-100"
                        style={{ background: "rgba(13,27,42,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}
                        aria-label="Anterior"
                    >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto pb-2"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => openGallery(i)}
                                className="group/thumb relative shrink-0 rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                style={{ width: 440, height: desktopHeight }}
                                aria-label={`Ver foto ${i + 1} en pantalla completa`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                                    sizes="440px"
                                    style={{ objectPosition: POSITIONS[i] }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/thumb:bg-black/30 transition-colors duration-200">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200"
                                        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-opacity opacity-0 group-hover/gallery:opacity-100"
                        style={{ background: "rgba(13,27,42,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}
                        aria-label="Siguiente"
                    >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
            </section>
        </>
    );
}

/* ── Content sections ── */
function TripContent({ trip, onMobileGalleryChange }: { trip: Trip; onMobileGalleryChange?: (open: boolean) => void }) {
    return (
        <>
            {/* Description — mobile only; desktop renders it full-width above gallery */}
            <section
                className="lg:hidden px-5 py-6 border-t"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
                {trip.description.map((para, i) => (
                    <p
                        key={i}
                        className={`text-sm leading-relaxed ${i > 0 ? "mt-3" : ""}`}
                        style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                        {para}
                    </p>
                ))}
            </section>

            {/* Gallery — mobile only (desktop renders it full-width outside this component) */}
            <div className="lg:hidden">
                <Gallery trip={trip} onMobileGalleryChange={onMobileGalleryChange} />
            </div>

            {/* Includes */}
            <section
                className="px-5 lg:px-0 py-6 lg:py-0 lg:mb-10 lg:pt-10 border-t lg:border-t"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
                <h2 className="text-base lg:text-lg font-black mb-4 lg:mb-5">¿Qué incluye?</h2>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-3">
                    <div className="flex flex-col gap-2 mb-5 lg:mb-0">
                        {trip.includes.map((item, i) => (
                            <p
                                key={i}
                                className="text-sm"
                                style={{ color: "rgba(255,255,255,0.85)" }}
                            >
                                <span className="text-green-400 font-bold mr-2">✓</span>
                                {item}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p
                            className="text-xs font-bold uppercase tracking-widest mb-1"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                            No incluye
                        </p>
                        {trip.notIncludes.map((item, i) => (
                            <p
                                key={i}
                                className="text-sm"
                                style={{ color: "rgba(255,255,255,0.45)" }}
                            >
                                <span className="font-bold mr-2">✗</span>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Itinerary */}
            <section
                className="px-5 lg:px-0 py-6 lg:py-0 lg:mb-10 lg:pt-10 border-t"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
                <h2 className="text-base lg:text-lg font-black mb-4 lg:mb-5">Itinerario</h2>
                {trip.itinerary.map((day) => (
                    <AccordionDay key={day.day} day={day} />
                ))}
            </section>

            {/* Dates — mobile only (desktop dates go in sidebar) */}
            <section
                className="lg:hidden px-5 py-6 border-t"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
                <h2 className="text-base font-black mb-4">Próximas salidas</h2>
                <div className="flex flex-col gap-3">
                    {trip.dates.map((d, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-3 px-4 rounded-xl"
                            style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                            <div>
                                <div className="text-sm font-bold">{d.date}</div>
                                <div
                                    className="text-xs mt-0.5"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    {d.spots === "completo"
                                        ? "Completo"
                                        : `${d.spots} lugar${d.spots !== 1 ? "es" : ""} disponible${d.spots !== 1 ? "s" : ""}`}
                                </div>
                            </div>
                            {d.spots === "completo" ? (
                                <span
                                    className="text-xs font-bold"
                                    style={{ color: "rgba(255,255,255,0.35)" }}
                                >
                                    Completo
                                </span>
                            ) : (
                                <span className="text-xs font-bold text-green-400 bg-green-900/40 px-2.5 py-1 rounded-full">
                                    Disponible
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            {trip.testimonials.length > 0 && (
                <section
                    className="px-5 lg:px-0 py-6 lg:py-0 lg:pt-10 border-t"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                    <h2 className="text-base lg:text-lg font-black mb-4 lg:mb-5">
                        Lo que dicen quienes lo hicieron
                    </h2>
                    <div className="flex flex-col gap-4">
                        {trip.testimonials.map((t, i) => (
                            <div
                                key={i}
                                className="rounded-2xl p-4 lg:p-5"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                }}
                            >
                                <div className="flex items-center gap-3 mb-2 lg:mb-3">
                                    <div
                                        className="w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                                        style={{ backgroundColor: t.avatarColor }}
                                    >
                                        {t.initials}
                                    </div>
                                    <span className="text-sm font-semibold">{t.name}</span>
                                </div>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: "rgba(255,255,255,0.7)" }}
                                >
                                    &ldquo;{t.text}&rdquo;
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function FichaViaje({ trip }: { trip: Trip }) {
    const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);
    const waMessage = encodeURIComponent(
        `Hola! Me interesa el viaje "${trip.name}". ¿Podés darme más información?`
    );
    const waUrl = `https://wa.me/5491112345678?text=${waMessage}`;

    return (
        <div className="bg-mx-dark text-white">

            {/* ── HERO ── */}
            <div className="relative w-full" style={{ height: "min(58vw, 520px)" }}>
                <Image
                    src={trip.imageSrc}
                    alt={trip.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.0) 40%, rgba(13,27,42,1) 100%)",
                    }}
                />
                {/* Back link — mobile overlay on hero */}
                <Link
                    href="/viajes"
                    className="lg:hidden absolute top-4 left-4 flex items-center gap-2 text-sm font-semibold z-10 px-3 py-1.5 rounded-full"
                    style={{
                        background: "rgba(13,27,42,0.6)",
                        color: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    Viajes
                </Link>
            </div>

            {/* ════════════════════════════════════
                MOBILE — single column
            ════════════════════════════════════ */}
            <div className="lg:hidden">
                {/* Trip header */}
                <div className="bg-mx-dark px-5 pt-5 pb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <span
                            className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide ${LEVEL_BADGE[trip.level] ?? "bg-mx-blue text-white"}`}
                        >
                            ✓ {trip.level}
                        </span>
                        <DifficultyDots filled={trip.difficulty} />
                    </div>
                    <h1 className="text-3xl font-black leading-tight mb-1">{trip.name}</h1>
                    <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {trip.location} · {trip.region}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-mx-gray rounded-xl p-3 text-center">
                            <div className="text-lg font-black text-mx-red">{trip.altitudeValue}</div>
                            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>msnm</div>
                        </div>
                        <div className="bg-mx-gray rounded-xl p-3 text-center">
                            <div className="text-lg font-black text-white">{trip.days}</div>
                            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>días</div>
                        </div>
                        <div className="bg-mx-gray rounded-xl p-3 text-center">
                            <div className="text-lg font-black text-white">{trip.maxPersons}</div>
                            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>pers. máx.</div>
                        </div>
                    </div>
                </div>

                <TripContent trip={trip} onMobileGalleryChange={setMobileGalleryOpen} />

                {/* Sticky CTA */}
                <div
                    className="fixed bottom-0 left-0 right-0 z-50 px-5 py-4"
                    style={{
                        background: "rgba(13,27,42,0.97)",
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        display: mobileGalleryOpen ? "none" : undefined,
                    }}
                >
                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-base transition-opacity hover:opacity-90"
                        style={{ background: "#25D366", color: "#fff" }}
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.528 5.855L0 24l6.335-1.508A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6c-1.925 0-3.726-.534-5.263-1.458l-.377-.224-3.762.895.951-3.676-.246-.395A9.575 9.575 0 012.4 12C2.4 6.699 6.699 2.4 12 2.4S21.6 6.699 21.6 12 17.301 21.6 12 21.6z" />
                        </svg>
                        Consultar por WhatsApp
                    </a>
                </div>
            </div>

            {/* ════════════════════════════════════
                DESKTOP — two columns
            ════════════════════════════════════ */}
            <div className="hidden lg:block">
                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-8 pt-8">
                    <Link
                        href="/viajes"
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M19 12H5M12 5l-7 7 7 7" />
                        </svg>
                        Todos los viajes
                    </Link>
                </div>

                {/* Trip title (full width, above grid) */}
                <div className="max-w-7xl mx-auto px-8 pt-8 pb-0">
                    <div className="flex items-center gap-3 mb-3">
                        <span
                            className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide ${LEVEL_BADGE[trip.level] ?? "bg-mx-blue text-white"}`}
                        >
                            ✓ {trip.level}
                        </span>
                        <DifficultyDots filled={trip.difficulty} />
                    </div>
                    <h1 className="text-5xl font-black leading-tight mb-2">{trip.name}</h1>
                    <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {trip.location} · {trip.region}
                    </p>
                </div>

                {/* Description — full width, below title */}
                <div className="max-w-7xl mx-auto px-8 pb-8">
                    {trip.description.map((para, i) => (
                        <p
                            key={i}
                            className={`text-base leading-relaxed${i > 0 ? " mt-4" : ""}`}
                            style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                            {para}
                        </p>
                    ))}
                </div>

                {/* Gallery — full width, between title and content grid */}
                <div className="max-w-7xl mx-auto px-8 pb-10">
                    <Gallery trip={trip} desktopHeight={320} />
                </div>

                {/* Two-column grid */}
                <div className="max-w-7xl mx-auto px-8 pb-24 grid grid-cols-[1fr_360px] gap-16 items-start">
                    {/* LEFT: content */}
                    <TripContent trip={trip} />
                    <div className="sticky top-24">
                        <SidebarCard trip={trip} waUrl={waUrl} />
                    </div>
                </div>
            </div>
        </div>
    );
}
