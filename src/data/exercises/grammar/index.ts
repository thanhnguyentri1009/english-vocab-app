import type { ExerciseCategory } from "../types";
import { seededShuffle } from "../shuffle";
import { TENSE_QUESTIONS } from "./tenses";
import { CONDITIONAL_QUESTIONS } from "./conditionals";
import { PASSIVE_QUESTIONS } from "./passive";
import { ARTICLE_QUESTIONS } from "./articles";

const GRAMMAR_MIXED: ExerciseCategory = {
  key: "grammar-mixed",
  title: "Grammar",
  subtitle: "Thì, câu điều kiện, câu bị động & mạo từ trộn lẫn",
  color: "#eef4fb",
  accent: "#4a90d9",
  questions: seededShuffle(
    [...TENSE_QUESTIONS, ...CONDITIONAL_QUESTIONS, ...PASSIVE_QUESTIONS, ...ARTICLE_QUESTIONS],
    20240502
  ),
};

export const GRAMMAR_CATEGORIES: ExerciseCategory[] = [GRAMMAR_MIXED];
