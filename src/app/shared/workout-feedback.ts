import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-workout-feedback',
  templateUrl: './workout-feedback.html',
  styleUrl: './workout-feedback.scss',
})
export class WorkoutFeedback {
  readonly nickname = input<string | null>(null);
  readonly profileIsOpen = input(false);
  readonly profileRequested = output<void>();
  readonly nicknameRequested = output<void>();
}
