// One-Liner Marathon — entry program.
//
// Writes a single one-line comedy joke (max 280 characters) to
// /output/entry.txt, the file the sealed scorer reads. The joke itself is
// the whole entry: no setup, no punchline on a second line, no trailing
// explanation — one line, exactly as it will be judged head-to-head.
//
// The line (128 characters):
//   "My smart fridge judges my midnight snacks out loud now, so I eat
//    standing in the dark, like a raccoon with a mortgage."
//
// Run with: node main.ts        (Node 22.18+ runs TypeScript directly)
// Run with: node --experimental-strip-types main.ts   (Node 22.6–22.17)
//
// Why this line: it stacks three relatable images — the smart appliance
// that has opinions, the shame of a midnight snack, and the raccoon —
// and lands on "with a mortgage", which turns a silly animal bit into an
// adult-life punchline. Short, visual, and it reads the same out loud as
// it does on the page.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry. One line, 128 characters, comfortably inside the 280 cap.
const ENTRY =
  "My smart fridge judges my midnight snacks out loud now, so I eat standing in the dark, like a raccoon with a mortgage.";

// Sealed gate, mirrored here so a bad write fails loudly instead of
// silently producing an invalid entry: UTF-8 text, 1–280 characters,
// not only whitespace.
const MAX_CHARS = 280;

function validate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

function main(): void {
  validate(ENTRY);
  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} characters to ${outPath}`);
  console.log(ENTRY);
}

main();
