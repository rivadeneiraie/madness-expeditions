import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   Datos
───────────────────────────────────────── */

const PABLO_BADGES = [
    {
        label: "15+ años en la montaña",
        description: "Forjado en el Aconcagua — el oficio aprendido viviéndolo, no en un aula",
        color: "#60a5fa",
    },
    {
        label: "200+ expediciones",
        description: "Desde iniciación hasta 6.900 m — grupos chicos, atención personalizada",
        color: "#60a5fa",
    },
    {
        label: "Equipo EPGAMT",
        description: "Guías formados en una de las dos mejores escuelas del país",
        color: "#4ade80",
    },
    {
        label: "PAX Assistance",
        description: "Seguro de evacuación y rescate incluido en todas las expediciones",
        color: "#4ade80",
    },
];

const PABLO_STATS = [
    { value: "200+", label: "Expediciones guiadas" },
    { value: "15+", label: "Años en alta montaña" },
    { value: "6.962", label: "msnm — cima más alta" },
];

const EXPEDICIONES = [
    {
        name: "Aconcagua (6.962 m)",
        detail: "Más de 40 ascensos guiados · Ruta Normal y Glaciar de los Polacos",
    },
    { name: "Mercedario (6.770 m)", detail: "Expedición técnica · San Juan" },
    { name: "Kilimanjaro (5.895 m)", detail: "Ruta Lemosho · Tanzania" },
    { name: "Everest Base Camp (5.364 m)", detail: "Trekking técnico · Nepal" },
    {
        name: "Cordón del Plata, Lanín, Domuyo, Champaquí",
        detail: "Cumbres nacionales recurrentes",
    },
];

const GUIDES = [
    {
        name: "Carlos Méndez",
        role: "Guía de Montaña · EPGAMT",
        bio: "Especialista en Patagonia y volcanes del sur. 10 años de experiencia en terreno técnico con hielo y roca.",
        tags: ["Patagonia", "Escalada en hielo", "EPGAMT"],
        photo: "/photos/guia01.png",
    },
    {
        name: "Lucía Romero",
        role: "Guía de Trekking · Instructora",
        bio: "Especialista en grupos de iniciación. Formación en montañismo progresivo y preparación física para expediciones.",
        tags: ["Principiantes", "Preparación física", "Andes Centrales"],
        photo: "/photos/guia02.png",
    },
    {
        name: "Marcos Peralta",
        role: "Guía de Alta Montaña · EPGAMT",
        bio: "Expediciones en 6000m+ y rutas técnicas de Aconcagua. Especialización en logística de campamentos de alta montaña.",
        tags: ["6000m+", "Aconcagua", "EPGAMT"],
        photo: "/photos/guia03.png",
    },
];

/* ─────────────────────────────────────────
   Sub-componentes
───────────────────────────────────────── */

function StarIcon({ color }: { color: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            className="shrink-0 mt-0.5"
        >
            <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52l-5.62 3.97 2.09-6.26L3 8.26h6.91z" />
        </svg>
    );
}

function CertBadge({ label, description, color }: (typeof PABLO_BADGES)[number]) {
    return (
        <div
            className="rounded-xl p-4 flex items-start gap-3"
            style={{
                background: "rgba(26,58,92,0.4)",
                border: "1px solid rgba(26,58,92,0.8)",
            }}
        >
            <StarIcon color={color} />
            <div>
                <div className="text-xs font-black uppercase tracking-wide">{label}</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {description}
                </div>
            </div>
        </div>
    );
}

function StatCard({ value, label }: (typeof PABLO_STATS)[number]) {
    return (
        <div
            className="rounded-xl p-4 text-center"
            style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
            }}
        >
            <div className="text-3xl font-black text-mx-red">{value}</div>
            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                {label}
            </div>
        </div>
    );
}

function TimelineItem({ name, detail }: (typeof EXPEDICIONES)[number]) {
    return (
        <div className="flex items-start gap-3">
            <span className="w-3 h-3 rounded-full bg-mx-red shrink-0 mt-1" />
            <div>
                <span className="text-sm font-bold">{name}</span>
                <span className="text-sm ml-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                    — {detail}
                </span>
            </div>
        </div>
    );
}

function GuideCard({ name, role, bio, tags, photo }: (typeof GUIDES)[number]) {
    return (
        <div
            className="rounded-2xl overflow-hidden flex flex-col h-full"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
            <div className="relative h-56 shrink-0">
                <Image
                    src={photo}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-5 flex flex-col flex-1" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="font-black text-lg mb-0.5">{name}</div>
                <div className="text-mx-red text-sm font-semibold mb-3">{role}</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {bio}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                                background: "rgba(26,58,92,0.5)",
                                color: "rgba(255,255,255,0.7)",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   Componente principal
───────────────────────────────────────── */

export default function EquipoPage() {
    return (
        <div style={{ background: "#0D1B2A", minHeight: "100vh" }}>

            {/* ── Hero ── */}
            <header className="relative py-16 lg:py-24 overflow-hidden">
                {/* Imagen de fondo */}
                <div className="absolute inset-0">
                    <Image
                        src="/photos/28.jpg"
                        alt="Equipo Madness Expeditions en la montaña"
                        fill
                        className="object-cover object-[center_30%]"
                        priority
                    />
                    {/* Overlay mobile: gradient vertical, imagen visible */}
                    <div
                        className="absolute inset-0 lg:hidden"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(13,27,42,0.85) 0%, rgba(13,27,42,0.75) 100%)",
                        }}
                    />
                    {/* Overlay desktop: gradient horizontal como en el prototipo */}
                    <div
                        className="absolute inset-0 hidden lg:block"
                        style={{
                            background:
                                "linear-gradient(to right, rgba(13,27,42,0.96) 45%, rgba(13,27,42,0.4) 100%)",
                        }}
                    />
                </div>

                <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3 text-mx-red">
                        Quiénes somos
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-black leading-none mb-4">El equipo</h1>
                    <p
                        className="text-base lg:text-lg max-w-xl leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                        Guías certificados con formación real y años en la montaña. No somos entusiastas con
                        ganas — somos profesionales formados.
                    </p>
                </div>
            </header>

            {/* ── Pablo — Perfil principal ── */}
            <section className="max-w-6xl mx-auto px-5 lg:px-8 py-14 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">

                    {/* Izquierda: foto + certificaciones */}
                    <div>
                        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 380 }}>
                            <Image
                                src="/photos/pablo2.jpeg"
                                alt="Pablo Fortunato — Fundador Madness Expeditions"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {PABLO_BADGES.map((badge) => (
                                <CertBadge key={badge.label} {...badge} />
                            ))}
                        </div>
                    </div>

                    {/* Derecha: bio + stats + historial */}
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-black mb-1">Pablo Fortunato</h2>
                        <p className="text-mx-red font-bold text-lg mb-6">
                            Fundador · Director
                        </p>

                        <p
                            className="text-base leading-relaxed mb-5"
                            style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                            Montañista de toda la vida, forjado en el Aconcagua. Pablo construyó su experiencia
                            viviéndola — años de trabajo en ascensos a la cima más alta de América hasta fundar
                            Madness Expeditions con un equipo de guías de élite formados en las mejores escuelas
                            del país.
                        </p>
                        <blockquote
                            className="text-base leading-relaxed mb-8 pl-4 border-l-2 border-mx-red italic"
                            style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                            "No me interesa llenar grupos. Me interesa que cada persona que salga conmigo llegue
                            a donde puede llegar — y que vuelva con ganas de más. Para eso hay que conocerla
                            antes de subir."
                        </blockquote>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {PABLO_STATS.map((s) => (
                                <StatCard key={s.label} {...s} />
                            ))}
                        </div>

                        {/* Expediciones destacadas */}
                        <h3
                            className="text-xs font-black uppercase tracking-widest mb-4"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                            Expediciones destacadas
                        </h3>
                        <div className="flex flex-col gap-3">
                            {EXPEDICIONES.map((exp) => (
                                <TimelineItem key={exp.name} {...exp} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Equipo de guías ── */}
            <section
                className="border-t py-14 lg:py-16"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
                <div className="max-w-6xl mx-auto px-5 lg:px-8">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2 text-mx-red">
                        El equipo completo
                    </p>
                    <h2 className="text-2xl lg:text-3xl font-black mb-10">
                        Guías que acompañan las expediciones
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {GUIDES.map((guide) => (
                            <GuideCard key={guide.name} {...guide} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA: Cómo trabajamos ── */}
            <section
                className="border-t py-12"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
                <div className="max-w-6xl mx-auto px-5 lg:px-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-bold mb-1">¿Cómo son las expediciones en la práctica?</p>
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                            El modelo de trabajo, la preparación y cómo se arman los grupos.
                        </p>
                    </div>
                    <Link
                        href="/como-trabajamos"
                        className="shrink-0 inline-flex items-center gap-2 text-sm font-bold bg-mx-blue hover:opacity-90 text-white px-6 py-3 rounded-xl transition-opacity"
                    >
                        Cómo trabajamos →
                    </Link>
                </div>
            </section>
        </div>
    );
}
