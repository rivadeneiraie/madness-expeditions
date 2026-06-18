const pillars = [
    {
        icon: <MountainIcon />,
        title: "Sin experiencia previa",
        body: "Tenemos viajes de iniciación diseñados para personas que nunca subieron una montaña. Comenzás donde estás.",
    },
    {
        icon: <GuideIcon />,
        title: "Guía personal desde el día 1",
        body: "Nuestro guía te acompaña desde el principio: te explica el recorrido, el equipamiento y resuelve todas tus dudas antes de partir.",
    },
    {
        icon: <ShieldIcon />,
        title: "Guía dedicado, ritmo de cada uno",
        body: "El ratio de guía por cliente garantiza que cada expedición sea segura y se adapte al ritmo de todos.",
    },
];

export default function TrustBlock() {
    return (
        <section style={{ background: "#1C1C1E" }}>
            <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10 lg:py-16">

                <div className="mb-7 lg:mb-10">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#E63030" }}>
                        ¿Es para alguien como yo?
                    </p>
                    <h2 className="text-2xl lg:text-4xl font-black leading-tight text-white">
                        Sí, trabajamos con personas de todos los niveles
                    </h2>
                </div>

                {/* Mobile: columna · Desktop: 3 columnas */}
                <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-8">
                    {pillars.map((p) => (
                        <div
                            key={p.title}
                            className="flex items-start gap-4 lg:flex-col lg:gap-4 lg:p-8 lg:rounded-2xl"
                            style={{
                                // Solo en desktop añadimos el card con borde
                            }}
                        >
                            {/* Wrapper del card desktop */}
                            <PillarCard icon={p.icon} title={p.title} body={p.body} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

function PillarCard({
    icon,
    title,
    body,
}: {
    icon: React.ReactNode;
    title: string;
    body: string;
}) {
    return (
        <>
            {/* Mobile layout: ícono + texto en fila */}
            <div className="flex items-start gap-4 lg:hidden">
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#1a3a5c" }}
                >
                    {icon}
                </div>
                <div>
                    <div className="font-bold text-base mb-0.5 text-white">{title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {body}
                    </div>
                </div>
            </div>

            {/* Desktop layout: ícono arriba, texto abajo, card con borde */}
            <div
                className="hidden lg:flex flex-col gap-4 p-8 rounded-2xl w-full h-full"
                style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                }}
            >
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#1a3a5c" }}
                >
                    {icon}
                </div>
                <div>
                    <div className="font-bold text-lg mb-2 text-white">{title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                        {body}
                    </div>
                </div>
            </div>
        </>
    );
}

/* ── Íconos SVG ── */

function MountainIcon() {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 20l8-14 3 5 2-3 5 12H3z" />
        </svg>
    );
}

function GuideIcon() {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="7" r="3" />
            <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" />
            <path d="M16 11.5l3 3-3 3" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l7 3v6c0 4.418-3.134 8.573-7 9.95C8.134 19.573 5 15.418 5 11V5l7-3z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}
