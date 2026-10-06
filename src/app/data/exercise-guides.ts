export interface ExerciseGuideStep {
  caption: string;
  description: string;
}

export interface ExerciseGuide {
  imagePath: string;
  view: 'player' | 'top-down';
  imageAspectRatio: number;
  /** The generated sheet is split into equally sized panels, one per step. */
  steps: readonly ExerciseGuideStep[];
}

export const EXERCISE_GUIDES: Readonly<Record<number, ExerciseGuide>> = {
  1: {
    imagePath: 'assets/exercises/toe-taps-steps.png',
    view: 'player',
    imageAspectRatio: 2.52,
    steps: [
      { caption: 'Vänster fot', description: 'Lyft vänster fot och nudda bollens ovansida med främre delen av skon.' },
      { caption: 'Byt fot', description: 'Sätt ner foten och växla direkt till höger. Låt bollen ligga stilla.' },
    ],
  },
  2: {
    imagePath: 'assets/exercises/mellan-fotterna-steps.png',
    view: 'player',
    imageAspectRatio: 2.52,
    steps: [
      { caption: 'Starta i mitten', description: 'Stå med fötterna på varsin sida om bollen.' },
      { caption: 'För bollen åt sidan', description: 'Använd fotens insida och håll bollen nära kroppen.' },
      { caption: 'Växla tillbaka', description: 'Möt bollen med andra fotens insida och för den tillbaka.' },
    ],
  },
};
