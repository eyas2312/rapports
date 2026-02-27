import { Routes } from '@angular/router';
import { RapportsComponent } from './rapports/rapports.component';
import { RapportDetailComponent } from './components/rapport-detail/rapport-detail.component';
import { AuthComponent } from './components/auth.component';
import { AuthGuard } from './guards/auth.gard';
import { RapportCreate } from './components/rapport-create/rapport-create';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    component: RapportsComponent,
    canActivate: [AuthGuard], // Protège la page des rapports
    // Protège la page des rapports
  },
  {
    path: 'rapport/create/:number',
    canActivate: [AuthGuard],
    component: RapportCreate,
  },
  {
    path: 'rapport/:nom',
    component: RapportDetailComponent,
    canActivate: [AuthGuard], // Protège les détails des rapports
    // Protège les détails des rapports
  },
  {
    path: '**',
    redirectTo: 'auth', // Redirige vers auth si route inconnue
  },
];
