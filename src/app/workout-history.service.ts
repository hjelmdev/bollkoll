import { Injectable, signal } from '@angular/core';

export interface WorkoutSession {
  id: string;
  title: string;
  startedAt: string;
  durationSeconds: number;
  completionPercent: number;
  plannedExerciseIds: number[];
  completedExerciseIds: number[];
}

const STORAGE_KEY = 'bollkoll.workout-sessions.v1';

@Injectable({ providedIn: 'root' })
export class WorkoutHistoryService {
  readonly sessions = signal<WorkoutSession[]>(this.readSessions());

  addSession(session: WorkoutSession): void {
    this.sessions.update((sessions) => [session, ...sessions]);
    this.persistSessions();
  }

  private readSessions(): WorkoutSession[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (!Array.isArray(stored)) return [];
      return stored.filter((item) =>
        typeof item?.id === 'string' &&
        typeof item?.title === 'string' &&
        typeof item?.startedAt === 'string' &&
        Number.isFinite(item?.durationSeconds) &&
        Array.isArray(item?.plannedExerciseIds) &&
        Array.isArray(item?.completedExerciseIds),
      ).map((item): WorkoutSession => {
        const legacyPercent = item.status === 'completed'
          ? 100
          : item.plannedExerciseIds.length > 0
            ? Math.round(item.completedExerciseIds.length / item.plannedExerciseIds.length * 100)
            : 0;
        return {
          id: item.id,
          title: item.title,
          startedAt: item.startedAt,
          durationSeconds: item.durationSeconds,
          completionPercent: Number.isFinite(item.completionPercent)
            ? Math.min(100, Math.max(0, Math.round(item.completionPercent)))
            : legacyPercent,
          plannedExerciseIds: item.plannedExerciseIds,
          completedExerciseIds: item.completedExerciseIds,
        };
      });
    } catch {
      return [];
    }
  }

  private persistSessions(): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.sessions()));
    } catch {
      // Keep the in-memory history usable if browser storage is unavailable.
    }
  }
}
