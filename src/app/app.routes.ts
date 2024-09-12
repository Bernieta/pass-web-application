import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { NitificationPage } from './pages/nitification/nitification.page';
import { RecordsComponent } from './pages/records/records.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'historial',
    component: RecordsComponent,
  },
  {
    path: 'telegram',
    component: NitificationPage,
  },
];
