import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "studiolingo",
  title: "Studio Lingo",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
