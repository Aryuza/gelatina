import { supabase } from "@/lib/supabase";
import type { QuizAnswers, BMIResult } from "@/store/types";

export interface QuizEntry {
  id: string;
  timestamp: string;
  answers: QuizAnswers;
  bmiResult: BMIResult | null;
}

export async function appendQuizEntry(answers: QuizAnswers, bmiResult: BMIResult | null): Promise<QuizEntry> {
  const entry = {
    id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    answers,
    bmi_result: bmiResult,
  };

  const { error } = await supabase.from("quiz_entries").insert(entry);
  if (error) {
    console.error("Failed to insert quiz entry:", error);
    throw error;
  }

  return { id: entry.id, timestamp: entry.timestamp, answers, bmiResult };
}

export async function getQuizEntries(): Promise<QuizEntry[]> {
  const { data, error } = await supabase
    .from("quiz_entries")
    .select("*")
    .order("timestamp", { ascending: true });

  if (error) {
    console.error("Failed to fetch quiz entries:", error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    timestamp: row.timestamp,
    answers: row.answers,
    bmiResult: row.bmi_result,
  }));
}
