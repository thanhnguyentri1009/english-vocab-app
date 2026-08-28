export interface ExerciseQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExerciseCategory {
  key: string;
  title: string;
  subtitle: string;
  color: string;
  accent: string;
  questions: ExerciseQuestion[];
}
