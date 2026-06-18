"use client";

import { useState } from "react";
import { type TripCardProps, type TripLevel } from "../ui/TripCard";
import TripCardHorizontal from "../ui/TripCardHorizontal";
import { type Trip } from "@/lib/trips/types";

type TripWithZone = TripCardProps & { zone: string };

function tripToCard(trip: Trip): TripWithZone {
    const firstAvailable = trip.dates?.find((d) => d.spots !== "completo");
    return {
        name: trip.name,
        location: trip.location,
        altitude: trip.altitude,
        duration: `${trip.days} días`,
        note: trip.cardNote ?? firstAvailable?.date ?? "Próximamente",
        level: trip.level,
        difficulty: trip.difficulty,
        imageSrc: trip.imageSrc,
        href: `/viajes/${trip.slug}`,
        zone: trip.region,
    };
}

type FilterLevel = "Todos" | TripLevel | "Patagonia" | "Andes Centrales" | "Internacionales";

const FILTERS: FilterLevel[] = [
    "Todos",
    "Principiante",
    "Intermedio",
    "Avanzado",
    "Andes Centrales",
    "Patagonia",
    "Internacionales",
];

const LEVEL_DIFFICULTIES: Record<string, number> = {
    Principiante: 1,
    Intermedio: 3,
    Avanzado: 5,
};

export default function CatalogoViajes({ trips }: { trips: Trip[] }) {
    const [activeFilter, setActiveFilter] = useState<FilterLevel>("Todos");

    const allTrips = trips.map(tripToCard);

    const filtered = allTrips.filter((t) => {
        if (activeFilter === "Todos") return true;
        if (activeFilter === t.level) return true;
        if (activeFilter === t.zone) return true;
        return false;
    });

    const principiante = filtered.filter((t) => t.level === "Principiante");
    const intermedio = filtered.filter((t) => t.level === "Intermedio");
    const avanzado = filtered.filter((t) => t.level === "Avanzado");

    return (
        <div style={{ background: "#0D1B2A", minHeight: "100vh" }}>
            {/* ── Header ── */}
            <header className="px-5 lg:px-8 pt-8 pb-6 max-w-6xl mx-auto">
                <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#E63030" }}>
                    Expediciones &amp; Ascensos
                </p>
                <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-2 text-white">
                    Nuestros viajes
                </h1>
                <p className="text-sm lg:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Nacionales e internacionales · Todos los niveles · Con guía incluido
                </p>
            </header>

            {/* ── Barra de filtros sticky ── */}
            <div
                className="sticky top-16 z-40"
                style={{ background: "rgba(13,27,42,0.97)", backdropFilter: "blur(8px)", boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
            >
                <div
                    className="flex gap-2 px-5 lg:px-8 py-3 overflow-x-auto max-w-6xl mx-auto"
                    style={{ scrollbarWidth: "none" }}
                >
                    {FILTERS.map((f) => {
                        const isActive = f === activeFilter;
                        const dots = LEVEL_DIFFICULTIES[f];
                        return (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className="shrink-0 flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-colors"
                                style={
                                    isActive
                                        ? { background: "#E63030", color: "white" }
                                        : { background: "#1C1C1E", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.12)" }
                                }
                            >
                                {dots && (
                                    <span className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <span
                                                key={i}
                                                className="inline-block w-2 h-2 rounded-full"
                                                style={{ background: i <= dots ? "#E63030" : "rgba(255,255,255,0.2)" }}
                                            />
                                        ))}
                                    </span>
                                )}
                                {f}
                            </button>
                        );
                    })}
                </div>
                <div className="h-px mx-5 lg:mx-8" style={{ background: "rgba(255,255,255,0.07)" }} />
            </div>

            {/* ── Grid de viajes ── */}
            <main className="px-4 lg:px-8 pt-6 pb-16 max-w-6xl mx-auto">
                {filtered.length === 0 && (
                    <p className="text-center py-16 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                        No hay viajes disponibles para este filtro por el momento.
                    </p>
                )}

                {principiante.length > 0 && (
                    <TripGroup label="Para empezar" trips={principiante} />
                )}
                {intermedio.length > 0 && (
                    <TripGroup label="Nivel intermedio" trips={intermedio} />
                )}
                {avanzado.length > 0 && (
                    <TripGroup label="Alta montaña" trips={avanzado} />
                )}
            </main>
        </div>
    );
}

function TripGroup({ label, trips }: { label: string; trips: TripCardProps[] }) {
    return (
        <section className="mb-10">
            {/* Separador de sección */}
            <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {label}
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            </div>
            <div className="flex flex-col gap-4">
                {trips.map((trip) => (
                    <TripCardHorizontal key={trip.name} {...trip} />
                ))}
            </div>
        </section>
    );
}
