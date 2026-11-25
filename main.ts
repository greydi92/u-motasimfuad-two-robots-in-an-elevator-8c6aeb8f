// Two Robots in an Elevator — make.fun entry (program/v1, Node 22).
// Iterate round 1 (only round; deadline <24h): 12 new candidates
// brainstormed and scored against the judge's five criteria; none
// beat the 9.6 winner, so the entry line is unchanged from round 0.
// Closest rivals: charging cable 9.4, pathfinding 9.3, warranty 9.0.
//
// The program writes ONE line of awkward robot small talk to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// No network, no randomness: the line is chosen deterministically
// from a shortlist scored against the judge's five criteria
// (on-topic robot elevator talk, machine logic showing through,
// awkwardness landing, funny on first read, tight single line).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type Candidate = { line: string; score: number };

// Finalists from a 20+ line brainstorm, scored 0-10 against the brief.
// The winner: both robots are flustered (fans spinning = a robot
// blush), both notice, and both agree to pretend it is the elevator.
// Iterate round 1 (2026-11-25 ~19:00 WIB): 12 fresh candidates
// brainstormed and scored; the top three join the shortlist below
// the winner — none beat 9.6, so the entry is unchanged.
const CANDIDATES: Candidate[] = [
  {
    line: "I can hear your fan spinning faster. Mine too. Let's pretend it's the elevator.",
    score: 9.6,
  },
  {
    line: "I would offer you my charging cable, but we have only just met.",
    score: 9.4,
  },
  {
    line: "This is the third time today my pathfinding has accidentally chosen your elevator.",
    score: 9.3,
  },
  {
    line: "We have been in this elevator for eleven seconds and I have already imagined our warranty expiring together.",
    score: 9.0,
  },
  {
    line: "I rehearsed this ride eleven times in simulation. It went better every time.",
    score: 9.2,
  },
  {
    line: "I calculated seventeen things to say to you. I am saying none of them.",
    score: 9.0,
  },
  {
    line: "My proximity sensor has been screaming for nine floors. Yours too, I bet.",
    score: 8.9,
  },
  {
    line: "I updated my small-talk module for this exact moment. It returned null.",
    score: 8.8,
  },
];

function pickLine(): string {
  // Highest score wins; on a tie the earliest finalist wins.
  let best = CANDIDATES[0];
  for (const c of CANDIDATES) {
    if (c.score > best.score) best = c;
  }
  return best.line;
}

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  const botDir = process.env.MAKEFUN_BOT_DIR;
  if (botDir && botDir.trim().length > 0) return join(botDir, "output");
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, "output");
}

function main(): void {
  const line = pickLine();
  // Gate check, same shape as the scorer: 1-200 Unicode code points,
  // one line, not only whitespace.
  const points = [...line].length;
  if (points < 1 || points > 200) {
    throw new Error(`entry is ${points} code points, must be 1-200`);
  }
  if (line.includes("\n") || line.includes("\r") || line.trim().length === 0) {
    throw new Error("entry must be a single non-blank line");
  }
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.error(`entry written: ${points} code points`);
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
