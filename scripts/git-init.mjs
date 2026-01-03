import { execSync } from "node:child_process";

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

try {
  run("git --version");
} catch {
  process.exitCode = 1;
  throw new Error("git não encontrado");
}

try {
  run("git rev-parse --is-inside-work-tree");
  process.exit(0);
} catch {}

run("git init");
run("git add -A");
try {
  run("git commit -m \"feat: structure project\"");
} catch {}

