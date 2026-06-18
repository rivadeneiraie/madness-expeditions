import Image from "next/image";
import Link from "next/link";
import { waLink, siteConfig } from "@/lib/config";

/* ─────────────────────────────────────────
   Datos
───────────────────────────────────────── */

const EXPEDICION_OPTIONS = [
    "Cerro Catedral (Principiante)",
    "Volcán Lanín (Intermedio)",
    "Cordón del Plata (Avanzado)",
    "Volcán Domuyo (Avanzado)",
    "Aconcagua (Élite)",
    "Mercedario (Élite)",
    "Kilimanjaro",
    "Everest Base Camp",
    "No sé todavía — quiero orientación",
];

const CONTACT_POINTS = [
    {
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.097 1.508 5.817L.057 23.886l6.219-1.427A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.029 21.818a9.946 9.946 0 01-5.064-1.379l-.363-.215-3.763.863.943-3.653-.237-.375A9.932 9.932 0 012.09 12c0-5.478 4.461-9.939 9.939-9.939 5.478 0 9.939 4.461 9.939 9.939 0 5.478-4.461 9.818-9.939 9.818z" />
            </svg>
        ),
        label: "WhatsApp",
        value: `+${siteConfig.whatsappPhone.slice(0, 2)} ${siteConfig.whatsappPhone.slice(2, 4)} ${siteConfig.whatsappPhone.slice(4, 8)}-${siteConfig.whatsappPhone.slice(8)}`,
        href: waLink("default"),
        detail: "Responde el mismo día, en horario de Argentina",
        color: "#22c55e",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
            </svg>
        ),
        label: "Instagram",
        value: `@${siteConfig.instagramHandle}`,
        href: `https://instagram.com/${siteConfig.instagramHandle}`,
        detail: "DMs abiertos para consultas",
        color: "rgba(255,255,255,0.7)",
    },
];

/* ─────────────────────────────────────────
   Componente principal
───────────────────────────────────────── */

export default function ContactoPage() {
    return (
        <div style={{ background: "#0D1B2A", minHeight: "100vh" }}>

            {/* ── Hero ── */}
            <header
                className="relative py-14 lg:py-20 overflow-hidden"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
                {/* Imagen de fondo */}
                <div className="absolute inset-0">
                    <Image
                        src="/photos/cordondelplata01.jpg"
                        alt="Cordón del Plata — Madness Expeditions"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Overlay mobile */}
                    <div
                        className="absolute inset-0 lg:hidden"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.88) 100%)",
                        }}
                    />
                    {/* Overlay desktop */}
                    <div
                        className="absolute inset-0 hidden lg:block"
                        style={{
                            background:
                                "linear-gradient(to right, rgba(13,27,42,0.97) 50%, rgba(13,27,42,0.55) 100%)",
                        }}
                    />
                </div>
                <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3 text-mx-red">
                        Contacto
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-black leading-none mb-4">
                        Consultanos
                    </h1>
                    <p
                        className="text-base lg:text-lg max-w-xl leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                        Sin intermediarios. Sin equipo de ventas. Una consulta directa con la persona que
                        va a guiarte.
                    </p>
                </div>
            </header>

            {/* ── Contenido principal ── */}
            <section className="max-w-6xl mx-auto px-5 lg:px-8 py-14 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* ── Columna izquierda: datos de contacto + WhatsApp ── */}
                    <div>
                        <h2 className="text-xl font-black mb-8">Canales directos</h2>

                        <div className="flex flex-col gap-5 mb-10">
                            {CONTACT_POINTS.map((cp) => (
                                <a
                                    key={cp.label}
                                    href={cp.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-2xl transition-colors hover:opacity-90"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: "rgba(255,255,255,0.08)" }}
                                    >
                                        {cp.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                                            {cp.label}
                                        </div>
                                        <div className="font-bold text-sm" style={{ color: cp.color }}>
                                            {cp.value}
                                        </div>
                                        <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                                            {cp.detail}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* WhatsApp CTA principal */}
                        <Link
                            href={waLink("default")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold text-base py-4 px-6 rounded-xl transition-colors mb-3"
                        >
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.097 1.508 5.817L.057 23.886l6.219-1.427A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.029 21.818a9.946 9.946 0 01-5.064-1.379l-.363-.215-3.763.863.943-3.653-.237-.375A9.932 9.932 0 012.09 12c0-5.478 4.461-9.939 9.939-9.939 5.478 0 9.939 4.461 9.939 9.939 0 5.478-4.461 9.818-9.939 9.818z" />
                            </svg>
                            Escribinos por WhatsApp
                        </Link>
                        <p className="text-sm text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                            Responde el mismo día, en horario de Argentina
                        </p>

                        {/* Links de contexto */}
                        <div
                            className="mt-10 pt-8 border-t flex flex-col gap-3"
                            style={{ borderColor: "rgba(255,255,255,0.07)" }}
                        >
                            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                                Antes de consultar, puede interesarte
                            </p>
                            <Link
                                href="/como-trabajamos"
                                className="text-sm hover:text-white transition-colors flex items-center gap-2"
                                style={{ color: "rgba(255,255,255,0.55)" }}
                            >
                                <span className="text-mx-red">→</span> Cómo trabajamos y qué incluye cada expedición
                            </Link>
                            <Link
                                href="/viajes"
                                className="text-sm hover:text-white transition-colors flex items-center gap-2"
                                style={{ color: "rgba(255,255,255,0.55)" }}
                            >
                                <span className="text-mx-red">→</span> Ver el catálogo de viajes disponibles
                            </Link>
                            <Link
                                href="/equipo"
                                className="text-sm hover:text-white transition-colors flex items-center gap-2"
                                style={{ color: "rgba(255,255,255,0.55)" }}
                            >
                                <span className="text-mx-red">→</span> Conocer el equipo de guías
                            </Link>
                        </div>
                    </div>

                    {/* ── Columna derecha: formulario ── */}
                    <div>
                        <h2 className="text-xl font-black mb-8">O completá el formulario</h2>
                        <form className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="nombre"
                                        className="text-xs font-semibold uppercase tracking-wide mb-1.5 block"
                                        style={{ color: "rgba(255,255,255,0.5)" }}
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        id="nombre"
                                        type="text"
                                        placeholder="Tu nombre"
                                        className="w-full rounded-[10px] px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors"
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-xs font-semibold uppercase tracking-wide mb-1.5 block"
                                        style={{ color: "rgba(255,255,255,0.5)" }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        className="w-full rounded-[10px] px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors"
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="telefono"
                                    className="text-xs font-semibold uppercase tracking-wide mb-1.5 block"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    Teléfono / WhatsApp <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>(opcional)</span>
                                </label>
                                <input
                                    id="telefono"
                                    type="tel"
                                    placeholder="+54 9 11 XXXX XXXX"
                                    className="w-full rounded-[10px] px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="viaje"
                                    className="text-xs font-semibold uppercase tracking-wide mb-1.5 block"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    Viaje de interés
                                </label>
                                <select
                                    id="viaje"
                                    className="w-full rounded-[10px] px-3.5 py-3 text-sm text-white focus:outline-none transition-colors"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                    }}
                                    defaultValue=""
                                >
                                    <option value="" disabled style={{ background: "#0D1B2A" }}>
                                        Seleccioná una expedición…
                                    </option>
                                    {EXPEDICION_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt} style={{ background: "#0D1B2A" }}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="consulta"
                                    className="text-xs font-semibold uppercase tracking-wide mb-1.5 block"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    Tu experiencia y consulta
                                </label>
                                <textarea
                                    id="consulta"
                                    rows={5}
                                    placeholder="Contános tu experiencia previa, qué estás buscando y cualquier pregunta que tengas…"
                                    className="w-full rounded-[10px] px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors resize-none"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-mx-red hover:opacity-90 text-white font-bold text-sm py-4 rounded-xl transition-opacity"
                            >
                                Enviar consulta
                            </button>
                            <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                                Respondemos en menos de 24 hs
                            </p>
                        </form>
                    </div>

                </div>
            </section>
        </div>
    );
}
