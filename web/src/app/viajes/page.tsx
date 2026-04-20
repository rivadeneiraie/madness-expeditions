import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import CatalogoViajes from "@/components/CatalogoViajes";

export const metadata = {
    title: "Viajes — Madness Expeditions",
    description: "Catálogo completo de expediciones y ascensos guiados en Argentina. Todos los niveles, con guía incluido.",
};

export default function ViajesPage() {
    return (
        <>
            <Navbar />
            <main>
                <CatalogoViajes />
            </main>
            <Footer />
            <FloatingWhatsAppButton />
        </>
    );
}
