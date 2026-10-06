import { Component, input, output } from '@angular/core';
import type { WorkoutSession } from '../models/player-profile.model';

@Component({
  selector: 'app-workout-feedback',
  templateUrl: './workout-feedback.html',
  styleUrl: './workout-feedback.scss',
})
export class WorkoutFeedback {
  readonly session = input.required<WorkoutSession>();
  readonly nickname = input<string | null>(null);
  readonly closed = output<void>();
  readonly profileRequested = output<void>();

  formatDuration(totalSeconds: number): string {
    return totalSeconds < 60
      ? `${totalSeconds} sek tränat`
      : `${Math.round(totalSeconds / 60)} min tränat`;
  }
}
