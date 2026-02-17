import fs from "fs";
import path from "path";
import type { QuizAnswers, BMIResult } from "@/store/types";

const DATA_FILE = path.join("/tmp", "quiz-data.json");
const MAX_ENTRIES = 500;

export interface QuizEntry {
  id: string;
  timestamp: string;
  answers: QuizAnswers;
  bmiResult: BMIResult | null;
}

function readEntries(): QuizEntry[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // corrupted file, start fresh
  }
  return [];
}

function writeEntries(entries: QuizEntry[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries), "utf-8");
}

export function appendQuizEntry(answers: QuizAnswers, bmiResult: BMIResult | null): QuizEntry {
  const entries = readEntries();
  const entry: QuizEntry = {
    id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    answers,
    bmiResult,
  };
  entries.push(entry);
  // FIFO: keep only the last MAX_ENTRIES
  if (entries.length > MAX_ENTRIES) {
    entries.splice(0, entries.length - MAX_ENTRIES);
  }
  writeEntries(entries);
  return entry;
}

export function getQuizEntries(): QuizEntry[] {
  return readEntries();
}
