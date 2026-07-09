import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");

const projectName =
  process.env.CLOUDFLARE_PAGES_PROJECT_NAME ||
  process.env.CF_PAGES_PROJECT_NAME ||
  process.env.CLOUDFLARE_PROJECT_NAME;

if (!projectName) {
  console.error(
    "Missing CLOUDFLARE_PAGES_PROJECT_NAME. Set it before running the Cloudflare Pages deploy."
  );
  process.exit(1);
}

const branch =
  process.env.CF_PAGES_BRANCH ||
  process.env.CLOUDFLARE_BRANCH ||
  process.env.BRANCH ||
  process.env.GIT_BRANCH ||
  "main";

const distDir = resolve(repoRoot, "apps/medical-web/dist");
const args = [
  "wrangler",
  "pages",
  "deploy",
  distDir,
  "--project-name",
  projectName,
  "--branch",
  branch
];

if (process.env.CF_PAGES_COMMIT_SHA || process.env.COMMIT_SHA || process.env.GITHUB_SHA) {
  args.push(
    "--commit-hash",
    process.env.CF_PAGES_COMMIT_SHA || process.env.COMMIT_SHA || process.env.GITHUB_SHA
  );
}

if (process.env.CF_PAGES_COMMIT_MESSAGE || process.env.COMMIT_MESSAGE || process.env.GITHUB_COMMIT_MESSAGE) {
  args.push(
    "--commit-message",
    process.env.CF_PAGES_COMMIT_MESSAGE ||
      process.env.COMMIT_MESSAGE ||
      process.env.GITHUB_COMMIT_MESSAGE
  );
}

if (process.argv.includes("--print")) {
  console.log(`npx ${args.join(" ")}`);
  process.exit(0);
}

const result = spawnSync("npx", args, {
  stdio: "inherit",
  shell: true
});

process.exit(result.status ?? 1);
