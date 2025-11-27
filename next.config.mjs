import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  turbopack: {
    // Force Turbopack to treat this directory as the workspace root to
    // avoid warnings when other lockfiles exist elsewhere on the machine.
    root: dirname,
  },
};

export default nextConfig;
