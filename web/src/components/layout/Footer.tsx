import Image from "next/image";
import Link from "next/link";
import { waLink, instagramUrl, siteConfig } from "@/lib/config";

export default function Footer() {
    return (
        <footer style={{ background: "#1C1C1E", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="max-w-6xl mx-auto px-5 lg:px-8 py-8 lg:py-12">

                {/* ── Desktop: 4 columnas ── */}
                <div className="hidden lg:grid grid-cols-4 gap-10 mb-10">

                    {/* Col 1: Logo + descripción */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                                <Image src="/logo-v4.png" alt="Madness Expeditions" width={36} height={36} className="object-cover" />
                            </div>
                            <div>
                                <div className="font-black uppercase tracking-wider text-xs text-white">
                                    The Madness Expeditions
                                </div>
                                <div className="font-light tracking-widest text-xs uppercase opacity-50 text-white">
                                    Argentina
                                </div>
                            </div>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Responsabilidad, Seguridad, Servicio, Compromiso y Garantía en todas nuestras
                            Expediciones &amp; Ascensos.
                        </p>
                        <div className="flex gap-2 mt-4">
                            <Badge label="ANSILTA" />
                            <Badge label="PAX Assistance" />
                        </div>
                    </div>

                    {/* Col 2: Expediciones */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Expediciones
                        </p>
                        <nav className="flex flex-col gap-2.5">
                            <FooterLink href="/viajes" label="Catálogo de viajes" />
                            <FooterLink href="/equipamiento" label="Guía de equipamiento" />
                        </nav>
                    </div>

                    {/* Col 3: Nosotros */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Nosotros
                        </p>
                        <nav className="flex flex-col gap-2.5">
                            <FooterLink href="/equipo" label="El equipo" />
                            <FooterLink href="/como-trabajamos" label="Cómo trabajamos" />
                            <FooterLink href="/contacto" label="Contacto" />
                        </nav>
                    </div>

                    {/* Col 4: Contacto */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Contacto
                        </p>
                        <a
                            href={waLink("default")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold transition-colors mb-3"
                            style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                            <WhatsAppIconSmall />
                            WhatsApp
                        </a>
                        <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                            style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                            <InstagramIcon />
                            @madnessexpeditions
                        </a>
                    </div>
                </div>

                {/* ── Mobile: columna única ── */}
                <div className="lg:hidden">
                    {/* Logo */}
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden">
                                <Image src="/logo-v4.png" alt="Madness Expeditions" width={36} height={36} className="object-cover" />
                            </div>
                            <div className="text-left leading-tight">
                                <div className="font-black uppercase tracking-wider text-xs text-white">
                                    The Madness Expeditions
                                </div>
                                <div className="font-light tracking-widest text-xs uppercase opacity-60 text-white">
                                    Argentina
                                </div>
                            </div>
                        </div>
                        <p className="text-xs leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Responsabilidad, Seguridad, Servicio, Compromiso y Garantía en todas nuestras
                            Expediciones &amp; Ascensos
                        </p>
                    </div>

                    {/* Links nav — grid 2 cols */}
                    <nav className="grid grid-cols-2 gap-2 mb-6 text-sm">
                        {[
                            { href: "/", label: "Inicio" },
                            { href: "/viajes", label: "Viajes" },
                            { href: "/equipo", label: "El equipo" },
                            { href: "/como-trabajamos", label: "Cómo trabajamos" },
                            { href: "/contacto", label: "Contacto" },
                        ].map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="py-2 px-3 rounded-lg transition-colors"
                                style={{ color: "rgba(255,255,255,0.65)" }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Social */}
                    <div className="flex justify-center gap-4 mb-6">
                        <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm font-medium"
                            style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                            <InstagramIcon />
                            @madnessexpeditions
                        </a>
                    </div>

                    {/* Badges */}
                    <div className="flex justify-center gap-3 mb-5">
                        <Badge label="ANSILTA" />
                        <Badge label="PAX Assistance" />
                    </div>
                </div>

                {/* ── Copyright — compartido ── */}
                <div
                    className="border-t pt-6 text-center"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                        © {siteConfig.foundedYear} Madness Expeditions · {siteConfig.country}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.15)" }}>
                        Diseño y desarrollo:{" "}
                        <a
                            href="mailto:rivadeneiraie@gmail.com"
                            className="hover:opacity-60 transition-opacity"
                            style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                            rivadeneiraie@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

/* ── Sub-componentes ── */

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="text-sm hover:text-white transition-colors"
            style={{ color: "rgba(255,255,255,0.6)" }}
        >
            {label}
        </Link>
    );
}

function Badge({ label }: { label: string }) {
    return (
        <span
            className="text-xs px-2.5 py-1 rounded-full border"
            style={{ borderColor: "rgba(26,58,92,0.6)", color: "rgba(255,255,255,0.35)" }}
        >
            {label}
        </span>
    );
}

function WhatsAppIconSmall() {
    return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#4ade80">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.097 1.508 5.817L.057 23.886l6.219-1.427A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.029 21.818a9.946 9.946 0 01-5.064-1.379l-.363-.215-3.763.863.943-3.653-.237-.375A9.932 9.932 0 012.09 12c0-5.478 4.461-9.939 9.939-9.939 5.478 0 9.939 4.461 9.939 9.939 0 5.478-4.461 9.818-9.939 9.818z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
    );
}
