// The Vacuum's Alibi — make.fun bounty
// u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7
//
// One line, at most 200 characters: the robot vacuum's alibi for
// why it skipped one spot. Deterministic: the same line, byte for
// byte, on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The alibi, built from its beats:
// - the sensor: a cliff sensor, the machine's own hardware, slightly
//   smug about what it detected;
// - the misread: a crumb pile classified as a staircase — a specific,
//   unexpected turn, not a stock appliance joke;
// - the punch: it reversed and filed a hazard report instead of
//   cleaning, bureaucratic to the end. The causal chain is the excuse:
//   the spot was skipped because the machine treated it as a danger.
const BEATS = [
  "My cliff sensor classified that crumb pile as a staircase,",
  "so I reversed and filed a hazard report.",
] as const;

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function buildLine(): string {
  return BEATS.join(" ");
}

function validateLine(line: string): void {
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (line.includes("\n") || line.trim().length === 0) {
    throw new Error("line must be a single non-blank line");
  }
}

function writeEntry(line: string): void {
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, line, "utf8");
}

const LINE = buildLine();
validateLine(LINE);
writeEntry(LINE);

// No trailing newline: the gate counts every character, and the file
// must hold exactly the line — nothing before it, nothing after it.
console.log(`wrote ${LINE.length} chars to ${OUT_PATH}`);
