import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";

// Documents that exist exactly once (their id equals their type).
const SINGLETONS = ["homeHero", "achievementsBar", "levelTestTexts"];
const SINGLETON_TITLES: Record<string, string> = {
  homeHero: "მთავარი ბანერი",
  achievementsBar: "მიღწევების ზოლი",
  levelTestTexts: "დონის ტესტი — ტექსტები",
};

export default defineConfig({
  name: "studiolingo",
  title: "Studio Lingo",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Single-page documents can't be created again from the "+" menu.
    templates: (templates) =>
      templates.filter((t) => !SINGLETONS.includes(t.schemaType)),
  },
  document: {
    // No delete / duplicate on single-page documents.
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? actions.filter(
            ({ action }) => action !== "delete" && action !== "duplicate",
          )
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("კონტენტი")
          .items([
            ...SINGLETONS.map((type) =>
              S.listItem()
                .title(SINGLETON_TITLES[type])
                .id(type)
                .child(S.document().schemaType(type).documentId(type)),
            ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETONS.includes(item.getId() ?? ""),
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
