import TestimonialCard, { type TestimonialProps } from "../ui/TestimonialCard";

const TESTIMONIALS: TestimonialProps[] = [
    {
        initials: "M",
        name: "María G.",
        text: "Nunca había hecho senderismo de verdad. Pablo fue súper paciente y nos preparó de a poco. La montaña me cambió. Ya estoy planeando el próximo viaje.",
        trip: "Cerro Catedral",
        date: "febrero 2025",
        avatarColor: "#1a3a5c",
    },
    {
        initials: "L",
        name: "Luciana P.",
        text: "Tenía mucho miedo de no dar el nivel. Pablo me dijo 'preparate bien y listo'. Cumbre del Lanín a los 41 años. Lloré arriba. No me lo olvido más.",
        trip: "Volcán Lanín",
        date: "enero 2025",
        avatarColor: "#E63030",
    },
    {
        initials: "R",
        name: "Rodrigo A.",
        text: "La organización es impecable. Equipamiento revisado, seguros en orden, y Pablo respondía todos los mensajes. Saben lo que hacen.",
        trip: "Aconcagua",
        date: "diciembre 2024",
        avatarColor: "#1a3a5c",
    },
];

export default function TestimonialsSection() {
    return (
        <section
            className="border-t"
            style={{
                borderColor: "rgba(255,255,255,0.05)",
                backgroundImage:
                    "linear-gradient(rgba(13,27,42,0.94), rgba(13,27,42,0.94)), url('/photos/28.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10 lg:py-16">

                {/* Header — mobile: stack · desktop: flex espacio entre */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 lg:mb-10 gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#E63030" }}>
                            Lo que dicen
                        </p>
                        <h2 className="text-2xl lg:text-4xl font-black leading-tight text-white">
                            Personas que también<br className="hidden lg:block" /> empezaron de cero
                        </h2>
                    </div>

                    {/* Google Reviews badge — desktop: header derecho · mobile: debajo de cards */}
                    <div
                        className="hidden lg:flex items-center gap-3 px-5 py-3 rounded-xl"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <GoogleIcon />
                        <div>
                            <div className="text-lg font-black text-white">4.9 / 5</div>
                            <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                                Google Reviews
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards — mobile: columna · desktop: 3 cols */}
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
                    {TESTIMONIALS.map((t) => (
                        <TestimonialCard key={t.name} {...t} />
                    ))}
                </div>

                {/* Google Reviews badge — solo mobile */}
                <div className="lg:hidden mt-6 flex items-center justify-center gap-2">
                    <GoogleIcon />
                    <span className="text-sm font-semibold text-white">4.9 / 5</span>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                        en Google Reviews
                    </span>
                </div>

            </div>
        </section>
    );
}

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}
