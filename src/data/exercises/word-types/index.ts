import type { ExerciseCategory } from "../types";
import { NOUN_QUESTIONS } from "./nouns";
import { VERB_QUESTIONS } from "./verbs";
import { ADJECTIVE_QUESTIONS } from "./adjectives";
import { ADVERB_QUESTIONS } from "./adverbs";

const NOUNS: ExerciseCategory = {
  key: "nouns",
  title: "Danh từ",
  subtitle: "Nouns",
  color: "#eef4fb",
  accent: "#4a90d9",
  questions: NOUN_QUESTIONS,
};

const VERBS: ExerciseCategory = {
  key: "verbs",
  title: "Động từ",
  subtitle: "Verbs",
  color: "#fef6ee",
  accent: "#e07b39",
  questions: VERB_QUESTIONS,
};

const ADJECTIVES: ExerciseCategory = {
  key: "adjectives",
  title: "Tính từ",
  subtitle: "Adjectives",
  color: "#f0faf0",
  accent: "#3a9a5c",
  questions: ADJECTIVE_QUESTIONS,
};

const ADVERBS: ExerciseCategory = {
  key: "adverbs",
  title: "Trạng từ",
  subtitle: "Adverbs",
  color: "#f5f0fb",
  accent: "#7b5ea7",
  questions: ADVERB_QUESTIONS,
};

export const WORD_TYPE_CATEGORIES: ExerciseCategory[] = [
  NOUNS,
  VERBS,
  ADJECTIVES,
  ADVERBS,
];
