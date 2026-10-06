import { Component, computed, ElementRef, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { PLAYER_PROFILE_REPOSITORY } from './core/player-profile.repository';
import { SavedWorkout, WorkoutSession } from './models/player-profile';

type MainTab = 'home' | 'train' | 'workouts' | 'profile';

interface Exercise {
  id: number;
  name: string;
  focusAreas: string[];
  participants: string[];
  environments: string[];
  spaces: string[];
  equipment: string[];
  tags: string[];
  durationSeconds: number;
  description: string;
  difficulty: string;
}

function exercise(
  id: number,
  name: string,
  focusAreas: string[],
  participants: string[],
  environments: string[],
  spaces: string[],
  equipment: string[],
  tags: string[],
  durationSeconds: number,
  description: string,
  difficulty: string,
): Exercise {
  return { id, name, focusAreas, participants, environments, spaces, equipment, tags, durationSeconds, description, difficulty };
}

type PlayerStatus = 'ready' | 'running' | 'paused' | 'exerciseDone';
type WakeLockStatus = 'pending' | 'active' | 'unavailable' | 'unsupported';

interface ScreenWakeLockHandle {
  release(): Promise<void>;
}

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnDestroy {
  @ViewChild('quickPanel') private quickPanel?: ElementRef<HTMLElement>;
  @ViewChild('generatedPanel') private generatedPanel?: ElementRef<HTMLElement>;
  @ViewChild('playerScreen') private playerScreen?: ElementRef<HTMLElement>;

  private readonly profileRepository = inject(PLAYER_PROFILE_REPOSITORY);
  readonly activeProfile = this.profileRepository.activeProfile;
  readonly favorites = computed(() => this.activeProfile().favoriteExerciseIds);
  readonly savedWorkouts = computed(() => this.activeProfile().savedWorkouts);
  readonly workoutSessions = computed(() => this.activeProfile().workoutSessions);

  readonly tabs: { id: MainTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Hem', icon: '⌂' },
    { id: 'train', label: 'Träna', icon: '⚽' },
    { id: 'workouts', label: 'Mina pass', icon: '▤' },
    { id: 'profile', label: 'Profil', icon: '◉' },
  ];

  readonly categories = ['Alla', 'Bollkontroll', 'Passning', 'Skott', 'Snabbhet', 'Koordination', 'Kondition'];

  readonly exercises: Exercise[] = [
    exercise(1, 'Toe taps', ['Bollkontroll', 'Koordination'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Bollkänsla', 'Rytm'], 45, 'Växla fötter och nudda bollen med sulan.', 'Start'),
    exercise(2, 'Mellan fötterna', ['Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Bollkänsla', 'Snabba touch'], 45, 'För bollen snabbt från fot till fot.', 'Start'),
    exercise(3, 'Sulrullningar', ['Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Bollkänsla'], 40, 'Rulla bollen mjukt fram och tillbaka med sulan.', 'Start'),
    exercise(4, 'Insida / utsida', ['Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Dribbling', 'Touch'], 50, 'Växla mellan insida och utsida med små touch.', 'Medel'),
    exercise(5, 'Väggpassningar', ['Passning', 'Bollkontroll'], ['Ensam', 'Par'], ['Inomhus', 'Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll', 'Vägg'], ['Första touch', 'Svag fot'], 60, 'Passa mot väggen och ta emot med kontroll.', 'Medel'),
    exercise(6, 'Svag fot', ['Passning', 'Bollkontroll'], ['Ensam', 'Par'], ['Inomhus', 'Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll', 'Vägg'], ['Svag fot', 'Passning'], 60, 'Träna lugna passningar med din andra fot.', 'Start'),
    exercise(7, 'Vändningar i fyrkant', ['Bollkontroll', 'Koordination'], ['Ensam'], ['Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll', 'Koner'], ['Vändning', 'Dribbling'], 60, 'Driv mellan fyra markeringar och vänd snabbt.', 'Medel'),
    exercise(8, 'Snabba sulor', ['Snabbhet', 'Koordination'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Tempo', 'Bollkänsla'], 30, 'Små, snabba sul-touch med blicken framåt.', 'Medel'),
    exercise(9, 'Passa och följ', ['Passning', 'Koordination'], ['Par', 'Trio'], ['Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll'], ['Samarbete', 'Rörelse'], 90, 'Passa till nästa spelare och byt plats.', 'Start'),
    exercise(10, 'Skott genom mål', ['Skott'], ['Ensam', 'Par'], ['Utomhus'], ['Medelstor yta', 'Stor yta'], ['Boll', 'Koner'], ['Avslut', 'Sikta'], 75, 'Sikta på små mål mellan konerna.', 'Medel'),
    exercise(11, 'Första touch', ['Bollkontroll', 'Passning'], ['Par', 'Trio'], ['Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll'], ['Första touch', 'Mottagning'], 60, 'Ta emot bollen åt sidan och spela tillbaka.', 'Medel'),
    exercise(12, 'Konerace', ['Snabbhet', 'Bollkontroll'], ['Ensam', 'Par'], ['Utomhus'], ['Medelstor yta', 'Stor yta'], ['Boll', 'Koner'], ['Dribbling', 'Tempo'], 45, 'Driv slalom mellan konerna så snabbt du kan.', 'Utmaning'),
    exercise(13, 'Spegeldribbling', ['Koordination', 'Bollkontroll'], ['Par'], ['Inomhus', 'Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll'], ['Samarbete', 'Dribbling'], 60, 'En spelare leder rörelsen, den andra speglar.', 'Medel'),
    exercise(14, 'Skott på signal', ['Skott', 'Snabbhet'], ['Par', 'Trio'], ['Utomhus'], ['Stor yta'], ['Boll'], ['Reaktion', 'Avslut'], 60, 'Reagera på signalen, ta med bollen och skjut.', 'Utmaning'),
    exercise(15, 'Tå-touch stege', ['Koordination', 'Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Rytm', 'Bollkänsla'], 40, 'Rör bollen med växelvisa tå-touch i jämn rytm.', 'Start'),
    exercise(16, 'Trio i triangel', ['Passning'], ['Trio'], ['Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll', 'Koner'], ['Samarbete', 'Passning'], 90, 'Spela runt triangeln och ropa namnet före pass.', 'Start'),
    exercise(17, 'Jonglera lågt', ['Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Bollkänsla', 'Touch'], 45, 'Håll bollen i luften med små, lugna touch.', 'Medel'),
    exercise(18, 'Färgreaktion', ['Snabbhet', 'Koordination'], ['Ensam', 'Par'], ['Inomhus', 'Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll', 'Koner'], ['Reaktion', 'Tempo'], 45, 'Rör dig mot rätt markering när färgen ropas ut.', 'Start'),
    exercise(19, 'Träna och vila', ['Kondition', 'Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Intervaller', 'Bolltouch'], 90, 'Växla mellan snabb bollföring och kort vila.', 'Medel'),
  ];

  readonly activeTab = signal<MainTab>('home');
  readonly selectedCategory = signal('Alla');
  readonly favoritesOnly = signal(false);
  readonly searchTerm = signal('');
  readonly participantFilter = signal('Alla');
  readonly environmentFilter = signal('Alla');
  readonly spaceFilter = signal('Alla');
  readonly equipmentFilter = signal('Alla');
  readonly menuOpen = signal(false);
  readonly loginOpen = signal(false);
  readonly nicknamePromptOpen = signal(false);
  readonly profileEditing = signal(false);
  readonly nicknameDraft = signal('');
  readonly infoMessage = signal('');
  readonly toast = signal('');
  readonly quickFocus = signal('Bollkontroll');
  readonly quickPlayers = signal('Ensam');
  readonly quickEnvironment = signal('Inomhus');
  readonly quickSpace = signal('Liten yta');
  readonly quickMinutes = signal(10);
  readonly quickGenerated = signal(false);
  readonly builderOpen = signal(false);
  readonly builderSelection = signal<number[]>([1, 2, 5]);
  readonly showPlayer = signal(false);
  readonly playerExerciseIds = signal<number[]>([]);
  readonly playerIndex = signal(0);
  readonly playerTitle = signal('Dagens snabbpass');
  readonly playerRemaining = signal(0);
  readonly playerStatus = signal<PlayerStatus>('paused');
  readonly playerWakeLockStatus = signal<WakeLockStatus>('unsupported');
  readonly completedPlayerExerciseIds = signal<number[]>([]);
  readonly playerElapsedSeconds = signal<number[]>([]);
  readonly completedWorkoutCount = computed(() => this.workoutSessions().filter((session) => session.completionPercent === 100).length);
  readonly trainingMinutes = computed(() => {
    const seconds = this.workoutSessions().reduce((total, session) => total + session.durationSeconds, 0);
    return seconds > 0 ? Math.max(1, Math.round(seconds / 60)) : 0;
  });
  readonly completedExerciseCount = computed(() => new Set(this.workoutSessions().flatMap((session) => session.completedExerciseIds)).size);
  readonly currentWeekWorkoutCount = computed(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    return this.workoutSessions().filter((session) => new Date(session.startedAt) >= startOfWeek).length;
  });
  readonly trainingDaysThisWeek = computed(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    return new Set(this.workoutSessions()
      .map((session) => new Date(session.startedAt))
      .filter((date) => date >= startOfWeek)
      .map((date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)).size;
  });
  readonly trainingDaysProgressPercent = computed(() => Math.min(100, this.trainingDaysThisWeek() / 3 * 100));
  readonly exerciseProgressPercent = computed(() => Math.min(100, this.completedExerciseCount() / 5 * 100));
  readonly recentWorkout = computed(() => this.workoutSessions()[0] ?? null);
  readonly showNicknameReminder = computed(() => !this.activeProfile().nickname && this.workoutSessions().length > 0);
  private playerEndAt = 0;
  private playerTicker?: number;
  private wakeLock?: ScreenWakeLockHandle;
  private lockedScrollY = 0;
  private previousBodyStyles?: { position: string; top: string; width: string; overflow: string };
  private previousDocumentOverflow = '';
  private playerStartedAt = '';
  private playerSessionSaved = false;

  private readonly preventBackgroundTouchScroll = (event: TouchEvent): void => {
    if (!this.showPlayer()) return;
    const target = event.target;
    if (target instanceof Node && this.playerScreen?.nativeElement.contains(target)) return;
    event.preventDefault();
  };

  private readonly visibilityHandler = (): void => {
    if (document.visibilityState === 'hidden') {
      // Browsers release screen locks when their document becomes hidden.
      this.wakeLock = undefined;
      return;
    }

    if (this.showPlayer() && this.playerStatus() === 'running') {
      void this.requestWakeLock();
    }
  };

  readonly filteredExercises = computed(() => {
    const category = this.selectedCategory();
    const search = this.searchTerm().trim().toLocaleLowerCase('sv');
    return this.exercises.filter((exercise) => {
      const categoryMatches = category === 'Alla' || exercise.focusAreas.includes(category);
      const favoriteMatches = !this.favoritesOnly() || this.favorites().includes(exercise.id);
      const searchMatches = !search || `${exercise.name} ${exercise.focusAreas.join(' ')} ${exercise.tags.join(' ')} ${exercise.description}`.toLocaleLowerCase('sv').includes(search);
      const participantMatches = this.participantFilter() === 'Alla' || exercise.participants.includes(this.participantFilter());
      const environmentMatches = this.environmentFilter() === 'Alla' || exercise.environments.includes(this.environmentFilter());
      const spaceMatches = this.spaceFilter() === 'Alla' || exercise.spaces.includes(this.spaceFilter());
      const equipmentMatches = this.equipmentFilter() === 'Alla' || exercise.equipment.includes(this.equipmentFilter());
      return categoryMatches && favoriteMatches && searchMatches && participantMatches && environmentMatches && spaceMatches && equipmentMatches;
    });
  });

  readonly quickMatches = computed(() => {
    return this.exercises.filter((exercise) =>
      (this.quickPlayers() === 'Spelar ingen roll' || exercise.participants.includes(this.quickPlayers())) &&
      (this.quickEnvironment() === 'Spelar ingen roll' || exercise.environments.includes(this.quickEnvironment())) &&
      (this.quickSpace() === 'Spelar ingen roll' || exercise.spaces.includes(this.quickSpace())) &&
      (this.quickFocus() === 'Alla' || exercise.focusAreas.includes(this.quickFocus())),
    );
  });

  readonly playerExercise = computed(() => this.exercises.find((exercise) => exercise.id === this.playerExerciseIds()[this.playerIndex()]));

  constructor() {
    document.addEventListener('visibilitychange', this.visibilityHandler);
  }

  ngOnDestroy(): void {
    document.removeEventListener('visibilitychange', this.visibilityHandler);
    this.clearPlayerTicker();
    void this.releaseWakeLock();
    this.unlockBackgroundScroll();
  }

  selectTab(tab: MainTab): void {
    this.activeTab.set(tab);
    this.menuOpen.set(false);
    this.quickGenerated.set(false);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }

  openQuickStart(): void {
    this.selectTab('train');
    this.quickGenerated.set(false);
  }

  toggleFavorite(id: number): void {
    this.profileRepository.updateActiveProfile((profile) => ({
      ...profile,
      favoriteExerciseIds: profile.favoriteExerciseIds.includes(id)
        ? profile.favoriteExerciseIds.filter((item) => item !== id)
        : [...profile.favoriteExerciseIds, id],
    }));
  }

  profileInitial(): string {
    return this.activeProfile().nickname?.trim().charAt(0).toLocaleUpperCase('sv') || 'B';
  }

  startProfileEditing(): void {
    this.nicknameDraft.set(this.activeProfile().nickname ?? '');
    this.profileEditing.set(true);
  }

  cancelProfileEditing(): void {
    this.profileEditing.set(false);
    this.nicknameDraft.set(this.activeProfile().nickname ?? '');
  }

  saveNickname(): void {
    const nickname = this.nicknameDraft().trim().slice(0, 20);
    if (!nickname) {
      this.notify('Skriv ett smeknamn först.');
      return;
    }
    this.profileRepository.updateActiveProfile((profile) => ({ ...profile, nickname }));
    this.profileEditing.set(false);
    this.notify(`Snyggt, ${nickname}! Din profil är uppdaterad.`);
  }

  customizeProfileFromPrompt(): void {
    this.nicknamePromptOpen.set(false);
    this.selectTab('profile');
    this.startProfileEditing();
  }

  generateQuickWorkout(): void {
    if (this.quickMatches().length === 0) {
      this.notify('Inga övningar matchar de valen ännu. Prova ett annat filter.');
      return;
    }
    this.quickGenerated.set(true);
    this.notify(`${Math.min(this.plannedExerciseCount(), this.quickMatches().length)} övningar är klara att köra.`);
    window.setTimeout(() => this.generatedPanel?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  editQuickChoices(): void {
    this.quickPanel?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => this.quickPanel?.nativeElement.querySelector('select')?.focus(), 350);
  }

  startQuickWorkout(): void {
    this.startPlayer(this.quickMatches().slice(0, this.plannedExerciseCount()).map((exercise) => exercise.id), 'Snabbpass');
  }

  plannedExerciseCount(): number {
    return this.quickMinutes() <= 5 ? 3 : this.quickMinutes() <= 10 ? 4 : 5;
  }

  startSavedWorkout(workout: SavedWorkout): void {
    this.startPlayer(workout.exerciseIds, workout.name);
  }

  startPlayer(ids: number[], title = 'Träningspass'): void {
    const validIds = ids.filter((id) => this.exerciseById(id));
    if (validIds.length === 0) {
      this.notify('Det här passet saknar övningar.');
      return;
    }
    this.clearPlayerTicker();
    void this.releaseWakeLock();
    this.playerTitle.set(title);
    this.playerStartedAt = new Date().toISOString();
    this.playerSessionSaved = false;
    this.playerExerciseIds.set(validIds);
    this.playerElapsedSeconds.set(validIds.map(() => 0));
    this.playerIndex.set(0);
    this.completedPlayerExerciseIds.set([]);
    this.lockBackgroundScroll();
    this.showPlayer.set(true);
    this.beginCurrentExercise();
  }

  startCurrentExercise(): void {
    if (this.playerStatus() !== 'ready') return;
    this.playerStatus.set('running');
    this.startPlayerTicker();
  }

  pausePlayer(): void {
    if (this.playerStatus() !== 'running') return;
    this.updatePlayerCountdown();
    if (this.playerStatus() !== 'running') return;
    this.clearPlayerTicker();
    this.playerStatus.set('paused');
    void this.releaseWakeLock();
  }

  resumePlayer(): void {
    if (this.playerStatus() !== 'paused') return;
    this.playerStatus.set('running');
    this.startPlayerTicker();
  }

  continuePlayer(): void {
    if (this.playerStatus() !== 'exerciseDone') return;
    if (this.playerIndex() + 1 >= this.playerExerciseIds().length) {
      this.finishPlayer();
      return;
    }
    this.playerIndex.update((index) => index + 1);
    this.beginCurrentExercise();
  }

  skipPlayerExercise(): void {
    if (this.playerStatus() === 'running') this.updatePlayerCountdown();
    if (this.playerStatus() === 'exerciseDone') return;
    if (this.playerIndex() + 1 >= this.playerExerciseIds().length) {
      this.exitPlayer();
      this.notify('Passet avslutades innan sista övningen.');
      return;
    }
    this.playerIndex.update((index) => index + 1);
    this.beginCurrentExercise();
  }

  exitPlayer(): void {
    if (this.playerStatus() === 'running') this.updatePlayerCountdown();
    this.saveCurrentWorkoutSession();
    this.clearPlayerTicker();
    this.showPlayer.set(false);
    this.playerStatus.set('paused');
    void this.releaseWakeLock();
    this.unlockBackgroundScroll();
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  playerProgressPercent(): number {
    const count = this.playerExerciseIds().length;
    const exercise = this.playerExercise();
    if (count === 0 || !exercise) return 0;
    const elapsed = exercise.durationSeconds - this.playerRemaining();
    return Math.min(100, ((this.playerIndex() + elapsed / exercise.durationSeconds) / count) * 100);
  }

  private beginCurrentExercise(): void {
    const exercise = this.playerExercise();
    if (!exercise) {
      this.exitPlayer();
      return;
    }
    this.playerRemaining.set(exercise.durationSeconds);
    this.playerStatus.set('ready');
    this.clearPlayerTicker();
    void this.releaseWakeLock();
  }

  private startPlayerTicker(): void {
    this.clearPlayerTicker();
    this.playerEndAt = Date.now() + this.playerRemaining() * 1000;
    this.playerTicker = window.setInterval(() => this.updatePlayerCountdown(), 200);
    void this.requestWakeLock();
  }

  private updatePlayerCountdown(): void {
    if (this.playerStatus() !== 'running') return;
    const secondsLeft = Math.max(0, Math.ceil((this.playerEndAt - Date.now()) / 1000));
    const exercise = this.playerExercise();
    if (exercise) {
      const elapsedSeconds = exercise.durationSeconds - secondsLeft;
      this.playerElapsedSeconds.update((elapsed) => {
        const next = [...elapsed];
        next[this.playerIndex()] = Math.max(next[this.playerIndex()] ?? 0, elapsedSeconds);
        return next;
      });
    }
    if (secondsLeft !== this.playerRemaining()) this.playerRemaining.set(secondsLeft);
    if (secondsLeft > 0) return;

    this.clearPlayerTicker();
    const finishedId = this.playerExercise()?.id;
    if (finishedId !== undefined && !this.completedPlayerExerciseIds().includes(finishedId)) {
      this.completedPlayerExerciseIds.update((ids) => [...ids, finishedId]);
    }
    this.playerStatus.set('exerciseDone');
    void this.releaseWakeLock();
  }

  private lockBackgroundScroll(): void {
    if (this.previousBodyStyles) return;
    const body = document.body;
    this.previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    this.lockedScrollY = window.scrollY;
    this.previousDocumentOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${this.lockedScrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    document.addEventListener('touchmove', this.preventBackgroundTouchScroll, { capture: true, passive: false });
  }

  private unlockBackgroundScroll(): void {
    const previous = this.previousBodyStyles;
    if (!previous) return;
    document.removeEventListener('touchmove', this.preventBackgroundTouchScroll, true);
    Object.assign(document.body.style, previous);
    document.documentElement.style.overflow = this.previousDocumentOverflow;
    this.previousBodyStyles = undefined;
    window.scrollTo(0, this.lockedScrollY);
  }

  private clearPlayerTicker(): void {
    if (this.playerTicker !== undefined) {
      window.clearInterval(this.playerTicker);
      this.playerTicker = undefined;
    }
  }

  private async requestWakeLock(): Promise<void> {
    const api = (navigator as Navigator & {
      wakeLock?: { request(type: 'screen'): Promise<ScreenWakeLockHandle> };
    }).wakeLock;
    if (!api) {
      this.playerWakeLockStatus.set('unsupported');
      return;
    }

    this.playerWakeLockStatus.set('pending');
    try {
      const lock = await api.request('screen');
      if (!this.showPlayer() || this.playerStatus() !== 'running' || document.visibilityState === 'hidden') {
        await lock.release();
        return;
      }
      this.wakeLock = lock;
      this.playerWakeLockStatus.set('active');
    } catch {
      this.playerWakeLockStatus.set('unavailable');
    }
  }

  private async releaseWakeLock(): Promise<void> {
    const lock = this.wakeLock;
    this.wakeLock = undefined;
    if (lock) {
      try {
        await lock.release();
      } catch {
        // The browser may already have released the lock.
      }
    }
    if (this.playerWakeLockStatus() !== 'unsupported') {
      this.playerWakeLockStatus.set('unavailable');
    }
  }

  private finishPlayer(): void {
    const completedCount = this.completedPlayerExerciseIds().length;
    const nickname = this.activeProfile().nickname;
    this.exitPlayer();
    const exerciseWord = completedCount === 1 ? 'övning' : 'övningar';
    this.notify(nickname
      ? `Snyggt jobbat, ${nickname}! ${completedCount} ${exerciseWord} klara.`
      : `Snyggt jobbat! ${completedCount} ${exerciseWord} klara.`);

    if (!nickname && !this.activeProfile().firstWorkoutPromptSeen) {
      this.profileRepository.updateActiveProfile((profile) => ({ ...profile, firstWorkoutPromptSeen: true }));
      this.nicknamePromptOpen.set(true);
    }
  }

  private saveCurrentWorkoutSession(): void {
    if (this.playerSessionSaved) return;
    const plannedExerciseIds = [...this.playerExerciseIds()];
    const completedExerciseIds = [...this.completedPlayerExerciseIds()];
    const durationSeconds = this.playerElapsedSeconds().reduce((total, seconds) => total + seconds, 0);
    if (durationSeconds === 0) return;
    this.playerSessionSaved = true;

    const plannedSeconds = plannedExerciseIds.reduce((total, id) => total + (this.exerciseById(id)?.durationSeconds ?? 0), 0);
    const session: WorkoutSession = {
      id: this.createRecordId(),
      title: this.playerTitle(),
      startedAt: this.playerStartedAt,
      durationSeconds,
      plannedDurationSeconds: plannedSeconds,
      completionPercent: plannedSeconds > 0 ? Math.min(100, Math.floor(durationSeconds / plannedSeconds * 100)) : 0,
      plannedExerciseIds,
      completedExerciseIds,
    };
    this.profileRepository.updateActiveProfile((profile) => ({
      ...profile,
      workoutSessions: [session, ...profile.workoutSessions],
    }));
  }

  formatSessionDate(dateValue: string): string {
    const date = new Date(dateValue);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const sameDate = (first: Date, second: Date) => first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();

    if (sameDate(date, today)) return 'Idag';
    if (sameDate(date, yesterday)) return 'Igår';
    return new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'short' }).format(date).replace('.', '');
  }

  formatSessionDuration(seconds: number): string {
    if (seconds < 60) return `${seconds} sek`;
    return `${Math.round(seconds / 60)} min`;
  }

  private createRecordId(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  toggleBuilderExercise(id: number): void {
    this.builderSelection.update((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  }

  saveBuiltWorkout(): void {
    const ids = this.builderSelection();
    if (ids.length === 0) {
      this.notify('Välj minst en övning först.');
      return;
    }
    const profile = this.activeProfile();
    const title = `Mitt pass ${profile.savedWorkouts.filter((workout) => workout.id.startsWith('custom-')).length + 1}`;
    const workout: SavedWorkout = {
      id: `custom-${this.createRecordId()}`,
      name: title,
      focus: 'Eget pass',
      minutes: Math.max(5, Math.round(ids.length * 2.5)),
      exerciseIds: [...ids],
    };
    this.profileRepository.updateActiveProfile((current) => ({
      ...current,
      savedWorkouts: [workout, ...current.savedWorkouts],
    }));
    this.builderOpen.set(false);
    this.selectTab('workouts');
    this.notify(`${title} sparat.`);
  }

  exerciseById(id: number): Exercise | undefined {
    return this.exercises.find((exercise) => exercise.id === id);
  }

  openInfo(message: string): void {
    this.menuOpen.set(false);
    this.infoMessage.set(message);
  }

  notify(message: string): void {
    this.toast.set(message);
    window.setTimeout(() => this.toast.set(''), 2800);
  }
}
