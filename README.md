# Bollkoll

Mobilanpassad Solo-app för individuell fotbollsträning. Se [Bollkoll_PROJECT_CONTEXT.md](Bollkoll_PROJECT_CONTEXT.md) för produktmål och MVP-plan.

## Kom igång

Kräver Node.js och pnpm. Installera beroenden och starta utvecklingsservern:

```bash
pnpm install
pnpm start
```

Öppna adressen som Angular CLI skriver ut i terminalen. Koden laddas om när filer ändras.

## Produktionsbygge

```bash
pnpm build
```

PWA-service workern aktiveras i produktionsbygget. Under utveckling körs appen som en vanlig webbapp.

## PWA

Appen innehåller web app manifest och Angular service worker. Service worker byggs in i produktionsversionen; installation och offlinebeteende behöver kontrolleras via en HTTPS-deployerad produktionsbuild.
