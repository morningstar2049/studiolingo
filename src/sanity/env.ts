// Sanity project coordinates. The project id and dataset are public values —
// they identify the dataset, they do not grant write access.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9hr5p2un";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
