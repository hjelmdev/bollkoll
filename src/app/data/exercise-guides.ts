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

const imageAspectRatio = 2.39;

export const EXERCISE_GUIDES: Readonly<Record<number, ExerciseGuide>> = {
  1: { imagePath: 'assets/exercises/toe-taps-loop.gif?v=1', view: 'player', imageAspectRatio: 1.137, steps: [
    { caption: 'Vänster fot', description: 'Lyft vänster fot och nudda bollens ovansida med främre delen av skon.' },
    { caption: 'Byt fot', description: 'Sätt ner foten och växla direkt till höger. Låt bollen ligga stilla.' },
  ] },
  2: { imagePath: 'assets/exercises/mellan-fotterna-loop-v11.gif?v=11', view: 'player', imageAspectRatio: 1.2, steps: [
    { caption: 'Starta i mitten', description: 'Stå med fötterna på varsin sida om bollen.' },
    { caption: 'För bollen åt sidan', description: 'Flytta bollen från ena foten mot den andra med fotens insida.' },
    { caption: 'Växla tillbaka', description: 'Möt bollen med andra fotens insida och för den tillbaka.' },
  ] },
  3: { imagePath: 'assets/exercises/sulrullningar-loop-v3.gif?v=3', view: 'player', imageAspectRatio: 1.2, steps: [
    { caption: 'Starta till vänster', description: 'Lägg sulan mjukt på bollen.' },
    { caption: 'Rulla åt höger', description: 'Rulla bollen över golvet mot den andra foten.' },
    { caption: 'Ta emot', description: 'Möt bollen med den andra fotens sula.' },
    { caption: 'Tillbaka åt vänster', description: 'Rulla bollen tillbaka med sulan och fortsätt i jämn rytm.' },
  ] },
  4: { imagePath: 'assets/exercises/04-insida-utsida-loop-v4.gif?v=4', view: 'player', imageAspectRatio: 1.2, steps: [
    { caption: 'Skjut ut bollen', description: 'Med höger fot: skjut bollen åt höger med utsidan, så den hamnar utanför foten.' },
    { caption: 'Hämta tillbaka', description: 'Vinkla samma fot och för bollen in mot mitten med insidan. Byt håll med vänster fot.' },
  ] },
  5: { imagePath: 'assets/exercises/05-vaggpassningar.jpg', view: 'player', imageAspectRatio, steps: [
    { caption: 'Passa mot väggen', description: 'Spela en lagom hård passning längs marken.' },
    { caption: 'Ta emot returen', description: 'Möt bollen och få kontroll på första touchen.' },
  ] },
  6: { imagePath: 'assets/exercises/06-svag-fot.jpg', view: 'player', imageAspectRatio, steps: [
    { caption: 'Ställ upp vid väggen', description: 'Börja nära en vägg med bollen framför foten du vill träna.' },
    { caption: 'Passa och ta emot', description: 'Spela längs golvet mot väggen och ta emot returen med samma fot.' },
  ] },
  7: { imagePath: 'assets/exercises/07-vandningar-i-fyrkant.jpg', view: 'top-down', imageAspectRatio, steps: [
    { caption: 'Driv mot hörnet', description: 'Håll bollen nära och följ fyrkantens insida fram mot konen.' },
    { caption: 'Fortsätt längs nästa sida', description: 'Runda konen med en snabb vändning och driv vidare innanför fyrkanten.' },
  ] },
  8: { imagePath: 'assets/exercises/08-snabba-sulor.jpg', view: 'player', imageAspectRatio, steps: [
    { caption: 'Nudda med ena foten', description: 'Lägg sulan lätt på bollens ovansida.' },
    { caption: 'Växla snabbt', description: 'Byt fot direkt och håll bollen nästan stilla.' },
  ] },
  9: { imagePath: 'assets/exercises/09-passa-och-folj.jpg', view: 'player', imageAspectRatio, steps: [
    { caption: 'Slå passningen', description: 'Passa längs marken till din kompis.' },
    { caption: 'Följ bollen', description: 'Spring efter passningen och byt plats med spelaren.' },
  ] },
  10: { imagePath: 'assets/exercises/10-skott-genom-mal.jpg', view: 'player', imageAspectRatio, steps: [
    { caption: 'Sikta', description: 'Välj en öppning mellan konerna och placera stödjefoten bredvid bollen.' },
    { caption: 'Skjut', description: 'Träffa bollen och följ igenom rörelsen mot målet.' },
  ] },
  11: { imagePath: 'assets/exercises/11-forsta-touch.jpg', view: 'player', imageAspectRatio, steps: [
    { caption: 'Ta emot', description: 'Ta emot kompisens passning med en mjuk touch, växelvis höger och vänster fot.' },
    { caption: 'Spela tillbaka', description: 'Använd nästa touch för att passa tillbaka till kompisen.' },
  ] },
  12: { imagePath: 'assets/exercises/12-konerace.jpg', view: 'top-down', imageAspectRatio, steps: [
    { caption: 'Håll bollen nära', description: 'Driv fram mot konbanan med små touch.' },
    { caption: 'Sicksacka', description: 'Ta dig förbi konerna och växla riktning snabbt.' },
  ] },
  13: { imagePath: 'assets/exercises/13-driva-och-backa.jpg?v=2', view: 'player', imageAspectRatio, steps: [
    { caption: 'Driv framåt', description: 'En spelare driver bollen lugnt framåt medan kompisen backar framför.' },
    { caption: 'Byt roller när tiden är slut', description: 'När omgångens tid är slut byter ni: den som backade driver i nästa omgång.' },
  ] },
  14: { imagePath: 'assets/exercises/14-skott-pa-signal.jpg', view: 'player', imageAspectRatio, steps: [
    { caption: 'Vänta på signalen', description: 'Stå redo med bollen och håll koll på kompisen.' },
    { caption: 'Reagera och skjut', description: 'När signalen kommer driver du fram och skjuter genom målet.' },
  ] },
  15: { imagePath: 'assets/exercises/15-ta-touch-stege.jpg', view: 'player', imageAspectRatio, steps: [
    { caption: 'Börja lugnt', description: 'Nudda bollens ovansida lätt med främre delen av skon.' },
    { caption: 'Byt fot i rytm', description: 'Växla fötter och håll en jämn takt.' },
  ] },
  16: { imagePath: 'assets/exercises/16-trio-i-triangel.jpg', view: 'top-down', imageAspectRatio, steps: [
    { caption: 'Stå kvar på din kon', description: 'Tre spelare står kvar på varsin plats i triangeln.' },
    { caption: 'Låt bollen gå runt', description: 'Passa till nästa person och fortsätt runt triangeln.' },
  ] },
  17: { imagePath: 'assets/exercises/17-jonglera-lagt-loop-v3.gif?v=3', view: 'player', imageAspectRatio: 1.2, steps: [
    { caption: 'Lyft bollen lågt', description: 'Använd foten för att ge bollen en mjuk, liten lyftning.' },
    { caption: 'Håll kontrollen', description: 'Möt bollen med nästa lätta touch innan den faller.' },
  ] },
  18: { imagePath: 'assets/exercises/18-fargreaktion.jpg', view: 'top-down', imageAspectRatio, steps: [
    { caption: 'Stå redo', description: 'Ha bollen nära och titta upp mot markeringarna.' },
    { caption: 'Reagera på färgen', description: 'Driv mot konen med färgen som ropas ut.' },
  ] },
  19: { imagePath: 'assets/exercises/19-trana-och-vila.jpg', view: 'player', imageAspectRatio, steps: [
    { caption: 'Kör snabbt', description: 'Driv bollen genom banan med hög fart.' },
    { caption: 'Ta en kort vila', description: 'Stanna upp, andas och gör dig redo för nästa intervall.' },
  ] },
  20: { imagePath: 'assets/exercises/20-utsida-till-utsida.jpg?v=3', view: 'player', imageAspectRatio, steps: [
    { caption: 'Höger utsida', description: 'För bollen åt höger med högerfotens utsida.' },
    { caption: 'Följ efter bollen', description: 'Flytta fötterna efter bollen och möt den med vänsterfotens utsida för att föra den tillbaka.' },
  ] },
  21: { imagePath: 'assets/exercises/21-vaggpass-med-fotbyte.jpg', view: 'player', imageAspectRatio, steps: [
    { caption: 'Passa och ta emot', description: 'Passa mot väggen med höger fot och ta emot returen med höger.' },
    { caption: 'Byt fot', description: 'Lägg över bollen till vänster och upprepa med vänster fot.' },
  ] },
};
