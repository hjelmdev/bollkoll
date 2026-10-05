# Instruktioner för agenter

## Produktkontext

- Läs `Bollkoll_PROJECT_CONTEXT.md` innan du föreslår eller ändrar produktfunktioner. Den filen är den auktoritativa källan för produktmål, målgrupp och designriktning.
- Bollkoll börjar som en mobilvänlig Solo-app för individuell fotbollsträning. Håll första versionen enkel och stöd vanebyggande, personlig progression och positiv återkoppling.
- Undvik publik rangordning, onödig insamling av personuppgifter och funktioner för Duo, Team, tränare eller föreningar i MVP:n.
- Avatarens framtida stil är 2D pixel art med en återanvändbar grundpose. Bygg inte avatarverktyg eller skapa grafik innan det ingår i den aktuella uppgiften.

## Tekniska riktlinjer

- Utgå från Angular + TypeScript som PWA enligt projektkontexten. Ändra inte ramverk eller språk utan uttryckligt beslut.
- Håll MVP:n lokal-first utan krav på konto, backend eller synk mellan enheter. Lägg lagring bakom tydliga tjänstegränser så att IndexedDB eller en framtida backend kan införas utan att träningsflödet behöver skrivas om.
- Håll domänmodeller och regler frikopplade från UI-komponenter. Föredra små, begripliga Angular-komponenter och tjänster med tydliga ansvarsområden; följ Angulars etablerade TypeScript- och dependency-injection-mönster.
- Använd webbläsar-API:er vid behov, exempelvis Screen Wake Lock. Hantera att Wake Lock kan nekas eller släppas och försök återaktivera när sidan blir synlig igen.
- Bygg MVP:n som webb/PWA. Beakta att Capacitor kan användas för en framtida native-app, men inför inte Capacitor eller plattformsspecifik kod förrän det blir en konkret uppgift.
- Utforma spelargränssnittet mobile-first, responsivt, tillgängligt och användbart med touch. Anpassa navigation och informationsmängd för större skärmar; skala inte bara upp mobilvyn.
- Bygg PWA-stödet med manifest och service worker. Prioritera att träningsflödet och lokal data fungerar vid tillfälliga nätverksavbrott, och gör nätverkskrav tydliga.
- En framtida adminyta kan vara desktop-first men ska fortfarande fungera responsivt. Lägg inte till adminroller, behörigheter eller adminfunktioner i Solo-MVP:n utan uttryckligt produktbeslut.
- Bevara pixelgrafikens skärpa med `image-rendering: pixelated` när sådana tillgångar införs.
- Lägg inte till beroenden, konton, telemetri eller externa tjänster utan ett tydligt behov i uppgiften.

## Arbetsflöde

- Kontrollera först befintlig kod, konfiguration och versionskontrollstatus. Bevara lokala ändringar och följ etablerade mönster där de finns.
- Gör minsta sammanhängande ändring som uppfyller uppgiften. Hitta inte på produktkrav som saknas i kontexten; skriv ut antaganden när de påverkar lösningen.
- Ändra inte teknikstack, produktomfattning eller datalagringsstrategi utan uttryckligt önskemål.
- Kör inte tester eller andra verifieringskommandon om användaren inte ber om verifiering. Om verifiering uttryckligen efterfrågas, kör relevanta kommandon och rapportera resultatet.
- Avsluta med en kort sammanfattning av ändringar, viktiga beslut och eventuella begränsningar.
