"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

// Sanity Studio is a browser-only application, so this page is a client
// component. Route metadata lives in the sibling layout.
export default function StudioPage() {
  return <NextStudio config={config} />;
}
