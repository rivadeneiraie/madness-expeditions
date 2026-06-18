import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/layout/FloatingWhatsAppButton";
import ComoTrabajamos from "@/components/views/ComoTrabajamos";

export const metadata = {
    title: "Cómo Trabajamos — Madness Expeditions",
    description:
        "El modelo de progresión personalizada de Madness Expeditions: evaluación inicial, plan de preparación y grupos por nivel. Así funcionamos.",
};

export default function ComoTrabajamosRoute() {
    return (
        <>
            <Navbar />
            <main>
                <ComoTrabajamos />
            </main>
            <Footer />
            <FloatingWhatsAppButton />
        </>
    );
}
