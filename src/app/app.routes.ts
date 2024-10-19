import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { NitificationPage } from './pages/nitification/nitification.page';
import { RecordsPage } from './pages/records/records.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
    title: 'Inicio'
  },
  {
    path: 'historial',
    component: RecordsPage,
    title: 'Historial'
  },
  {
    path: 'telegram',
    component: NitificationPage,
    title: 'Telegram - Llamadas'
  },
];
