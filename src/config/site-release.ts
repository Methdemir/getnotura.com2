/** Set to "public" only when Notura is ready for search indexing.
 * Legal pages remain publicly readable during preview. */
export const siteReleaseStatus: "preview" | "public" = "preview";
export const defaultRobotsPolicy =
  siteReleaseStatus === "preview" ? "noindex,follow" : "index,follow";
