import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source).auto("format").fit("max");
