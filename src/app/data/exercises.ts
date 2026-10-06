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

export const EXERCISES: readonly Exercise[] = [
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
