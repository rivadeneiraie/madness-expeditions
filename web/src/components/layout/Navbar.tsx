"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Viajes", href: "/viajes" },
    { label: "El equipo", href: "/equipo" },
    { label: "Cómo trabajamos", href: "/como-trabajamos" },
    { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav
            className="sticky top-0 z-50 border-b"
            style={{
                background: "rgba(13,27,42,0.97)",
                backdropFilter: "blur(8px)",
                borderColor: "rgba(255,255,255,0.07)",
            }}
        >
            {/* ── Desktop layout ── */}
            <div className="max-w-7xl mx-auto px-8 hidden xl:flex items-center justify-between h-16">
                {/* Logo — ancla a la izquierda */}
                <Link href="/" className="flex items-center gap-3 shrink-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                        <Image
                            src="/logo-v4.png"
                            alt="Madness Expeditions"
                            width={80}
                            height={80}
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="leading-tight">
                        <div className="font-black text-xs uppercase tracking-wider text-white">
                            The Madness Expeditions
                        </div>
                        <div className="text-xs uppercase tracking-widest opacity-50 text-white">
                            Argentina
                        </div>
                    </div>
                </Link>

                {/* Links — ancla a la derecha */}
                <div className="flex items-center gap-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative text-sm font-medium transition-colors hover:text-white whitespace-nowrap after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-mx-red after:transition-all after:duration-300 hover:after:w-full"
                            style={{ color: "rgba(255,255,255,0.65)" }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* ── Mobile layout ── */}
            <div className="flex xl:hidden items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                        <Image
                            src="/logo-v4.png"
                            alt="Madness Expeditions"
                            width={48}
                            height={48}
                            className="object-cover"
                        />
                    </div>
                    <div className="leading-tight">
                        <div className="text-white font-black tracking-wider text-xs uppercase">
                            The Madness
                        </div>
                        <div className="text-white font-light tracking-widest text-xs uppercase opacity-80">
                            Expeditions
                        </div>
                    </div>
                </Link>

                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="flex flex-col gap-1.5 p-1"
                    aria-label="Menú"
                    aria-expanded={menuOpen}
                >
                    <span className="block w-5 h-0.5 bg-white" />
                    <span className="block w-5 h-0.5 bg-white" />
                    <span className="block w-5 h-0.5 bg-white" />
                </button>
            </div>

            {/* ── Mobile menu desplegable ── */}
            {menuOpen && (
                <div
                    className="xl:hidden px-4 pb-4 flex flex-col gap-1 border-t"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="py-2.5 px-3 text-sm font-medium rounded-lg transition-colors hover:bg-white/5"
                            style={{ color: "rgba(255,255,255,0.75)" }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
