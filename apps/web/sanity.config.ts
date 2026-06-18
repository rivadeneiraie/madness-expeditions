import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
    name: "madness-expeditions",
    title: "Madness Expeditions",
    projectId: "6zqw6gnm",
    dataset: "production",
    basePath: "/studio",
    plugins: [structureTool()],
    schema: {
        types: schemaTypes,
    },
});
