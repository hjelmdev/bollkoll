import type { Exercise } from '../models/exercise.model';

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

const ALL_EXERCISES: readonly Exercise[] = [
  exercise(1, 'Toe taps', ['Bollkontroll', 'Koordination'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Bollkänsla', 'Rytm'], 45, 'Växla fötter och nudda bollen med sulan.', 'Start'),
  exercise(2, 'Mellan fötterna', ['Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Bollkänsla', 'Snabba touch'], 45, 'För bollen snabbt från fot till fot.', 'Start'),
  exercise(3, 'Sulrullningar', ['Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Bollkänsla'], 40, 'Rulla bollen från den ena fotens sula till den andra och tillbaka.', 'Start'),
  exercise(4, 'Insida / utsida', ['Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Dribbling', 'Touch'], 50, 'Skjut bollen ut åt sidan med utsidan och hämta tillbaka mot mitten med insidan.', 'Medel'),
  exercise(5, 'Väggpassningar', ['Passning', 'Bollkontroll'], ['Ensam', 'Par'], ['Inomhus', 'Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll', 'Vägg'], ['Första touch', 'Svag fot'], 60, 'Passa mot väggen och ta emot med kontroll.', 'Medel'),
  exercise(6, 'Svag fot', ['Passning', 'Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll', 'Vägg'], ['Svag fot', 'Passning'], 60, 'Passa mot en vägg med foten du vill träna och ta emot returen.', 'Start'),
  exercise(7, 'Vändningar i fyrkant', ['Bollkontroll', 'Koordination'], ['Ensam'], ['Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll', 'Koner'], ['Vändning', 'Dribbling'], 60, 'Driv mellan fyra koner i en fyrkant. Vänd runt konen och fortsätt längs nästa sida.', 'Medel'),
  exercise(9, 'Passa och följ', ['Passning', 'Koordination'], ['Par', 'Trio'], ['Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll'], ['Samarbete', 'Rörelse'], 90, 'Passa till nästa spelare och byt plats.', 'Start'),
  exercise(11, 'Första touch', ['Bollkontroll', 'Passning'], ['Par'], ['Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll'], ['Första touch', 'Mottagning'], 60, 'Ta emot bollen med en touch och spela tillbaka med nästa. Byt fot varje gång.', 'Medel'),
  exercise(12, 'Konerace', ['Snabbhet', 'Bollkontroll'], ['Ensam', 'Par'], ['Utomhus'], ['Medelstor yta', 'Stor yta'], ['Boll', 'Koner'], ['Dribbling', 'Tempo'], 45, 'Driv slalom mellan konerna så snabbt du kan.', 'Utmaning'),
  exercise(13, 'Driva och backa', ['Koordination', 'Bollkontroll', 'Passning'], ['Par'], ['Inomhus', 'Utomhus'], ['Medelstor yta'], ['Boll'], ['Samarbete', 'Dribbling', 'Passning'], 60, 'En spelare driver framåt medan kompisen backar. När tiden är slut byter ni roller inför nästa omgång.', 'Medel'),
  exercise(16, 'Trio i triangel', ['Passning'], ['Trio'], ['Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll', 'Koner'], ['Samarbete', 'Passning'], 90, 'Stå kvar på varsin kon och passa bollen runt triangeln.', 'Start'),
  exercise(17, 'Jonglera', ['Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Bollkänsla', 'Touch'], 45, 'Håll bollen i luften med små, lugna touch.', 'Medel'),
  exercise(18, 'Färgreaktion', ['Snabbhet', 'Koordination'], ['Ensam', 'Par'], ['Inomhus', 'Utomhus'], ['Liten yta', 'Medelstor yta'], ['Boll', 'Koner'], ['Reaktion', 'Tempo'], 45, 'Rör dig mot rätt markering när färgen ropas ut.', 'Start'),
  exercise(20, 'Utsida till utsida', ['Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll'], ['Utsida', 'Dribbling'], 45, 'Rör dig efter bollen: för den åt höger med högerfotens utsida och möt den med vänsterfotens utsida för att föra den tillbaka.', 'Medel'),
  exercise(21, 'Väggpass med fotbyte', ['Passning', 'Bollkontroll'], ['Ensam'], ['Inomhus', 'Utomhus'], ['Liten yta'], ['Boll', 'Vägg'], ['Fotbyte', 'Väggpass'], 75, 'Passa mot väggen och ta emot med samma fot. Lägg över bollen och växla fot.', 'Medel'),
];

const RETIRED_EXERCISE_IDS = new Set([8, 10, 14, 15, 19]);

export const EXERCISES: readonly Exercise[] = ALL_EXERCISES.filter(({ id }) => !RETIRED_EXERCISE_IDS.has(id));
export const RETIRED_EXERCISES: readonly Exercise[] = ALL_EXERCISES.filter(({ id }) => RETIRED_EXERCISE_IDS.has(id));
