import { waLink } from "@/lib/config";

export default function FinalCTA() {
    return (
        <section
            className="border-t"
            style={{ background: "#0D1B2A", borderColor: "rgba(26,58,92,0.3)" }}
        >
            <div className="max-w-3xl mx-auto px-5 lg:px-8 py-12 lg:py-20 text-center">
                <p className="text-xs font-bold uppercase tracking-widest mb-3 lg:mb-4" style={{ color: "#E63030" }}>
                    ¿Lista para empezar?
                </p>
                <h2 className="text-2xl lg:text-5xl font-black leading-tight mb-3 lg:mb-4 text-white">
                    Tu primera cumbre<br />empieza con una pregunta
                </h2>
                <p
                    className="text-sm lg:text-lg leading-relaxed mb-7 lg:mb-10"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                >
                    Escribile a Pablo. Te responde él mismo, el mismo día.{" "}
                    <br className="hidden lg:block" />
                    Sin formularios, sin esperas, sin compromiso
                </p>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4">
                    {/* WhatsApp CTA principal */}
                    <a
                        href={waLink("finalCta")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 w-full lg:w-auto bg-green-500 hover:bg-green-600 text-white font-bold text-base px-8 py-4 rounded-xl transition-colors active:opacity-80"
                    >
                        <WhatsAppIcon />
                        Escribile a Pablo por WhatsApp
                    </a>

                    {/* Alternativa formulario */}
                    <a
                        href="/contacto"
                        className="text-sm font-medium transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                        O usá el formulario de contacto →
                    </a>
                </div>
            </div>
        </section>
    );
}

function WhatsAppIcon() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.097 1.508 5.817L.057 23.886l6.219-1.427A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.029 21.818a9.946 9.946 0 01-5.064-1.379l-.363-.215-3.763.863.943-3.653-.237-.375A9.932 9.932 0 012.09 12c0-5.478 4.461-9.939 9.939-9.939 5.478 0 9.939 4.461 9.939 9.939 0 5.478-4.461 9.818-9.939 9.818z" />
        </svg>
    );
}
