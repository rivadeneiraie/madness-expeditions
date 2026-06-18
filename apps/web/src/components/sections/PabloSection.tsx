import Image from "next/image";

const credentials = ["Operadora habilitada", "Seguros incluidos", "PAX Assistance", "ANSILTA"];

export default function PabloSection() {
    return (
        <section
            className="border-t"
            style={{ background: "#0D1B2A", borderColor: "rgba(26,58,92,0.3)" }}
        >
            <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10 lg:py-16">

                {/* ── Mobile layout ── */}
                <div className="lg:hidden">
                    <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#E63030" }}>
                        Quién te guía
                    </p>

                    <div className="flex items-start gap-4 mb-5">
                        {/* Foto circular */}
                        <div
                            className="w-16 h-16 rounded-full shrink-0 overflow-hidden border-2"
                            style={{ borderColor: "#E63030" }}
                        >
                            <Image
                                src="/photos/company.png"
                                alt="Pablo Fortunato — Guía de montaña"
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <div className="font-black text-lg leading-tight text-white">The Madness Expeditions</div>
                            <div className="text-sm font-semibold mt-0.5" style={{ color: "#E63030" }}>
                                Generamos experiecias en montaña
                            </div>
                            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                                +15 años liderando expediciones en la Cordillera
                            </div>
                        </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.8)" }}>
                        &ldquo;No vendo paquetes turísticos. Diseño expediciones con cada persona según su nivel y sus ganas.
                        Si soñás con subir una cumbre y no sabés si podés — ese es exactamente el lugar donde empiezo a
                        trabajar con vos.&rdquo;
                    </p>

                    {/* Stats grid 3 cols */}
                    <div className="grid grid-cols-3 gap-3">
                        <StatCard value="+200" label="Expediciones guiadas" />
                        <StatCard value="15+" label="Años en alta montaña" />
                        <StatCard value="100%" label="Con seguro incluido" />
                    </div>
                </div>

                {/* ── Desktop layout: 2 columnas ── */}
                <div className="hidden lg:grid grid-cols-2 gap-16 items-center">

                    {/* Columna izquierda — foto + badges */}
                    <div className="flex flex-col items-start gap-6">
                        <div
                            className="w-full rounded-2xl overflow-hidden"
                            style={{ height: "380px", border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                            <Image
                                src="/photos/company.png"
                                alt="Pablo Fortunato — Guía de montaña"
                                width={600}
                                height={380}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        {/* Badges credenciales */}
                        <div className="flex flex-wrap gap-2">
                            {credentials.map((c) => (
                                <span
                                    key={c}
                                    className="text-xs font-bold px-3 py-1.5 rounded-full border"
                                    style={{
                                        borderColor: "rgba(26,58,92,0.8)",
                                        background: "rgba(26,58,92,0.3)",
                                        color: "rgba(255,255,255,0.8)",
                                    }}
                                >
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Columna derecha — bio, cita, stats, CTA */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#E63030" }}>
                            Quién te guía
                        </p>
                        <h2 className="text-4xl font-black leading-tight mb-2 text-white">The Madness Expeditions</h2>
                        <p className="text-lg font-semibold mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                            Madness Expeditions es una empresa con  +15  años liderando expediciones en la Cordillera
                        </p>

                        {/* Cita */}
                        <blockquote
                            className="border-l-2 pl-6 mb-8"
                            style={{ borderColor: "#E63030" }}
                        >
                            <p className="text-base leading-relaxed italic" style={{ color: "rgba(255,255,255,0.82)" }}>
                                &ldquo;No vendo paquetes turísticos. Diseño expediciones con cada persona según su nivel y sus ganas.
                                Si soñás con subir una cumbre y no sabés si podés — ese es exactamente el lugar donde empiezo a
                                trabajar con vos.&rdquo;
                            </p>
                        </blockquote>

                        {/* Stats 3 cols */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <StatCard value="+200" label="Expediciones guiadas" large />
                            <StatCard value="15+" label="Años en alta montaña" large />
                            <StatCard value="6.962m" label="Altura máxima alcanzada" large />
                        </div>

                        {/* CTA equipo */}
                        <a
                            href="/equipo"
                            className="inline-flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
                            style={{ background: "#1a3a5c" }}
                        >
                            Conocer más sobre el equipo →
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}

function StatCard({
    value,
    label,
    large = false,
}: {
    value: string;
    label: string;
    large?: boolean;
}) {
    return (
        <div
            className="rounded-xl p-3 lg:p-4 text-center"
            style={{
                background: large ? "rgba(255,255,255,0.04)" : "#1C1C1E",
                border: large ? "1px solid rgba(255,255,255,0.07)" : undefined,
            }}
        >
            <div
                className={`font-black ${large ? "text-3xl" : "text-xl"}`}
                style={{ color: "#E63030" }}
            >
                {value}
            </div>
            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                {label}
            </div>
        </div>
    );
}
