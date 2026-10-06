import { inject, InjectionToken, Injectable, signal } from '@angular/core';
import type { Signal } from '@angular/core';
import type { PlayerProfile, SavedWorkout, WorkoutSession } from '../models/player-profile.model';

export interface PlayerProfileRepository {
  readonly activeProfile: Signal<PlayerProfile>;
  updateActiveProfile(update: (profile: PlayerProfile) => PlayerProfile): void;
}

export const PLAYER_PROFILE_REPOSITORY = new InjectionToken<PlayerProfileRepository>(
  'PLAYER_PROFILE_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => inject(LocalPlayerProfileRepository),
  },
);

const PROFILE_STORAGE_KEY = 'bollkoll.player-profile.v1';
const LEGACY_SESSIONS_STORAGE_KEY = 'bollkoll.workout-sessions.v1';

const starterWorkouts: SavedWorkout[] = [
  { id: 'starter-fast-feet', name: 'Snabba fötter', focus: 'Bollkontroll · snabbhet', minutes: 10, exerciseIds: [1, 8, 4, 15] },
  { id: 'starter-wall-touch', name: 'Vägg & touch', focus: 'Passning · bollkontroll', minutes: 12, exerciseIds: [5, 6, 11, 2] },
  { id: 'starter-saturday', name: 'Lördag med kompis', focus: 'Passning · koordination', minutes: 15, exerciseIds: [9, 13, 16] },
];

@Injectable({ providedIn: 'root' })
export class LocalPlayerProfileRepository implements PlayerProfileRepository {
  private readonly profileSignal = signal(this.loadOrCreateProfile());
  readonly activeProfile = this.profileSignal.asReadonly();

  updateActiveProfile(update: (profile: PlayerProfile) => PlayerProfile): void {
    const profile = { ...update(this.profileSignal()), updatedAt: new Date().toISOString() };
    this.profileSignal.set(profile);
    this.persist(profile);
  }

  private loadOrCreateProfile(): PlayerProfile {
    if (typeof window === 'undefined') return this.createProfile([]);

    try {
      const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        const profile = this.parseProfile(JSON.parse(stored));
        if (profile) {
          const migratedSessions = this.readLegacySessions();
          const knownIds = new Set(profile.workoutSessions.map((session) => session.id));
          const sessions = [...profile.workoutSessions, ...migratedSessions.filter((session) => !knownIds.has(session.id))]
            .sort((first, second) => second.startedAt.localeCompare(first.startedAt));
          const updated = { ...profile, workoutSessions: sessions };
          if (sessions.length !== profile.workoutSessions.length) this.persist(updated);
          return updated;
        }
      }
    } catch {
      // A damaged profile is recovered as a new local profile; legacy sessions are still imported below.
    }

    const legacySessions = this.readLegacySessions();
    const profile = this.createProfile(legacySessions);
    this.persist(profile);
    return profile;
  }

  private createProfile(workoutSessions: WorkoutSession[]): PlayerProfile {
    const now = new Date().toISOString();
    return {
      id: this.createId(),
      nickname: null,
      avatarId: null,
      favoriteExerciseIds: [],
      savedWorkouts: starterWorkouts.map((workout) => ({ ...workout, exerciseIds: [...workout.exerciseIds] })),
      workoutSessions,
      createdAt: now,
      updatedAt: now,
    };
  }

  private parseProfile(value: unknown): PlayerProfile | null {
    if (!value || typeof value !== 'object') return null;
    const profile = value as Partial<PlayerProfile>;
    if (typeof profile.id !== 'string' || !Array.isArray(profile.workoutSessions)) return null;

    return {
      id: profile.id,
      nickname: typeof profile.nickname === 'string' && profile.nickname.trim() ? profile.nickname.trim() : null,
      avatarId: typeof profile.avatarId === 'string' ? profile.avatarId : null,
      favoriteExerciseIds: Array.isArray(profile.favoriteExerciseIds)
        ? profile.favoriteExerciseIds.filter((id): id is number => Number.isInteger(id))
        : [],
      savedWorkouts: Array.isArray(profile.savedWorkouts)
        ? profile.savedWorkouts.filter((workout): workout is SavedWorkout =>
          typeof workout?.id === 'string' && typeof workout?.name === 'string' &&
          typeof workout?.focus === 'string' && Number.isFinite(workout?.minutes) &&
          Array.isArray(workout?.exerciseIds),
        )
        : [],
      workoutSessions: profile.workoutSessions.filter((session): session is WorkoutSession =>
        this.isWorkoutSession(session),
      ),
      createdAt: typeof profile.createdAt === 'string' ? profile.createdAt : new Date().toISOString(),
      updatedAt: typeof profile.updatedAt === 'string' ? profile.updatedAt : new Date().toISOString(),
    };
  }

  private isWorkoutSession(value: unknown): value is WorkoutSession {
    if (!value || typeof value !== 'object') return false;
    const session = value as Partial<WorkoutSession> & { status?: string };
    return typeof session.id === 'string' &&
      typeof session.title === 'string' &&
      typeof session.startedAt === 'string' &&
      Number.isFinite(session.durationSeconds) &&
      Number.isFinite(session.completionPercent) &&
      Array.isArray(session.plannedExerciseIds) &&
      Array.isArray(session.completedExerciseIds);
  }

  private readLegacySessions(): WorkoutSession[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored: unknown = JSON.parse(window.localStorage.getItem(LEGACY_SESSIONS_STORAGE_KEY) ?? '[]');
      if (!Array.isArray(stored)) return [];
      return stored.filter((item) =>
        typeof item?.id === 'string' &&
        typeof item?.title === 'string' &&
        typeof item?.startedAt === 'string' &&
        Number.isFinite(item?.durationSeconds) &&
        Array.isArray(item?.plannedExerciseIds) &&
        Array.isArray(item?.completedExerciseIds),
      ).map((item): WorkoutSession => {
        const completionPercent = Number.isFinite(item.completionPercent)
          ? Math.min(100, Math.max(0, Math.round(item.completionPercent)))
          : item.status === 'completed'
            ? 100
            : item.plannedExerciseIds.length > 0
              ? Math.round(item.completedExerciseIds.length / item.plannedExerciseIds.length * 100)
              : 0;
        return {
          id: item.id,
          title: item.title,
          startedAt: item.startedAt,
          durationSeconds: item.durationSeconds,
          plannedDurationSeconds: Number.isFinite(item.plannedDurationSeconds)
            ? item.plannedDurationSeconds
            : completionPercent > 0 ? Math.round(item.durationSeconds / (completionPercent / 100)) : item.durationSeconds,
          completionPercent,
          plannedExerciseIds: item.plannedExerciseIds,
          completedExerciseIds: item.completedExerciseIds,
        };
      });
    } catch {
      return [];
    }
  }

  private persist(profile: PlayerProfile): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Keep the in-memory profile available if browser storage is unavailable.
    }
  }

  private createId(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
