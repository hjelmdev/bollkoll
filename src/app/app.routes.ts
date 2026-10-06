import { UrlSegment } from '@angular/router';
import type { Routes, UrlMatcher, UrlMatchResult } from '@angular/router';
import { App } from './app';

const viewPaths = new Set(['hem', 'trana', 'mina-pass', 'profil']);

// All views use the same route config so Angular keeps the app state and workout player alive
// while the user moves between tabs.
const appViewMatcher: UrlMatcher = (segments): UrlMatchResult | null => {
  if (segments.length === 1 && viewPaths.has(segments[0].path)) {
    return { consumed: segments, posParams: { view: segments[0] } };
  }

  if (
    segments.length === 3 &&
    segments[0].path === 'resultat' &&
    viewPaths.has(segments[1].path)
  ) {
    return {
      consumed: segments,
      posParams: {
        view: new UrlSegment('resultat', {}),
        tab: segments[1],
        sessionId: segments[2],
      },
    };
  }

  return null;
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'hem' },
  { matcher: appViewMatcher, component: App },
  { path: '**', redirectTo: 'hem' },
];
