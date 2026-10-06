export interface SavedWorkout {
  id: string;
  name: string;
  focus: string;
  minutes: number;
  exerciseIds: number[];
}

export interface WorkoutSession {
  id: string;
  title: string;
  startedAt: string;
  durationSeconds: number;
  plannedDurationSeconds: number;
  completionPercent: number;
  plannedExerciseIds: number[];
  completedExerciseIds: number[];
}

export interface PlayerProfile {
  id: string;
  nickname: string | null;
  avatarId: string | null;
  favoriteExerciseIds: number[];
  savedWorkouts: SavedWorkout[];
  workoutSessions: WorkoutSession[];
  firstWorkoutPromptSeen: boolean;
  createdAt: string;
  updatedAt: string;
}
