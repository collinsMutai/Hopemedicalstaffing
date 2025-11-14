import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Jobs } from './components/jobs/jobs';
import { Privacy } from './components/privacy/privacy';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'jobs', component: Jobs },
  { path: 'privacy-policy', component: Privacy },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
