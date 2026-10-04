import type { ExerciseCategory } from "../types";
import { seededShuffle } from "../shuffle";
import { NOUN_QUESTIONS } from "./nouns";
import { VERB_QUESTIONS } from "./verbs";
import { ADJECTIVE_QUESTIONS } from "./adjectives";
import { ADVERB_QUESTIONS } from "./adverbs";

const WORD_TYPES_MIXED: ExerciseCategory = {
  key: "word-types-mixed",
  title: "Word Types",
  subtitle: "Danh từ, động từ, tính từ & trạng từ trộn lẫn",
  color: "#ffffff",
  accent: "#2c4d86",
  questions: seededShuffle(
    [...NOUN_QUESTIONS, ...VERB_QUESTIONS, ...ADJECTIVE_QUESTIONS, ...ADVERB_QUESTIONS],
    20240501
  ),
};

export const WORD_TYPE_CATEGORIES: ExerciseCategory[] = [WORD_TYPES_MIXED];
