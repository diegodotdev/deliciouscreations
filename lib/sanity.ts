import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2024-09-12",
  useCdn: false,
  dataset: "production",
  token: process.env.NEXT_PUBLIC_SANITY_PROJECT_TOKEN,
});
