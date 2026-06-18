import Image from "next/image";
import Link from "next/link";

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
export type TripLevel = "Principiante" | "Intermedio" | "Avanzado";

const LEVEL_COLORS: Record<TripLevel, string> = {
    Principiante: "#22c55e",   // green-500
    Intermedio: "#ca8a04",   // yellow-600
    Avanzado: "#E63030",   // mx-red
};

const LEVEL_TEXT_DARK: Record<TripLevel, boolean> = {
    Principiante: false,
    Intermedio: false,
    Avanzado: false,
};

export interface TripCardProps {
    name: string;
    location: string;
    altitude: string;
    duration: string;
    note: string;
    level: TripLevel;
    difficulty: DifficultyLevel;
    imageSrc: string;
    href: string;
}

export default function TripCard({
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
            className="block rounded-2xl overflow-hidden relative group"
            style={{ minHeight: "200px" }}
        >
            {/* Imagen de fondo */}
            <div className="absolute inset-0">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradiente oscuro abajo */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.3) 55%, transparent 100%)",
                    }}
                />
            </div>

            {/* Contenido */}
            <div className="relative p-4 lg:p-6 flex flex-col justify-end h-full" style={{ minHeight: "200px" }}>
                {/* Badge nivel + dots dificultad */}
                <div className="flex items-center gap-2 mb-2 lg:mb-3">
                    <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ background: LEVEL_COLORS[level] }}
                    >
                        {level}
                    </span>
                    <DifficultyDots filled={difficulty} />
                </div>

                <div className="font-black text-xl lg:text-2xl leading-tight text-white">{name}</div>
                <div className="text-sm mt-0.5 lg:mt-1 mb-2 lg:mb-3" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {location} · {altitude}
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {duration} · {note}
                    </div>
                    <span className="text-sm font-bold" style={{ color: "#E63030" }}>
                        Ver viaje →
                    </span>
                </div>
            </div>
        </Link>
    );
}

function DifficultyDots({ filled }: { filled: DifficultyLevel }) {
    return (
        <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <span
                    key={i}
                    className="inline-block rounded-full"
                    style={{
                        width: "10px",
                        height: "10px",
                        background: i < filled ? "#E63030" : "rgba(255,255,255,0.12)",
                        border: i < filled ? undefined : "1px solid rgba(230,48,48,0.35)",
                    }}
                />
            ))}
        </span>
    );
}
