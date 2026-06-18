import { defineType, defineField, defineArrayMember } from "sanity";

export const tripSchema = defineType({
    name: "trip",
    title: "Viaje",
    type: "document",
    fields: [
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            description: "Identificador único de la URL (ej: cordon-del-plata-iniciacion)",
            validation: (Rule) => Rule.required(),
            options: { source: "name" },
        }),
        defineField({
            name: "name",
            title: "Nombre",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "location",
            title: "Ubicación",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "region",
            title: "Región",
            type: "string",
            description: "Ej: Andes Centrales, Internacional, Patagonia",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "altitude",
            title: "Altitud (texto)",
            type: "string",
            description: "Ej: 4.000 msnm",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "altitudeValue",
            title: "Altitud (número)",
            type: "string",
            description: "Solo el número para mostrar en stats, ej: 4.000",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "days",
            title: "Días",
            type: "number",
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "maxPersons",
            title: "Máximo de personas",
            type: "number",
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "level",
            title: "Nivel",
            type: "string",
            options: {
                list: [
                    { title: "Principiante", value: "Principiante" },
                    { title: "Intermedio", value: "Intermedio" },
                    { title: "Avanzado", value: "Avanzado" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "difficulty",
            title: "Dificultad (1–5)",
            type: "number",
            validation: (Rule) => Rule.required().min(1).max(5),
        }),
        defineField({
            name: "imageSrc",
            title: "Imagen principal",
            type: "string",
            description: "Path relativo en /public, ej: /photos/cordondelplata.jpg",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "images",
            title: "Galería de imágenes",
            type: "array",
            of: [defineArrayMember({ type: "string" })],
            description: "Paths relativos en /public para la galería",
        }),
        defineField({
            name: "description",
            title: "Descripción",
            type: "array",
            of: [defineArrayMember({ type: "string" })],
            description: "Uno o más párrafos de descripción",
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "includes",
            title: "Qué incluye",
            type: "array",
            of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
            name: "notIncludes",
            title: "Qué no incluye",
            type: "array",
            of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
            name: "itinerary",
            title: "Itinerario",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "day", title: "Día", type: "number" }),
                        defineField({ name: "title", title: "Título", type: "string" }),
                        defineField({ name: "summary", title: "Resumen corto", type: "string" }),
                        defineField({ name: "detail", title: "Detalle", type: "text" }),
                    ],
                    preview: {
                        select: { title: "title", subtitle: "summary" },
                    },
                }),
            ],
        }),
        defineField({
            name: "dates",
            title: "Fechas de salida",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "date", title: "Fecha (texto)", type: "string", description: "Ej: 23–25 de mayo 2026" }),
                        defineField({
                            name: "spots",
                            title: "Lugares disponibles",
                            type: "string",
                            description: "Número de lugares o 'completo'",
                        }),
                    ],
                    preview: {
                        select: { title: "date", subtitle: "spots" },
                    },
                }),
            ],
        }),
        defineField({
            name: "testimonials",
            title: "Testimonios",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "initials", title: "Iniciales", type: "string" }),
                        defineField({ name: "name", title: "Nombre", type: "string" }),
                        defineField({ name: "text", title: "Texto", type: "text" }),
                        defineField({ name: "avatarColor", title: "Color avatar (hex)", type: "string" }),
                    ],
                    preview: {
                        select: { title: "name", subtitle: "text" },
                    },
                }),
            ],
        }),
        defineField({
            name: "cardNote",
            title: "Nota de card",
            type: "string",
            description: "Nota editorial opcional para las cards, ej: '4 cumbres · Vacaciones invierno'",
        }),
    ],
    preview: {
        select: { title: "name", subtitle: "location" },
    },
    orderings: [
        {
            title: "Por nivel (Principiante → Avanzado)",
            name: "levelAsc",
            by: [{ field: "level", direction: "asc" }],
        },
    ],
});
