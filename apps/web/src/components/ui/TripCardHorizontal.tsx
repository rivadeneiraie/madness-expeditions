import Image from "next/image";
import Link from "next/link";
import { type TripCardProps, type TripLevel, type DifficultyLevel } from "./TripCard";

const LEVEL_COLORS: Record<TripLevel, string> = {
    Principiante: "#22c55e",
    Intermedio: "#ca8a04",
    Avanzado: "#E63030",
};

export default function TripCardHorizontal({
    name,
    location,
    altitude,
    duration,
    note,
    level,
    difficulty,
    imageSrc,
    href,
}: TripCardProps) {
    return (
        <Link
            href={href}
            className="group block rounded-2xl overflow-hidden transition-all hover:scale-[1.01]"
            style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#1C1C1E" }}
        >
            {/* ── Mobile: vertical con foto de fondo ── */}
            <div className="lg:hidden relative" style={{ minHeight: "220px" }}>
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(13,27,42,0.1) 30%, rgba(13,27,42,0.95) 100%)" }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between mb-1.5">
                        <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{ background: LEVEL_COLORS[level], color: "white" }}
                        >
                            {level}
                        </span>
                        <DifficultyDots filled={difficulty} />
                    </div>
                    <h3 className="text-xl font-black text-white leading-tight">{name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
                        {location} · {altitude}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                            {duration} · {note}
                        </span>
                        <span className="text-xs font-bold" style={{ color: "#E63030" }}>
                            Ver viaje →
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Desktop: horizontal foto izquierda / info derecha ── */}
            <div className="hidden lg:flex" style={{ height: "200px" }}>
                {/* Foto — 40% */}
                <div className="relative w-[40%] shrink-0 overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={name}
                        fill
                        sizes="40vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badge nivel sobre la foto */}
                    <div className="absolute top-4 left-4">
                        <span
                            className="text-xs font-bold px-3 py-1.5 rounded-full"
                            style={{ background: LEVEL_COLORS[level], color: "white" }}
                        >
                            {level}
                        </span>
                    </div>
                </div>

                {/* Info — 60% */}
                <div className="flex flex-col justify-between p-6 flex-1">
                    <div>
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-2xl font-black text-white leading-tight">{name}</h3>
                            <DifficultyDots filled={difficulty} />
                        </div>
                        <p className="text-sm font-medium mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {location} · {altitude}
                        </p>
                        {/* Chips de info */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <InfoChip icon="🗓" label={duration} />
                            <InfoChip icon="📍" label={note} />
                        </div>
                    </div>
                    {/* CTA */}
                    <div className="flex items-center justify-end">
                        <span
                            className="text-sm font-bold px-5 py-2.5 rounded-xl transition-opacity group-hover:opacity-80"
                            style={{ background: "#E63030", color: "white" }}
                        >
                            Ver viaje →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function DifficultyDots({ filled }: { filled: DifficultyLevel }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
                <span
                    key={i}
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{
                        background: i <= filled ? "#E63030" : "rgba(255,255,255,0.12)",
                        border: i <= filled ? undefined : "1px solid rgba(230,48,48,0.35)",
                    }}
                />
            ))}
        </div>
    );
}

function InfoChip({ icon, label }: { icon: string; label: string }) {
    return (
        <span
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
        >
            <span>{icon}</span>
            {label}
        </span>
    );
}
