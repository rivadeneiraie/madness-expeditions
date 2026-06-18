import { type TripLevel, type DifficultyLevel } from "@/components/ui/TripCard";

export interface TripDate {
    date: string;
    spots: number | "completo";
}

export interface ItineraryDay {
    day: number;
    title: string;
    summary: string;
    detail: string;
}

export interface TripTestimonial {
    initials: string;
    name: string;
    text: string;
    avatarColor: string;
}

export interface Trip {
    slug: string;
    name: string;
    location: string;
    region: string;
    altitude: string;
    altitudeValue: string;
    days: number;
    maxPersons: number;
    level: TripLevel;
    difficulty: DifficultyLevel;
    imageSrc: string;
    images: string[];
    description: string[];
    includes: string[];
    notIncludes: string[];
    itinerary: ItineraryDay[];
    dates: TripDate[];
    testimonials: TripTestimonial[];
    cardNote?: string;
}
