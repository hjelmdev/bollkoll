import { Component, computed, ElementRef, signal, ViewChild } from '@angular/core';

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

interface SavedWorkout {
  id: number;
  name: string;
  focus: string;
  minutes: number;
  exerciseIds: number[];
}

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  @ViewChild('quickPanel') private quickPanel?: ElementRef<HTMLElement>;
  @ViewChild('generatedPanel') private generatedPanel?: ElementRef<HTMLElement>;

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
  readonly favorites = signal<number[]>([1, 5, 8]);
  readonly participantFilter = signal('Alla');
  readonly environmentFilter = signal('Alla');
  readonly spaceFilter = signal('Alla');
  readonly equipmentFilter = signal('Alla');
  readonly menuOpen = signal(false);
  readonly loginOpen = signal(false);
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

  readonly savedWorkouts = signal<SavedWorkout[]>([
    { id: 101, name: 'Snabba fötter', focus: 'Bollkontroll · snabbhet', minutes: 10, exerciseIds: [1, 8, 4, 15] },
    { id: 102, name: 'Vägg & touch', focus: 'Passning · bollkontroll', minutes: 12, exerciseIds: [5, 6, 11, 2] },
    { id: 103, name: 'Lördag med kompis', focus: 'Passning · koordination', minutes: 15, exerciseIds: [9, 13, 16] },
  ]);

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
    this.favorites.update((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
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
    this.startPlayer(this.quickMatches().slice(0, this.plannedExerciseCount()).map((exercise) => exercise.id));
  }

  plannedExerciseCount(): number {
    return this.quickMinutes() <= 5 ? 3 : this.quickMinutes() <= 10 ? 4 : 5;
  }

  startSavedWorkout(workout: SavedWorkout): void {
    this.startPlayer(workout.exerciseIds);
  }

  startPlayer(ids: number[]): void {
    this.playerExerciseIds.set(ids);
    this.playerIndex.set(0);
    this.showPlayer.set(true);
  }

  nextExercise(): void {
    if (this.playerIndex() + 1 >= this.playerExerciseIds().length) {
      this.showPlayer.set(false);
      this.notify('Snyggt jobbat! Passet är klart.');
      return;
    }
    this.playerIndex.update((index) => index + 1);
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
    const title = `Mitt pass ${this.savedWorkouts().length + 1}`;
    this.savedWorkouts.update((items) => [
      { id: Date.now(), name: title, focus: 'Eget pass', minutes: Math.max(5, Math.round(ids.length * 2.5)), exerciseIds: [...ids] },
      ...items,
    ]);
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
