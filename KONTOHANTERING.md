# Kontohantering i Bollkoll – målbild efter MVP

## Syfte

Konton ska möjliggöra synkning och återställning mellan enheter, men inte krävas för att använda Bollkolls kärnfunktioner. En spelare ska kunna träna, spara framsteg och skapa avatar oavsett om profilen bara finns lokalt eller är kopplad till ett konto.

**Samma spelarprofil och samma kärnupplevelse – skillnaden är var data lagras och om den synkas.**

Detta är en målbild för tiden efter MVP. Konton och backend behöver inte ingå i första versionen.

## Begrepp och ansvar

- **Spelarprofil:** smeknamn, pass, träningshistorik, framsteg, achievements och avatar.
- **Inloggningskonto:** identitet som används för att logga in och ge åtkomst till synkade profiler.
- **Lagringsplats:** lokal lagring på enheten och, när profilen är kopplad till konto, molnlagring.
- Håll spelarprofilen åtskild från inloggningsidentiteten och lagringsmekanismen. Träningsflödet ska använda samma profilmodell oavsett lagringsplats.

## Användningslägen

### Lokal profil utan konto

- Användaren ska kunna börja direkt utan registrering eller e-postadress.
- Appen skapar en spelarprofil lokalt på enheten.
- Kärnfunktionerna ska fungera på samma sätt som för en profil med konto, inklusive pass, framsteg och avatar i den mån tillhörande resurser finns tillgängliga.
- Data ska gå att använda offline.

### Föräldrakonto med barnprofiler

- En förälder loggar in med en leverantör som Google och skapar en eller flera barnprofiler.
- Barnprofiler behöver inte ha egna e-postadresser eller egna Google-inloggningar.
- Föräldrakontot äger och hanterar profilerna. Varje barnprofil har sina egna träningsdata och sin egen avatar.
- Vid användning väljer spelaren profil i Bollkoll. På delade enheter ska profilväljaren vara tydlig.

### Eget konto

- En spelare kan senare koppla en profil till ett eget konto för synkning mellan enheter.
- Ett eget konto är en valfri väg till synkning, inte ett krav för att börja använda appen.

## Lagring och synkning

- Molnet är den beständiga sanningskällan för profiler som synkas.
- En lokal kopia används för snabb åtkomst och offlineanvändning.
- Ändringar som görs offline sparas lokalt och synkas när nätverket återkommer.
- Inloggning ska kunna bestå i Bollkoll mellan appstarter. Bollkolls session och spelarprofil ska hållas åtskilda från användarens generella inloggningsläge hos Google och andra webbplatser.
- Appen ska kunna visa profilväljaren efter start, särskilt när enheten delas av familjen.
- Hantera synkkonflikter med tydlig och säker logik så att träningsdata inte tyst försvinner eller dupliceras.

## Koppla eller migrera en lokal profil

En lokal profil ska senare kunna kopplas till antingen:

1. spelarens eget konto, eller
2. en barnprofil som en förälder har skapat.

Kopplingsflödet ska:

- tydligt visa vilken lokal profil som kopplas och vilket konto eller vilken målprofil som tar emot den;
- kontrollera om målprofilen redan har data;
- förklara och hantera överlappande data utan att tyst skriva över eller duplicera pass och framsteg;
- bekräfta när kopplingen är klar och synk fungerar.

Utforma detta som en avsiktlig engångsövergång. En lokal kopia kan därefter användas för offlineåtkomst till den synkade profilen.

## Offlineinnehåll och resurser

- Lokal respektive kontokopplad profil ska ha samma kärnfunktioner.
- Det behöver inte innebära att allt innehåll laddas ner till enheten.
- Spara spelarens egna data lokalt. Hämta större resurser, exempelvis bilder, vid behov och cacha dem lämpligt.
- Visa begripligt när en funktion eller resurs kräver nätverk eller inte finns tillgänglig offline.
- Besluta stegvis vilka resurser som ska vara tillgängliga offline utifrån produktbehov och lagringskostnad.

## Integritet och omfattning

- Undvik att kräva barnens egna kontaktuppgifter när de använder barnprofiler under ett föräldrakonto.
- Håll barnprofiler privata; publik ranking ingår inte i denna målbild.
- Lägg inte till konto, backend eller extern tjänst i MVP:n utan ett separat produktbeslut.

## Föreslagen etappindelning

1. **Profil- och datamodell:** separera spelarprofil, inloggningsidentitet och lagring.
2. **Lokal användning:** stöd lokal profil och kärnflöden utan konto.
3. **Konton och synk:** inför molnlagring, lokal cache och offlinekö för ändringar.
4. **Föräldrakonto och barnprofiler:** låt föräldern hantera profiler utan egna barninloggningar.
5. **Profilkoppling:** stöd engångsmigrering från lokal profil till eget konto eller förälders barnprofil.
6. **Offlinepolish:** bestäm resurscache, synkkonflikter och tydlig återkoppling vid nätverksproblem.

## Acceptanskriterier för målbilden

- En ny spelare kan börja och använda kärnfunktionerna utan konto.
- En barnprofil kan användas utan egen e-postadress eller Google-inloggning.
- Lokala och kontokopplade profiler använder samma spelarflöde och profilfunktioner.
- En kontokopplad profil går att använda offline med sin lokala kopia och synkar ändringar när anslutningen återkommer.
- En lokal profil kan kopplas till eget konto eller till en barnprofil med ett tydligt flöde som skyddar befintlig data.
- Konto ger synk och återställning mellan enheter; det är inte ett villkor för den grundläggande spelarupplevelsen.
