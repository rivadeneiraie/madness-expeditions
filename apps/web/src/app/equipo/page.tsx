import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/layout/FloatingWhatsAppButton";
import EquipoPage from "@/components/views/EquipoPage";

export const metadata = {
    title: "El Equipo — Madness Expeditions",
    description:
        "Guías certificados por EPGAMT con más de 15 años de experiencia en alta montaña argentina e internacional. Conocé al equipo detrás de Madness Expeditions.",
};

export default function EquipoRoute() {
    return (
        <>
            <Navbar />
            <main>
                <EquipoPage />
            </main>
            <Footer />
            <FloatingWhatsAppButton />
        </>
    );
}
