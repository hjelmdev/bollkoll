# Bollkoll – Projektkontext

## Arbetsnamn

**Bollkoll – Få koll på bollen**

Arbetsnamnet ska vara enkelt, svenskt, lätt att säga och lätt att komma ihåg.

---

## Grundidé

Bollkoll är en mobilvänlig träningsapp som ska göra individuell fotbollsträning roligare genom gamification.

Kärnan är att spelaren enkelt ska kunna:

- välja övningar
- sätta ihop egna träningspass
- få färdiga pass genererade
- köra pass med aktiv timer
- samla poäng
- låsa upp achievements
- bygga upp ett troféskåp
- låsa upp delar till en personlig avatar

Appen ska i första hand uppmuntra till enkel, regelbunden träning som går att göra själv hemma, på liten yta eller utomhus.

På längre sikt kan appen växa till att även stödja duo- och lagträning.

---

# Produktprinciper

## 1. Enkelt att komma igång

Första versionen ska vara mycket enkel.

Övningskort kan initialt mockas och endast innehålla ett namn. Målet är först att bygga appens stomme och användarflöde.

Exempel:

- Toe taps
- Mellan fötterna
- Sulrullningar
- Insida / utsida
- Väggpassningar
- Svag fot

Illustrationer, instruktioner och video kan läggas till senare.

## 2. Mobile first

Spelarupplevelsen ska utformas mobile-first eftersom appen främst används på mobil. Layouten ska sedan anpassas responsivt till surfplattor och större skärmar; desktop ska fungera väl även om det inte är huvudformatet för spelaren.

Appen ska fungera bra som PWA och kunna installeras på hemskärmen. Viktiga träningsflöden ska kunna användas även vid tillfälligt avbrott i nätverket, med lokal lagring av data där det är lämpligt. Visa tydligt när en åtgärd kräver nätverksanslutning.

När ett träningspass körs ska appen använda **Screen Wake Lock API** för att försöka hålla skärmen aktiv.

Wake lock behöver återaktiveras när sidan blir synlig igen eftersom webbläsaren/systemet kan släppa låset.

En eventuell adminyta kan vara desktop-first, exempelvis för hantering av övningar och innehåll. Den ska fortfarande vara responsiv och användbar på mindre skärmar. Adminfunktioner och behörigheter ingår inte i Solo-MVP:n.

## 3. Gamification utan negativ tävling

Gamification ska främst handla om personlig progression.

Fokus:

- träna ofta
- prova nya övningar
- samla repetitionsvolym
- bygga vanor
- få tydlig feedback
- låsa upp visuella belöningar

Undvik att fokusera för mycket på vem som är bäst.

Topplistor och lag-/föreningsranking kan eventuellt komma längre fram.

---

# Träningslägen

Appen ska på sikt stödja olika sätt att träna.

## Solo

Detta är första prioritet och MVP.

Exempel:

- individuell bollkontroll
- liten yta
- fotbollsmatta
- väggövningar
- konövningar
- svag fot
- enkel kondition

## Duo

Framtida funktion.

Övningar för två personer, till exempel:

- passningar
- första touch
- reaktionsövningar
- kombinationsövningar
- teknik med förälder eller kompis

## Team

Framtida funktion.

En tränare ska kunna skapa och publicera hela träningspass till sitt lag.

Spelarna ska kunna öppna träningen innan träningstillfället och se:

- tema
- övningar
- instruktioner
- illustrationer
- eventuellt video
- tider
- fokusområde

Syftet är bland annat att spelarna ska kunna komma bättre förberedda till lagträningen.

---

# Övningar

Varje övning kan på sikt innehålla:

- namn
- beskrivning
- steg-för-steg-instruktion
- illustration
- video
- rekommenderad tid
- poäng
- svårighetsgrad
- träningsläge: Solo / Duo / Team
- kategori
- taggar
- eventuell repetitionsräkning

Exempel på taggar:

- liten yta
- vägg
- koner
- fotbollsmatta
- svag fot
- bollkontroll
- dribbling
- passning
- snabbhet
- koordination

---

# Bygga egna pass

Spelaren ska kunna välja övningar och sätta ihop ett eget pass.

Exempel:

1. Mellan fötterna – 45 sek
2. Toe taps – 45 sek
3. Sulrullningar – 45 sek
4. Väggpassningar – 60 sek
5. Svag fot – 60 sek

Passet körs sedan i ett särskilt träningsläge.

---

# Träningsläge / Workout Player

När ett pass startas visas en övning i taget.

Visa exempelvis:

- aktuell övning
- illustration
- kort instruktion
- nedräkning
- nästa övning
- paus mellan övningar
- pausa
- hoppa över
- klar

Skärmen ska hållas aktiv via Wake Lock när möjligt.

---

# Genererade pass

Appen ska kunna generera pass automatiskt.

## Slumpa pass

Exempel:

> Ge mig ett pass på 10 minuter.

Appen väljer lämpligt antal övningar.

## Generera efter fokus

Exempel:

- bollkontroll
- svag fot
- snabba fötter
- väggpassningar
- liten yta
- teknikmatta
- kondition + boll

## Veckans pass

Appen ska på sikt kunna skapa ett enkelt veckoupplägg.

---

# Poäng

Övningar och pass kan ge poäng.

Poängen är främst en motivationsmekanik.

Exempel:

- enkel övning: 5 poäng
- medel: 10 poäng
- svår: 15 poäng
- bonus för komplett pass
- bonus för streak
- veckopoäng

Poängsystemet ska kunna justeras senare.

---

# Achievements

Achievements är en central del av appens gamification.

De ska automatiskt följas baserat på användarens träning.

## Exempel

### Repetitioner

- 100 toe taps
- 1 000 toe taps
- 10 000 toe taps
- 250 väggpassningar
- 100 touch med svag fot

### Streaks

- träna 3 dagar i rad
- träna 5 dagar i rad
- träna 7 dagar i rad

### Pass

- första passet
- 5 pass
- 25 pass
- 100 pass
- genomför ett pass på minst 10 minuter
- genomför ett pass på minst 15 minuter

### Variation

- testa 5 olika övningar
- gör övningar från flera kategorier
- träna flera olika fokusområden samma vecka

Achievements bör främst belöna:

- ansträngning
- vana
- progression
- variation

Inte talang eller prestation jämfört med andra.

---

# Progress mot achievements

Spelaren ska kunna se progression innan en achievement är klar.

Exempel:

- Toe Tap Pro: 850 / 1 000
- 5 dagar i rad: 4 / 5
- Väggmästaren: 180 / 250

Detta är en viktig motivationsmekanik.

---

# Troféskåp

Varje användare ska kunna ha ett eget troféskåp.

Där visas:

- badges
- pokaler
- genomförda achievements
- låsta achievements
- progress mot nästa nivå

Achievements kan eventuellt ha nivåer:

- brons
- silver
- guld
- diamant

---

# Avatar

Avatar-systemet är en viktig framtida gamificationfunktion.

## Stil

Första versionen ska vara:

- 2D
- pixel art
- SNES-/16-bitarsinspirerad

Grafiken kan skapas i **Aseprite**.

## Grundpose

Första avataren ska ha en enkel standardpose:

**Spelaren står med ena foten på en fotboll.**

Detta gör posen enkel att återanvända och gör det naturligt att ha olika upplåsbara fotbollar.

## Customizable delar

Planerade delar:

- frisyr
- hårfärg
- tröja / matchställ
- shorts
- strumpor
- skor
- benskydd
- accessoarer
- boll
- bakgrund

## Asset-modell

Första implementationen kan använda separata transparenta PNG-lager ovanpå varandra.

Exempel:

- base_body.png
- hair_01.png
- shirt_01.png
- shorts_01.png
- shoes_01.png
- ball_01.png
- background_01.png

CSS kan använda:

```css
image-rendering: pixelated;
```

för att behålla pixel-art-känslan.

## Avatar-unlocks

Achievements kan låsa upp avatar-delar.

Exempel:

- 100 toe taps → ny boll
- 1 000 toe taps → guldboll eller benskydd
- 5 dagar i rad → specialtröja
- 10 pass → nya skor
- första 10-minuterspasset → ny bakgrund

## Poser

Fler poser kan komma senare.

Exempel:

- målgest
- peka
- segrarpose
- händer i sidan

Första versionen använder endast en pose för att undvika att alla avatar-assets måste ritas i flera varianter.

Datamodellen bör dock gärna kunna stödja flera poser senare.

---

# AI + Aseprite workflow

AI kan användas för:

- art direction
- koncept
- färgpaletter
- frisyridéer
- tröjdesigner
- bollidéer
- bakgrunder

Slutlig pixelgrafik städas eller ritas i Aseprite.

Ett rimligt första avatar-assetpaket:

- 1 baspose
- 3 frisyrer
- 3 tröjor
- 3 bollar
- 2 par skor
- 2 bakgrunder

---

# Användare

På sikt ska varje spelare kunna ha en profil.

Möjliga fält:

- smeknamn
- avatar
- poäng
- tränad tid
- antal pass
- streak
- achievements
- troféskåp
- upplåsta avatar-items

Barnintegritet ska tas på allvar.

Publika riktiga namn och öppna topplistor är inte en prioritet.

---

# Lag och förening

Detta skjuts på framtiden.

Möjlig struktur:

- förening
- lag
- spelare
- tränare

Framtida funktioner:

- tränare publicerar träningspass
- spelare ser kommande lagträningar
- lagutmaningar
- eventuell intern statistik
- eventuella topplistor

---

# Teknisk riktning

Nuvarande huvudspår:

## Frontend

**Angular + TypeScript som PWA**

Motivering:

- Angular ger en sammanhållen struktur och tydliga konventioner för appens växande funktionsområden.
- TypeScript passar för domänmodeller som träningspass, historik, achievements och avatarföremål.
- PWA passar mobile-first-användning och installation från hemskärmen.
- Bygg och leverera appen som en responsiv webbapp med manifest och service worker så att installation och grundläggande offlineanvändning fungerar.
- Webbläsar-API:er som Screen Wake Lock kan användas från Angular via webbläsarens JavaScript/TypeScript-API:er.
- Avatar och troféskåp är huvudsakligen anpassade grafiska komponenter; ramverksvalet avgör dem inte.

React är ett giltigt alternativ, men Angular är det valda arbetsspåret. Ändra inte ramverk utan uttryckligt beslut.

## Möjlig native-app senare

PWA:n ska byggas med framtida native-app i åtanke, men MVP:n är en webbapp. Om behov uppstår kan Angular-appen paketeras med Capacitor för iOS och Android och använda native-pluginer vid behov. Detta kräver senare separat utvärdering av plattformsspecifika funktioner, publicering och användarupplevelse; native-app ingår inte i MVP:n.

## Responsiv design

- Spelarens gränssnitt byggs mobile-first och optimeras för touch, stående skärm och användning under träning.
- Anpassa layout, navigation och informationsmängd för surfplatta och desktop i stället för att enbart skala upp mobilvyn.
- Om en administrativ yta införs får den optimeras för desktop och arbete med större mängder innehåll, men ska vara responsiv.

## Backend

Ingen backend krävs i första versionen.

Första MVP kan lagra allt lokalt.

Senare kan backend läggas till när behov uppstår för:

- konto
- sync mellan enheter
- lag
- tränare
- publicerade pass
- topplistor

## Lokal lagring

Första version:

- IndexedDB för strukturerad träningsdata och historik; LocalStorage kan användas för små inställningar.

## Hosting

Förstahandsval:

**Azure Static Web Apps**

Senare eventuell backend:

- Azure Functions / ASP.NET Core API
- databas efter behov

---

# Föreslagen projektstruktur

Föreslagen Angular-struktur för en första klientapp. Håll funktionsområden tydliga och dela återanvändbara UI-komponenter och domänmodeller där det hjälper:

```text
src/app/
  core/                 Appskal, navigation, lagring, gemensamma tjänster
  shared/               Återanvändbara UI-komponenter och typer
  features/
    home/
    exercises/          Övningsbibliotek och övningskort
    workouts/           Passbyggare och träningsspelare
    progress/           Historik, poäng och achievements
    trophies/            Troféskåp
    profile/             Profil och senare avatar
  data/                  Mockdata för MVP
  models/                Exercise, Workout, WorkoutSession, Achievement
  services/              IndexedDB, passflöde, progress och Wake Lock
  assets/
    avatar/              Läggs till när avatarfunktionen prioriteras
```

---

# MVP – första riktiga versionen

Fokus ska vara på appstommen.

## Prioritet 1

- Angular + TypeScript PWA
- mobilanpassad layout
- startsida
- mockade övningskort med endast namn

## Prioritet 2

- välj övningar
- bygg ett pass
- starta pass
- timer
- pauser
- nästa övning
- Wake Lock

## Prioritet 3

- poäng
- träningshistorik
- total tränad tid
- antal genomförda pass

## Prioritet 4

- första achievements
- progress mot achievements
- troféskåp

## Efter MVP

- avatar
- upplåsbara avatar-items
- genererade pass
- veckopass
- Duo
- Team
- tränarroll
- konto/backend
- lag/förening

---

# Exempel på första achievements

- Första passet
- 3 pass genomförda
- 10-minutersklubben
- 100 toe taps
- 1 000 toe taps
- 3 dagar i rad
- 5 dagar i rad
- Testa 5 olika övningar

---

# Viktig användarloop

```text
Välj eller generera pass
        ↓
Kör övningar med timer
        ↓
Få poäng och träningsprogress
        ↓
Se progress mot achievements
        ↓
Lås upp badge / pokal / avatar-item
        ↓
Anpassa avatar
        ↓
Bli sugen på nästa pass
```

---

# Framtidsvision

Bollkoll börjar som en enkel personlig träningsapp för unga fotbollsspelare.

Den kan senare utvecklas till en bredare plattform där:

- spelare tränar själva
- två spelare tränar tillsammans
- tränare planerar lagträningar
- spelare kan förbereda sig inför träningen
- achievements och avatarer gör träning roligare
- styrka och annan kompletterande träning för bollsport kan inkluderas

Men utvecklingen ska ske stegvis.

**Första målet är en rolig, enkel och fungerande Solo-app.**
