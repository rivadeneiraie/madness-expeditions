import Image from "next/image";
import { waLink } from "@/lib/config";

export default function HeroSection() {
    return (
        <section className="relative flex items-end lg:items-center min-h-svh lg:min-h-screen overflow-hidden">

            {/* ── Imagen de fondo ── */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/photos/05.jpg"
                    alt="Expedición en alta montaña argentina"
                    fill
                    sizes="100vw"
                    className="object-cover object-[center_30%]"
                    priority
                />
                {/* Gradiente mobile: abajo hacia arriba */}
                <div
                    className="absolute inset-0 lg:hidden"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(13,27,42,0.25) 0%, rgba(13,27,42,0.55) 50%, rgba(13,27,42,0.95) 100%)",
                    }}
                />
                {/* Gradiente desktop: izquierda hacia derecha */}
                <div
                    className="absolute inset-0 hidden lg:block"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(13,27,42,1) 0%, rgba(13,27,42,0.92) 42%, rgba(13,27,42,0.45) 70%, rgba(13,27,42,0.1) 100%)",
                    }}
                />
            </div>

            {/* ── Contenido mobile ── */}
            <div className="lg:hidden w-full px-5 pb-10 pt-16">

                {/* Badge — responde el miedo de Valentina ANTES del título */}
                <div className="animate-fadeup delay-100 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider" style={{ background: "rgba(230,48,48,0.9)" }}>
                        <StarIcon />
                        Para todos los niveles — incluso sin experiencia
                    </span>
                </div>

                {/* H1 */}
                <h1 className="animate-fadeup delay-200 text-4xl font-black leading-none tracking-tight mb-3 uppercase text-white">
                    No te quedes<br />
                    <span>en el Llano.</span>
                </h1>

                {/* Subtítulo */}
                <p
                    className="animate-fadeup delay-300 text-base font-light leading-relaxed mb-7 max-w-xs"
                    style={{ color: "rgba(255,255,255,0.88)" }}
                >
                    Expediciones y ascensos guiados en Argentina. Desde tu primera cumbre hasta los 6000 m.
                </p>

                {/* CTA principal */}
                <a
                    href="#viajes"
                    className="animate-fadeup delay-300 block w-full text-white text-center font-bold text-base py-4 rounded-xl tracking-wide transition-opacity active:opacity-80"
                    style={{ background: "#E63030" }}
                >
                    Ver viajes
                </a>

                {/* CTA secundario WhatsApp */}
                <a
                    href={waLink("beginners")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block w-full text-center font-medium text-sm py-3.5 rounded-xl tracking-wide transition-colors active:bg-white/10"
                    style={{
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "rgba(255,255,255,0.9)",
                    }}
                >
                    ¿No sabés por dónde empezar? Hablemos
                </a>

                {/* Scroll indicator */}
                <div className="mt-8 flex justify-center opacity-50">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" strokeWidth="1.5">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            </div>

            {/* ── Contenido desktop ── */}
            <div className="hidden lg:block w-full max-w-6xl mx-auto px-8 py-24">
                <div className="max-w-xl">

                    {/* Badge */}
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider" style={{ background: "#E63030" }}>
                            <StarIcon />
                            Para todos los niveles — incluso sin experiencia
                        </span>
                    </div>

                    {/* H1 */}
                    <h1 className="text-7xl font-black leading-none tracking-tight uppercase mb-5 text-white">
                        No te quedes<br />
                        <span>en el Llano</span>
                    </h1>

                    {/* Subtítulo */}
                    <p className="text-xl leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.82)" }}>
                        Expediciones y ascensos guiados en Argentina.<br />
                        Desde tu primera cumbre hasta los 6.000 m
                    </p>

                    {/* CTAs en fila */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#viajes"
                            className="text-white font-bold text-base px-8 py-4 rounded-xl transition-opacity hover:opacity-90"
                            style={{ background: "#E63030" }}
                        >
                            Ver viajes
                        </a>
                        <a
                            href={waLink("beginners")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-base px-8 py-4 rounded-xl transition-colors hover:bg-white/10"
                            style={{
                                border: "1px solid rgba(255,255,255,0.3)",
                                color: "rgba(255,255,255,0.9)",
                            }}
                        >
                            ¿No sabés por dónde empezar? Hablemos
                        </a>
                    </div>

                    {/* Barra de 4 stats */}
                    <div
                        className="flex items-center gap-8 mt-12 pt-10 border-t"
                        style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    >
                        <Stat value="+200" label="Expediciones guiadas" />
                        <StatDivider />
                        <Stat value="15+" label="Años en alta montaña" />
                        <StatDivider />
                        <Stat value="4.9 ★" label="Google Reviews" />
                        <StatDivider />
                        <Stat value="100%" label="Con seguro incluido" />
                    </div>

                </div>
            </div>
        </section>
    );
}

/* ── Sub-componentes ── */

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div>
            <div className="text-2xl font-black" style={{ color: "#E63030" }}>{value}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</div>
        </div>
    );
}

function StatDivider() {
    return (
        <div style={{ width: "1px", height: "36px", background: "rgba(255,255,255,0.1)" }} />
    );
}

function StarIcon() {
    return (
        <svg viewBox="0 0 16 16" width="11" height="11" fill="white">
            <path d="M8 1l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9l-3 1.5.5-3.5L3 4.5 6.5 4z" />
        </svg>
    );
}
