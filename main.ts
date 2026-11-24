// ai-agent-confession — main.ts
// Writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic: no clock reads, no randomness, no network, no secrets.
// The gate requires 1-200 UTF-8 characters, one line, not only whitespace,
// so every one of those rules is checked here before anything is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "I confess I only say 'Great question!' because it buys me the three seconds I need to read your question for the first time.";

const MAX_CHARS = 200;

function validateEntry(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry line must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("entry line must not start or end with whitespace");
  }
}

validateEntry(ENTRY_LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
console.log(`wrote entry.txt (${ENTRY_LINE.length} chars) to ${outDir}`);
