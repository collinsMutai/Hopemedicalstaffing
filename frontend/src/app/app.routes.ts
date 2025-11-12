import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Jobs } from './components/jobs/jobs';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'jobs', component: Jobs },
  { path: '**', redirectTo: '' },
];
