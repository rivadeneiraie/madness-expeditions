import { defineQuery } from "next-sanity";

const TRIP_FIELDS = `
    "slug": slug.current,
    name,
    location,
    region,
    altitude,
    altitudeValue,
    days,
    maxPersons,
    level,
    difficulty,
    imageSrc,
    images,
    description,
    includes,
    notIncludes,
    itinerary[] {
        day,
        title,
        summary,
        detail
    },
    dates[] {
        date,
        spots
    },
    testimonials[] {
        initials,
        name,
        text,
        avatarColor
    },
    cardNote
`;

export const ALL_TRIPS_QUERY = defineQuery(`
    *[_type == "trip"] | order(_createdAt asc) {
        ${TRIP_FIELDS}
    }
`);

export const TRIP_BY_SLUG_QUERY = defineQuery(`
    *[_type == "trip" && slug.current == $slug][0] {
        ${TRIP_FIELDS}
    }
`);
