import { permanentRedirect } from "next/navigation";

/** Old URL: portfolio now lives at `/` (Dawn). */
export default function LightLegacyRedirect() {
  permanentRedirect("/");
}
