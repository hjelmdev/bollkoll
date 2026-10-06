import { Component, computed, input, output } from '@angular/core';
import type { Exercise } from '../models/exercise.model';
import type { WorkoutSession } from '../models/player-profile.model';

@Component({
  selector: 'app-workout-feedback',
  templateUrl: './workout-feedback.html',
  styleUrl: './workout-feedback.scss',
})
export class WorkoutFeedback {
  readonly session = input.required<WorkoutSession>();
  readonly exercises = input<Exercise[]>([]);
  readonly nickname = input<string | null>(null);
  readonly closed = output<void>();
  readonly profileRequested = output<void>();
  readonly exerciseSummary = computed(() => {
    const session = this.session();
    const exercises = this.exercises();
    return session.plannedExerciseIds.map((id, index) => {
      const exercise = exercises.find((item) => item.id === id);
      const completed = session.completedExerciseIds.includes(id);
      const elapsedSeconds = session.exerciseElapsedSeconds?.[index]
        ?? (completed ? exercise?.durationSeconds ?? 0 : 0);
      return {
        id: `${id}-${index}`,
        name: exercise?.name ?? `Övning ${index + 1}`,
        focus: exercise?.focusAreas[0] ?? 'Övning',
        elapsedSeconds,
        status: completed ? 'Klar' : elapsedSeconds > 0 ? 'Påbörjad' : 'Inte körd',
      };
    });
  });

  formatDuration(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes === 0) return `${seconds} sek`;
    return seconds === 0 ? `${minutes} min` : `${minutes} min ${seconds} sek`;
  }
}
