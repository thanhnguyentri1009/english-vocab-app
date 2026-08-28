import type { ExerciseCategory } from "../types";
import { TENSE_QUESTIONS } from "./tenses";
import { CONDITIONAL_QUESTIONS } from "./conditionals";
import { PASSIVE_QUESTIONS } from "./passive";
import { ARTICLE_QUESTIONS } from "./articles";

const TENSES: ExerciseCategory = {
  key: "tenses",
  title: "Thì động từ",
  subtitle: "Tenses",
  color: "#eef4fb",
  accent: "#4a90d9",
  questions: TENSE_QUESTIONS,
};

const CONDITIONALS: ExerciseCategory = {
  key: "conditionals",
  title: "Câu điều kiện",
  subtitle: "Conditionals",
  color: "#fef6ee",
  accent: "#e07b39",
  questions: CONDITIONAL_QUESTIONS,
};

const PASSIVE: ExerciseCategory = {
  key: "passive",
  title: "Câu bị động",
  subtitle: "Passive Voice",
  color: "#f0faf0",
  accent: "#3a9a5c",
  questions: PASSIVE_QUESTIONS,
};

const ARTICLES_PREPOSITIONS: ExerciseCategory = {
  key: "articles",
  title: "Mạo từ & Giới từ",
  subtitle: "Articles & Prepositions",
  color: "#f5f0fb",
  accent: "#7b5ea7",
  questions: ARTICLE_QUESTIONS,
};

export const GRAMMAR_CATEGORIES: ExerciseCategory[] = [
  TENSES,
  CONDITIONALS,
  PASSIVE,
  ARTICLES_PREPOSITIONS,
];
