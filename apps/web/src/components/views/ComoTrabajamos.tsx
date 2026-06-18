import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   Datos
───────────────────────────────────────── */

const PROCESS_STEPS = [
    {
        number: 1,
        title: "Consulta inicial",
        description:
            "Hablás directamente con nuestro equipo por WhatsApp o formulario. Te hacemos las preguntas que necesitamos para entender tu nivel real, tu experiencia previa y qué objetivos tenés.",
    },
    {
        number: 2,
        title: "Evaluación y recomendación",
        description:
            "Con base en tu perfil, te decimos cuál expedición es la correcta para donde estás hoy — y cuáles son los pasos para llegar a donde querés estar. No hay venta de lo que no te corresponde.",
    },
    {
        number: 3,
        title: "Plan de preparación",
        description:
            "Recibís un plan de entrenamiento y preparación específico para la expedición elegida. Seguimos tu progreso y respondemos todas tus preguntas en el camino.",
    },
    {
        number: 4,
        title: "La expedición",
        description:
            "Grupo en el mismo nivel, con una proporción de guías que garantiza atención real a cada participante. Seguro incluido. Equipamiento técnico verificado.",
    },
];

const SERVICE_PILLARS = [
    {
        title: "Grupos por nivel",
        description:
            "Grupos con experiencia similar y suficientes guías para que nadie quede sin atención. Nunca se mezclan niveles. El ritmo es el del grupo — sin que nadie tenga que esperar ni apurarse.",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
    },
    {
        title: "Guía EPGAMT certificado",
        description:
            "Nuestros guías certificados acompañan cada expedición. Formación en primeros auxilios, rescate en montaña y meteorología de alta montaña.",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52l-5.62 3.97 2.09-6.26L3 8.26h6.91z" />
            </svg>
        ),
    },
    {
        title: "Seguro PAX incluido",
        description:
            "Seguro de accidentes y evacuación en montaña incluido en el precio. PAX Assistance cubre rescate, traslado y hospitalización.",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        title: "Logística completa",
        description:
            "Campamento base equipado, alimentación en la montaña, traslados desde el punto de encuentro. Te concentrás en subir — el resto lo resolvemos nosotros.",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
        ),
    },
    {
        title: "Equipamiento técnico",
        description:
            "Bastones, crampones, piolet y material técnico disponible en préstamo. Todo verificado antes de cada expedición. Guía de equipamiento propio disponible.",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
    },
    {
        title: "Atención directa sin intermediarios",
        description:
            "Sin intermediarios. Consultás y te respondemos. Antes, durante y después de la expedición. El mismo número, la misma empresa.",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.1 19.79 19.79 0 01.43 1.4 2 2 0 012.42 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
        ),
    },
];

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

/* ─────────────────────────────────────────
   Sub-componentes
───────────────────────────────────────── */

function StepNumber({ n }: { n: number }) {
    return (
        <div
            className="w-12 h-12 rounded-full bg-mx-red flex items-center justify-center text-xl font-black text-white shrink-0"
        >
            {n}
        </div>
    );
}

function StepConnector() {
    return (
        <div
            className="w-0.5 h-12 mx-5.75 shrink-0"
            style={{ background: "rgba(230,48,48,0.2)" }}
        />
    );
}

function PillarCard({ title, description, icon }: (typeof SERVICE_PILLARS)[number]) {
    return (
        <div
            className="rounded-2xl p-6 transition-colors"
            style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
            }}
        >
            <div className="w-11 h-11 rounded-xl bg-mx-blue flex items-center justify-center mb-4 shrink-0">
                {icon}
            </div>
            <h3 className="font-black text-base mb-2">{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                {description}
            </p>
        </div>
    );
}

/* ─────────────────────────────────────────
   Componente principal
───────────────────────────────────────── */

export default function ComoTrabajamos() {
    return (
        <div style={{ background: "#0D1B2A", minHeight: "100vh" }}>

            {/* ── Hero ── */}
            <header className="relative py-16 lg:py-20 overflow-hidden">
                {/* Imagen de fondo */}
                <div className="absolute inset-0">
                    <Image
                        src="/photos/01.jpg"
                        alt="Madness Expeditions — briefing antes de la expedición"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Overlay mobile */}
                    <div
                        className="absolute inset-0 lg:hidden"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.85) 100%)",
                        }}
                    />
                    {/* Overlay desktop */}
                    <div
                        className="absolute inset-0 hidden lg:block"
                        style={{
                            background:
                                "linear-gradient(to right, rgba(13,27,42,0.97) 50%, rgba(13,27,42,0.45) 100%)",
                        }}
                    />
                </div>

                <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3 text-mx-red">
                        Metodología
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-black leading-none mb-4">
                        Cómo trabajamos
                    </h1>
                    <p
                        className="text-base lg:text-lg max-w-xl leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                        Cada expedición empieza mucho antes del primer paso en la montaña. Así
                        trabajamos con cada persona.
                    </p>
                </div>
            </header>

            {/* ── Modelo de Progresión ── */}
            <section className="max-w-6xl mx-auto px-5 lg:px-8 py-14 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Columna izquierda: intro */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-3 text-mx-red">
                            El proceso
                        </p>
                        <h2 className="text-2xl lg:text-3xl font-black leading-tight mb-5">
                            Un plan personalizado<br />antes de salir
                        </h2>
                        <p
                            className="text-base leading-relaxed mb-5"
                            style={{ color: "rgba(255,255,255,0.75)" }}
                        >
                            No armamos grupos al azar. Cada persona tiene una evaluación inicial, un plan de
                            preparación acorde a su nivel, y un seguimiento real antes de la expedición.
                        </p>
                        <p
                            className="text-base leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.75)" }}
                        >
                            Esto es lo que garantiza que los grupos sean homogéneos en nivel — y que nadie llegue
                            a la montaña sin estar listo.
                        </p>
                    </div>

                    {/* Columna derecha: pasos del proceso */}
                    <div className="flex flex-col">
                        {PROCESS_STEPS.map((step, idx) => (
                            <div key={step.number}>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <StepNumber n={step.number} />
                                        {idx < PROCESS_STEPS.length - 1 && <StepConnector />}
                                    </div>
                                    <div className={idx < PROCESS_STEPS.length - 1 ? "pb-8" : ""}>
                                        <h3 className="font-black text-lg mb-1">{step.title}</h3>
                                        <p
                                            className="text-sm leading-relaxed"
                                            style={{ color: "rgba(255,255,255,0.65)" }}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Pilares del Servicio ── */}
            <section
                className="border-t py-14 lg:py-16"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
                <div className="max-w-6xl mx-auto px-5 lg:px-8">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2 text-mx-red">
                        Cómo operamos
                    </p>
                    <h2 className="text-2xl lg:text-3xl font-black mb-10">
                        Lo que incluye cada expedición
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {SERVICE_PILLARS.map((pillar) => (
                            <PillarCard key={pillar.title} {...pillar} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Final / Contacto ── */}
            <section
                id="contacto"
                className="border-t py-14 lg:py-16"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
                <div className="max-w-6xl mx-auto px-5 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Izquierda: WhatsApp principal */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-3 text-mx-red">
                                ¿Listo para consultar?
                            </p>
                            <h2 className="text-2xl lg:text-3xl font-black leading-tight mb-5">
                                Consultános.<br />Te respondemos.
                            </h2>
                            <p
                                className="text-base leading-relaxed mb-8"
                                style={{ color: "rgba(255,255,255,0.7)" }}
                            >
                                Con toda la información que tenés, podemos orientarte en minutos. Sin
                                formularios genéricos, sin esperar respuesta de un equipo de ventas. Una
                                conversación directa.
                            </p>

                            <Link
                                href="https://wa.me/54XXXXXXXXXX?text=Hola%21%20Vi%20c%C3%B3mo%20trabaja%20Madness%20Expeditions%20y%20quiero%20consultar%20sobre%20una%20expedici%C3%B3n"
                                className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold text-base py-4 px-6 rounded-xl transition-colors mb-3"
                            >
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.097 1.508 5.817L.057 23.886l6.219-1.427A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.029 21.818a9.946 9.946 0 01-5.064-1.379l-.363-.215-3.763.863.943-3.653-.237-.375A9.932 9.932 0 012.09 12c0-5.478 4.461-9.939 9.939-9.939 5.478 0 9.939 4.461 9.939 9.939 0 5.478-4.461 9.818-9.939 9.818z" />
                                </svg>
                                Escribinos por WhatsApp
                            </Link>

                            <p className="text-sm text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
                                Responde el mismo día, en horario de Argentina
                            </p>
                        </div>

                        {/* Derecha: formulario alternativo */}
                        <div>
                            <h3
                                className="text-base font-black mb-5"
                                style={{ color: "rgba(255,255,255,0.7)" }}
                            >
                                O completá el formulario
                            </h3>
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
                                        rows={4}
                                        placeholder="Contános tu experiencia previa y lo que querés consultar…"
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
                </div>
            </section>
        </div>
    );
}
